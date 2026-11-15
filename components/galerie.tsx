"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ornament } from "./ornament";

const images = [
  { src: "/images/1.jpg", alt: "Urlice & José — tenue de cérémonie", span: 2 },
  { src: "/images/5.jpg", alt: "Moment intime", span: 1 },
  { src: "/images/6.jpg", alt: "Complicité", span: 1 },
  { src: "/images/3.jpg", alt: "Portrait du couple", span: 1 },
  { src: "/images/4.jpg", alt: "Élégance", span: 1 },
];

export function Galerie() {
  return (
    <section id="galerie" className="py-24" style={{ backgroundColor: "rgb(248 246 241)" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <p
          className="text-[10px] tracking-[4px] uppercase mb-2"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          Portraits
        </p>
        <h2
          className="text-5xl"
          style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-script)" }}
        >
          Les Mariés
        </h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-0.5 max-w-sm mx-auto px-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden ${
              img.span === 2 ? "col-span-2 aspect-[2/1]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700"
              style={{
                filter: "grayscale(1) contrast(1.1)",
                mixBlendMode: "multiply",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
