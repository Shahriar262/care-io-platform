"use server";

import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";
import { collections, dbConnect } from "@/lib/dbConnect";

/* ===========================
   CREATE BOOKING
=========================== */
export async function createBooking(formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, message: "Unauthorized" };
    }

    const serviceId = formData.get("serviceId");
    const duration = Number(formData.get("duration"));
    const region = formData.get("region");
    const district = formData.get("district");
    const area = formData.get("area");
    const address = formData.get("address");

    if (!serviceId || !region || !district || !area || !address) {
      return { success: false, message: "All fields are required" };
    }

    // ✅ Use serviceId from formData
    const servicesCollection = dbConnect(collections.SERVICES);
    const service = await servicesCollection.findOne({
      _id: new ObjectId(serviceId),
    });

    if (!service) {
      return { success: false, message: "Service not found" };
    }

    const totalCost = duration * service.price;

    // ✅ Use dbConnect for bookings collection
    const bookingsCollection = dbConnect(collections.BOOKINGS);
    await bookingsCollection.insertOne({
      userEmail: session.user.email,
      serviceId: new ObjectId(serviceId),
      serviceName: service.name,
      duration,
      region,
      district,
      area,
      address,
      totalCost,
      status: "pending",
      createdAt: new Date(),
    });

    revalidatePath("/my-bookings");

    return { success: true };
  } catch (error) {
    console.error("Create Booking Error:", error);
    return { success: false, message: "Booking failed" };
  }
}

/* ===========================
   GET USER BOOKINGS
=========================== */
export async function getUserBookings() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return [];
    }

    const bookingsCollection = dbConnect(collections.BOOKINGS);

    const bookings = await bookingsCollection
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return bookings.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
      serviceId: booking.serviceId.toString(),
    }));
  } catch (error) {
    console.error("Get Booking Error:", error);
    return [];
  }
}

/* ===========================
   CANCEL BOOKING
=========================== */
export async function cancelBooking(formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false };
    }

    const bookingId = formData.get("bookingId");

    if (!bookingId) {
      return { success: false };
    }

    const bookingsCollection = dbConnect(collections.BOOKINGS);

    await bookingsCollection.updateOne(
      {
        _id: new ObjectId(bookingId),
        userEmail: session.user.email,
      },
      {
        $set: { status: "cancelled" },
      },
    );

    revalidatePath("/my-bookings");

    return { success: true };
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    return { success: false };
  }
}

/* ===========================
   UPDATE BOOKING STATUS (Admin Only)
=========================== */
export async function updateBookingStatus(formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    const bookingId = formData.get("bookingId");
    const status = formData.get("status"); // "approved" or "rejected"

    if (!bookingId || !status) {
      return { success: false, message: "Missing data" };
    }

    const bookingsCollection = dbConnect(collections.BOOKINGS);

    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: status.toLowerCase() } },
    );

    revalidatePath("/my-bookings");

    return { success: true };
  } catch (error) {
    console.error("Update Booking Status Error:", error);
    return { success: false, message: "Failed to update status" };
  }
}
