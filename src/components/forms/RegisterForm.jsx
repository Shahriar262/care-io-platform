"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    nid: "",
    email: "",
    contact: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // Login after register
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Login failed after registration");
    } else {
      toast.success("Registration successful");
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogleSignIn = async () => {
    toast.loading("Redirecting to Google...");
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-base-100 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      {error && <p className="text-error mb-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="nid"
          placeholder="NID Number"
          value={form.nid}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex justify-center items-center gap-2"
      >
        <FcGoogle size={24} /> Sign up with Google
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-accent font-semibold">
          Login
        </a>
      </p>
    </div>
  );
}
