"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔥 Get callbackUrl from query
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* =========================
     CREDENTIAL LOGIN
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl, // 🔥 VERY IMPORTANT
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl); // 🔥 redirect properly
      router.refresh(); // ensure session refresh
    }
  };

  /* =========================
     GOOGLE LOGIN
  ========================= */
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl, // 🔥 respect original page
    });
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-base-100 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && (
        <p className="text-error mb-2 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex justify-center items-center gap-2"
      >
        <FcGoogle size={24} /> Sign in with Google
      </button>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-accent font-semibold">
          Register
        </a>
      </p>
    </div>
  );
}
