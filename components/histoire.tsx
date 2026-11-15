"use client";

import { motion } from "framer-motion";
import { Ornament } from "./ornament";

const events = [
  {
    side: "left" as const,
    label: "La rencontre",
    title: "Un regard qui change tout",
    desc: "C'est lors d'une soirée entre amis que leurs regards se sont croisés pour la première fois. Quelque chose d'indéfinissable, mais inoubliable.",
  },
  {
    side: "right" as const,
    label: "Les premières sorties",
    title: "Chaque moment, un souvenir",
    desc: "Des promenades, des rires, des confidences partagées. Ils ont construit, pas à pas, quelque chose de solide et de beau.",
  },
  {
    side: "left" as const,
    label: "La demande",
    title: "Elle a dit oui",
    desc: "Dans un moment de grâce et d'émotion, José a posé la question qui allait sceller leur destin commun.",
  },
  {
    side: "right" as const,
    label: "19 Décembre 2026",
    title: "Pour l'éternité",
    desc: "Aujourd'hui, ils vous invitent à partager avec eux le plus beau chapitre de leur histoire.",
  },
];

function TimelineItem({ event, index }: { event: (typeof events)[0]; index: number }) {
  const isLeft = event.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`flex items-start gap-4 mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <p
          className="text-[10px] tracking-[3px] uppercase mb-1"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          {event.label}
        </p>
        <h3
          className="text-lg italic mb-2"
          style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-serif)" }}
        >
          {event.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          {event.desc}
        </p>
      </div>
      <div className="flex-shrink-0 mt-1.5 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="w-2.5 h-2.5 rounded-full border bg-card"
          style={{ borderColor: "rgb(110 108 102)" }}
        />
      </div>
    </motion.div>
  );
}

export function Histoire() {
  return (
    <section id="histoire" className="py-24 bg-card">
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
          Depuis le début
        </p>
        <h2
          className="text-5xl"
          style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-script)" }}
        >
          Notre Histoire
        </h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <div className="relative max-w-sm mx-auto px-6">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, transparent, rgb(210 207 200), rgb(210 207 200), transparent)" }}
        />
        {events.map((e, i) => (
          <TimelineItem key={i} event={e} index={i} />
        ))}
      </div>
    </section>
  );
}
