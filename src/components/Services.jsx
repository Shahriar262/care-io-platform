import { getServices } from "@/app/actions/serviceActions";
import ServiceCard from "./cards/ServiceCard";


const Services = async () => {
  const services = await getServices();

  if (!services.length)
    return (
      <div className="text-center py-10 text-gray-500">
        No services available
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 px-4 pt-20 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default Services;
