"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "Baby Care",
    description: "Trusted babysitters for your little ones.",
    img: "/images/img-1-baby.jpg",
    link: "/service/baby-care",
  },
  {
    title: "Elderly Care",
    description: "Professional caregivers for seniors.",
    img: "/images/elder.jpg",
    link: "/service/elderly-care",
  },
  {
    title: "Sick Care",
    description: "Qualified care for sick family members.",
    img: "/images/nurse-helping-senior-patient-clinic-217898329.jpg",
    link: "/service/sick-care",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-content text-center mb-12">
          Our Services
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="card bg-white shadow-lg rounded-3xl p-5 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <Image
                src={service.img}
                alt={service.title}
                width={700}
                height={500}
                className=" mb-4 w-full rounded-3xl "
              />
              <h3 className="text-xl font-semibold text-neutral-content mb-2">
                {service.title}
              </h3>
              <p className="text-neutral mb-4">{service.description}</p>
              <a href={service.link} className="btn btn-primary btn-sm">
                Book Service
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
