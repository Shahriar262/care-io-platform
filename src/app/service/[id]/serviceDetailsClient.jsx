"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ServiceDetailsClient({ service }) {
  const router = useRouter();

  const handleBookingClick = () => {
    if (!service?._id) {
      toast.error("Service ID not found!");
      return;
    }
    router.push(`/booking/${service._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto pt-20 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={service.image}
          alt={service.name}
          className="rounded-xl w-full h-96 object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{service.name}</h1>
          <p>{service.description}</p>

          <p className="text-xl font-semibold text-primary">
            ${service.price} / {service.duration}
          </p>

          <button
            onClick={handleBookingClick}
            className="btn btn-primary w-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
