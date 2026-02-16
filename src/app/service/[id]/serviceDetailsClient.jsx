"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ServiceDetailsClient({ service }) {
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const totalCost = duration * service.price;

  const handleBooking = async () => {
    if (
      !location.division ||
      !location.district ||
      !location.city ||
      !location.area ||
      !location.address
    ) {
      toast.error("Please fill all location fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/book-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service._id,
          duration,
          location,
          totalCost,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Service booked successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 space-y-8">
      {/* Image + Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 h-80 overflow-hidden rounded-lg shadow-md">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-content">{service.name}</h1>
            <span className="badge badge-accent mt-2">{service.category}</span>
            <p className="text-neutral mt-4">{service.description}</p>

            <ul className="list-disc list-inside mt-4 text-sm text-neutral">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <div className="flex justify-between mt-4 items-center">
              <p className="font-bold text-primary text-lg">
                ${service.price} / {service.duration}
              </p>
              <p className="text-neutral">{service.availability}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="border-t border-base-300 pt-4 space-y-3">
            <h3 className="font-semibold text-neutral-content text-lg">Book Service</h3>

            <div className="flex items-center gap-2">
              <label className="text-neutral w-24">Duration:</label>
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="input input-bordered w-32"
              />
              <span>{service.duration}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                placeholder="Division"
                value={location.division}
                onChange={(e) => setLocation({ ...location, division: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                placeholder="District"
                value={location.district}
                onChange={(e) => setLocation({ ...location, district: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                placeholder="City"
                value={location.city}
                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                placeholder="Area"
                value={location.area}
                onChange={(e) => setLocation({ ...location, area: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                placeholder="Address"
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                className="input input-bordered w-full md:col-span-2"
              />
            </div>

            <p className="text-neutral mt-2">
              Total Cost: <span className="font-bold text-primary">${totalCost}</span>
            </p>

            <button
              onClick={handleBooking}
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Service"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
