"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// Get all services
export async function getServices() {
  const serviceCollection = dbConnect(collections.SERVICES);
  const services = await serviceCollection.find({}).toArray();
  return JSON.parse(JSON.stringify(services));
}

// Get single service by ID
export async function getServiceById(id) {
  const serviceCollection = dbConnect(collections.SERVICES);
  const service = await serviceCollection.findOne({ _id: new ObjectId(id) });
  if (!service) return null;
  return JSON.parse(JSON.stringify(service));
}

// Create a service
export async function createService(formData) {
  const serviceCollection = dbConnect(collections.SERVICES);

  const newService = {
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    duration: formData.get("duration"),
    rating: Number(formData.get("rating")),
    availability: formData.get("availability"),
    description: formData.get("description"),
    image: formData.get("image"),
    features: formData.get("features")?.split(",") || [],
    createdAt: new Date(),
  };

  await serviceCollection.insertOne(newService);

  revalidatePath("/services");
}

// Delete a service
export async function deleteService(id) {
  const serviceCollection = dbConnect(collections.SERVICES);
  await serviceCollection.deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/services");
}
