"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "500+", label: "Babies Cared For" },
  { number: "200+", label: "Elderly Assisted" },
  { number: "99%", label: "Happy Users" },
  { number: "24/7", label: "Support Available" },
];

export default function SuccessMetrics() {
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
          Our Success in Numbers
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <h3 className="text-3xl font-bold text-accent mb-2">{s.number}</h3>
              <p className="text-gray-700">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
