"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Mother",
    message:
      "Care.io’s babysitters are reliable and loving. I feel completely at ease leaving my baby in their care.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rafiq Hossain",
    role: "Son",
    message:
      "Their elderly care service is exceptional. My father is treated with kindness and professionalism.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Nadia Karim",
    role: "Parent",
    message:
      "Booking was so easy and the caregiver arrived on time. Highly recommend Care.io for anyone in need of trusted care.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What Our Users Say
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-md flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <p className="text-gray-700 mb-4 text-center">{t.message}</p>
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <span className="text-gray-500 text-sm">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
