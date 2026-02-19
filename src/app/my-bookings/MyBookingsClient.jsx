"use client";

import { useState } from "react";
import { FaClipboardList, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  cancelBooking,
  updateBookingStatus,
} from "@/app/actions/bookingActions";

export default function MyBookingsClient({ initialBookings, role }) {
  const [bookingList, setBookingList] = useState(initialBookings);
  const [loadingIds, setLoadingIds] = useState([]);

  const handleCancel = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setLoadingIds((prev) => [...prev, bookingId]);

    const formData = new FormData();
    formData.append("bookingId", bookingId);

    const result = await cancelBooking(formData);

    setLoadingIds((prev) => prev.filter((id) => id !== bookingId));

    if (result.success) {
      toast.success("Booking cancelled successfully!");
      setBookingList((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } else {
      toast.error("Failed to cancel booking!");
    }
  };

  const handleAdminAction = async (bookingId, status) => {
    if (!confirm(`Are you sure you want to ${status} this booking?`)) return;

    setLoadingIds((prev) => [...prev, bookingId]);

    const formData = new FormData();
    formData.append("bookingId", bookingId);
    formData.append("status", status);

    const result = await updateBookingStatus(formData);

    setLoadingIds((prev) => prev.filter((id) => id !== bookingId));

    if (result.success) {
      toast.success(`Booking ${status} successfully!`);
      setBookingList((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b)),
      );
    } else {
      toast.error(result.message || "Action failed!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-20 px-4">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaClipboardList /> My Bookings
      </h2>

      {bookingList.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookingList.map((b) => (
            <div
              key={b._id}
              className="card bg-base-100 shadow-lg border border-gray-200"
            >
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">
                  {b.serviceName}
                </h3>

                <p className="text-sm text-gray-600">
                  Duration: {b.duration} {b.durationType}
                </p>

                <p className="font-bold text-primary mt-2">৳{b.totalCost}</p>

                <span
                  className={`badge w-fit mt-2 ${
                    b.status === "pending"
                      ? "badge-warning"
                      : b.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                  }`}
                >
                  {b.status}
                </span>

                {/* USER */}
                {role === "user" && b.status === "pending" && (
                  <button
                    className={`btn btn-error btn-sm mt-3 ${
                      loadingIds.includes(b._id) ? "loading" : ""
                    }`}
                    onClick={() => handleCancel(b._id)}
                    disabled={loadingIds.includes(b._id)}
                  >
                    <FaTimesCircle /> Cancel
                  </button>
                )}

                {/* ADMIN */}
                {role === "admin" && b.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAdminAction(b._id, "approved")}
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleAdminAction(b._id, "rejected")}
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
