"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaUserShield, FaClock, FaSmile } from "react-icons/fa";

const features = [
  {
    icon: <FaCheckCircle size={30} />,
    title: "Trusted Caregivers",
    description:
      "All our caregivers are verified and trained to ensure your loved ones are safe.",
  },
  {
    icon: <FaUserShield size={30} />,
    title: "Verified & Safe",
    description:
      "Background checks and continuous monitoring guarantee peace of mind.",
  },
  {
    icon: <FaClock size={30} />,
    title: "24/7 Availability",
    description: "Book care anytime, day or night, whenever you need it.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "Happy Families",
    description:
      "Hundreds of families trust us for professional and caring service.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-md flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <div className="text-accent mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {f.title}
              </h3>
              <p className="text-gray-700">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
