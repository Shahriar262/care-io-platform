"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const data = {
      nid: form.nid.value,
      name: form.name.value,
      email: form.email.value,
      contact: form.contact.value,
      password: form.password.value,
    };

    if (!validatePassword(data.password)) {
      setError(
        "Password must be 6+ characters with at least 1 uppercase and 1 lowercase letter.",
      );
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="card w-full max-w-md shadow-xl bg-base-100 mx-auto">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nid"
            placeholder="NID Number"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
