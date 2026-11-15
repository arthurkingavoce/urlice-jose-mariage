"use client";

import { motion } from "framer-motion";
import { Ornament } from "./ornament";

export function Lieu() {
  return (
    <section id="lieu" className="pb-0 pt-24" style={{ backgroundColor: "rgb(248 246 241)" }}>
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
          Où nous retrouver
        </p>
        <h2
          className="text-5xl"
          style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-script)" }}
        >
          Le Lieu
        </h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto px-6 mb-10"
      >
        <p
          className="text-xl italic text-center leading-relaxed mb-8"
          style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-serif)" }}
        >
          Godomey Cococodji Fandji
          <br />
          <span
            className="text-sm not-italic"
            style={{ color: "rgb(110 108 102)" }}
          >
            Abomey-Calavi, Bénin
          </span>
        </p>

        <div className="space-y-0">
          {[
            { icon: "📅", text: "Samedi 19 Décembre 2026" },
            { icon: "🕘", text: "À partir de 09h00" },
            { icon: "📍", text: "Godomey Cococodji Fandji, Abomey-Calavi" },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 text-[15px]"
              style={{
                borderBottom: "1px solid rgb(210 207 200)",
                color: "rgb(110 108 102)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span className="text-base w-5">{row.icon}</span>
              <span>{row.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full h-72 overflow-hidden"
        style={{ filter: "grayscale(1) contrast(0.9)" }}
      >
        <iframe
          src="https://maps.google.com/maps?q=Godomey,Abomey-Calavi,Benin&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lieu du mariage"
          style={{ border: "none" }}
        />
      </motion.div>
    </section>
  );
}
