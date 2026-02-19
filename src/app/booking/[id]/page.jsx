import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import BookingForm from "./BookingForm";
import divisions from "@/data/divisions.json";

export default async function BookingPage({ params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/booking/${id}`);
  }

  const servicesCollection = dbConnect("services");
  const service = await servicesCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!service) {
    return <p className="pt-20 text-center">Service not found</p>;
  }

  return (
    <BookingForm
      service={{
        ...service,
        _id: service._id.toString(),
      }}
      divisions={divisions}
    />
  );
}
