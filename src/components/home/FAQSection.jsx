"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I book a caregiver?",
    answer:
      "You can book via our website by selecting the service, duration, and location. Then confirm your booking.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "You can cancel your booking up to 24 hours before the scheduled time. Refunds are processed according to our policy.",
  },
  {
    question: "Are the caregivers verified?",
    answer:
      "Yes, all our caregivers undergo background checks and are trained to ensure safe and quality care.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl shadow-md p-6 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              onClick={() => toggle(i)}
            >
              <h3 className="font-semibold text-gray-900 flex justify-between items-center">
                {f.question}
                <span>{openIndex === i ? "-" : "+"}</span>
              </h3>
              {openIndex === i && (
                <p className="text-gray-700 mt-2">{f.answer}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
