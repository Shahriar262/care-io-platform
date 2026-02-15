"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-md p-10 md:p-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Accent label */}
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            About Care.io
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Mission is Simple
          </h2>

          {/* Paragraph */}
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            At <span className="font-semibold text-gray-800">Care.io</span>, we
            make caregiving simple, safe, and accessible for everyone. Whether
            you need babysitting, elderly care, or support for a sick loved one,
            our trusted and verified caregivers are always ready to provide
            compassionate support.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
