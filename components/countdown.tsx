"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";
import { Ornament } from "./ornament";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[60px]">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold leading-none tracking-tighter"
        style={{ color: "rgb(12 11 9)", fontFamily: "var(--font-serif)" }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span
        className="text-[11px] tracking-[2px] uppercase"
        style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = useMemo(() => new Date("2026-12-19T10:00:00+01:00"), []);
  const { days, hours, mins, secs } = useCountdown(target);

  return (
    <section id="countdown" className="py-20 text-center" style={{ backgroundColor: "rgb(248 246 241)" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto px-6"
      >
        <p
          className="text-[12px] tracking-[3px] uppercase mb-10"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          Plus que
        </p>

        <div className="flex justify-center items-start gap-2">
          <Unit value={days} label="Jours" />
          <span
            className="text-4xl mt-1"
            style={{ color: "rgba(110,108,102,0.4)", fontFamily: "var(--font-serif)" }}
          >
            :
          </span>
          <Unit value={hours} label="Heures" />
          <span
            className="text-4xl mt-1"
            style={{ color: "rgba(110,108,102,0.4)", fontFamily: "var(--font-serif)" }}
          >
            :
          </span>
          <Unit value={mins} label="Min" />
          <span
            className="text-4xl mt-1"
            style={{ color: "rgba(110,108,102,0.4)", fontFamily: "var(--font-serif)" }}
          >
            :
          </span>
          <Unit value={secs} label="Sec" />
        </div>

        <div className="max-w-[160px] mx-auto">
          <Ornament />
        </div>
        <p
          className="text-3xl"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-script)" }}
        >
          avant le grand jour
        </p>
      </motion.div>
    </section>
  );
}
