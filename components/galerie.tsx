"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ornament } from "./ornament";

const images = [
  { png: "/images/1.png", jpg: "/images/1.jpg", alt: "Urlice & José — tenue de cérémonie", span: 2 },
  { png: "/images/5.png", jpg: "/images/5.jpg", alt: "Moment intime", span: 1 },
  { png: "/images/6.png", jpg: "/images/6.jpg", alt: "Complicité", span: 1 },
  { png: "/images/3.png", jpg: "/images/3.jpg", alt: "Portrait du couple", span: 1 },
  { png: "/images/4.png", jpg: "/images/4.jpg", alt: "Élégance", span: 1 },
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
          className="text-[12px] tracking-[3px] uppercase mb-2"
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
            className={`group relative overflow-hidden cursor-zoom-in ${
              img.span === 2 ? "col-span-2 aspect-[2/1]" : "aspect-[3/4]"
            }`}
          >
            {/* Photo réelle — apparaît au hover */}
            <Image
              src={img.jpg}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
            />
            {/* PNG détouré — affiché par défaut */}
            <Image
              src={img.png}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
              style={{ filter: "grayscale(0.2)" }}
            />
            {/* Hint hover */}
            <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span
                className="text-[10px] tracking-[2px] uppercase px-2 py-1"
                style={{
                  background: "rgba(248,246,241,0.85)",
                  color: "rgb(110 108 102)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Photo
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
