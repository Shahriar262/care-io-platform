"use client";

import Link from "next/link";
import { deleteService } from "@/app/actions/serviceActions";
import { useTransition } from "react";
import { FaTrash } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteService(service._id);
    });
  };

  return (
    <div className="flex flex-col bg-base-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="mb-4">
          {/* Title */}
          <h2 className="text-lg md:text-xl font-semibold text-neutral-content mb-2">
            {service.name}
          </h2>

          {/* Category */}
          <span className="badge badge-accent text-sm">{service.category}</span>

          {/* Short Description */}
          <p className="text-sm text-neutral mt-2 line-clamp-3">
            {service.description}
          </p>

          {/* Price & Availability */}
          <div className="flex justify-between items-center mt-3">
            <p className="font-bold text-primary">${service.price}</p>
            <p className="text-sm text-neutral">{service.availability}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {/* View Details Button */}
          <Link
            href={`/service/${service._id}`}
            className="btn btn-outline btn-sm flex-1 text-center"
          >
            View Details
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1 text-error hover:bg-error/10 transition-colors duration-200"
            disabled={isPending}
          >
            <FaTrash /> {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
