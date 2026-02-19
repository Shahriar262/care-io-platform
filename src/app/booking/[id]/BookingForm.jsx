"use client";

import { useState, useMemo } from "react";
import { locations } from "@/data/locations";
import { FaMapMarkerAlt, FaClock, FaLayerGroup } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/actions/bookingActions";

export default function BookingForm({ service }) {
  const router = useRouter();

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [durationType, setDurationType] = useState("hours");
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const regions = [...new Set(locations.map((l) => l.region))];

  const districts = locations
    .filter((l) => l.region === region)
    .map((l) => l.district);

  const selectedCityObj = locations.find((l) => l.district === district);

  const cities = district ? [selectedCityObj?.city] : [];
  const areas = city ? selectedCityObj?.covered_area || [] : [];

  const totalCost = useMemo(() => {
    if (!service?.price) return 0;
    return service.price * duration * quantity;
  }, [duration, quantity, service]);

  // ====================
  // Handle Booking
  // ====================
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!region || !district || !city || !area || !address || !duration) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("serviceId", service._id); // service id
    formData.append("duration", duration);
    formData.append("region", region);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("address", address);

    const result = await createBooking(formData);

    setLoading(false);

    if (result.success) {
      toast.success(`Booking confirmed for ${service.title}!`);
      router.push("/my-bookings");
    } else {
      toast.error(result.message || "Booking failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">
            Book <span className="text-primary">{service?.title}</span>
          </h2>
          <p className="text-sm opacity-70 mt-1">
            Fill up the form below to confirm your booking
          </p>
        </div>

        <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-5">
          {/* Duration Type */}
          <div>
            <label className="label font-semibold flex items-center gap-2">
              <FaClock /> Duration Type
            </label>
            <select
              className="select select-bordered w-full"
              value={durationType}
              onChange={(e) => setDurationType(e.target.value)}
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="label font-semibold">Duration</label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="label font-semibold flex items-center gap-2">
              <FaLayerGroup /> Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Region */}
          <div>
            <label className="label font-semibold">Region</label>
            <select
              className="select select-bordered w-full"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setDistrict("");
                setCity("");
                setArea("");
              }}
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="label font-semibold">District</label>
            <select
              className="select select-bordered w-full"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setCity("");
                setArea("");
              }}
              disabled={!region}
            >
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="label font-semibold">City</label>
            <select
              className="select select-bordered w-full"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setArea("");
              }}
              disabled={!district}
            >
              <option value="">Select City</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="label font-semibold flex items-center gap-2">
              <FaMapMarkerAlt /> Area
            </label>
            <select
              className="select select-bordered w-full"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              disabled={!city}
            >
              <option value="">Select Area</option>
              {areas.map((a, i) => (
                <option key={i} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="label font-semibold">Full Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              className="input input-bordered w-full"
            />
          </div>

          {/* Total & Submit */}
          <div className="md:col-span-2 bg-base-200 p-6 rounded-xl mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-70">Total Cost</p>
              <h3 className="text-2xl font-bold text-primary">৳ {totalCost}</h3>
            </div>
            <button
              type="submit"
              className={`btn btn-primary btn-lg px-10 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
