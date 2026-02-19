import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, nid, email, contact, password } = await req.json();

    // Basic validation
    if (!name || !nid || !email || !contact || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const usersCollection = dbConnect(collections.USERS);

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await usersCollection.insertOne({
      name,
      nid,
      email,
      contact,
      password: hashedPassword,
      role: "user", 
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register Error:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
