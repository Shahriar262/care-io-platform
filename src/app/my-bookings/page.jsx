import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/dbConnect";
import MyBookingsClient from "./MyBookingsClient";

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const bookingsCollection = dbConnect("bookings");

  const bookings = await bookingsCollection
    .find(
      session.user.role === "admin" ? {} : { userEmail: session.user.email },
    )
    .sort({ createdAt: -1 })
    .toArray();

  const safeBookings = bookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
    serviceId: b.serviceId?.toString(),
    status: b.status || "pending",
    durationType: b.durationType || "hours",
  }));

  return (
    <MyBookingsClient initialBookings={safeBookings} role={session.user.role} />
  );
}
