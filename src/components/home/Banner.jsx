"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-content mb-4">
            Trusted Care for Your Loved Ones
          </h1>
          <p className="text-neutral mb-6">
            Book reliable babysitting, elderly care, and sick care services with
            ease.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="btn btn-primary">Book Now</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/hand-drawn-babysitting-template_23-2150669217.jpg"
            alt="Care Banner"
            width={1200}
            height={500}
            className="w-full h-[380px] rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
