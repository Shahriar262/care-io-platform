import { getServiceById } from "@/app/actions/serviceActions";
import ServiceDetailsClient from "./serviceDetailsClient";


export default async function ServicePage({ params }) {
  const { id } = await params;

  const service = await getServiceById(id);
  if (!service) return <p className="text-center py-12">Service not found</p>;

  return <ServiceDetailsClient service={service} />;
}
