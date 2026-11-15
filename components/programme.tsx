"use client";

import { motion } from "framer-motion";
import { Ornament } from "./ornament";

const items = [
  { time: "09h00", title: "Accueil des invités", desc: "Rafraîchissements de bienvenue" },
  { time: "10h00", title: "Cérémonie", desc: "L'union d'Urlice & José" },
  { time: "12h30", title: "Séance photos", desc: "Avec les mariés et leurs proches" },
  { time: "14h00", title: "Réception & Déjeuner", desc: "Repas festif et chaleureux" },
  { time: "20h00", title: "Soirée & Danse", desc: "Jusqu'au bout de la nuit" },
];

export function Programme() {
  return (
    <section id="programme" className="py-24 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <p
          className="text-[10px] tracking-[4px] uppercase mb-2"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          Le 19 Décembre 2026
        </p>
        <h2
          className="text-5xl"
          style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-script)" }}
        >
          Programme
        </h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <div className="relative max-w-sm mx-auto px-8">
        <div
          className="absolute left-8 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, rgb(210 207 200) 10%, rgb(210 207 200) 90%, transparent)" }}
        />

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex gap-5 mb-8 pl-4 relative"
          >
            <div
              className="absolute left-[-3px] top-1.5 w-2 h-2 rounded-full border bg-card z-10"
              style={{ borderColor: "rgb(110 108 102)" }}
            />
            <span
              className="text-[11px] tracking-[1px] whitespace-nowrap pt-0.5 min-w-[42px]"
              style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
            >
              {item.time}
            </span>
            <div>
              <h3
                className="text-base italic"
                style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-serif)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-xs leading-relaxed mt-0.5"
                style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
              >
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
