"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; life: number; maxLife: number;
    };

    const make = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    const particles: P[] = [];
    for (let i = 0; i < 80; i++) {
      const p = make();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        const alpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(12,11,9,${alpha.toFixed(3)})`;
        ctx.fill();
        if (p.life >= p.maxLife) Object.assign(p, make(), { life: 0 });
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-end pb-16 overflow-hidden"
      style={{ backgroundColor: "rgb(248 246 241)" }}
    >
      <ParticlesCanvas />

      {/* Illustration */}
      <div className="absolute inset-0 flex items-start justify-center pt-16 z-10 pointer-events-none">
        <motion.div
          className="relative h-[72vh] max-h-[600px]"
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 0.92 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <Image
            src="/images/2.jpg"
            alt="Urlice & José"
            width={320}
            height={600}
            priority
            className="h-full w-auto object-contain"
            style={{ filter: "grayscale(1) contrast(1.1)", mixBlendMode: "multiply" }}
          />
          {/* Fade bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2/5"
            style={{ background: "linear-gradient(to top, rgb(248 246 241), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="relative z-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-[12px] tracking-[4px] uppercase mb-1"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          Vous êtes invités au mariage de
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          style={{ fontSize: "clamp(64px, 18vw, 96px)", lineHeight: 1, fontFamily: "var(--font-script)", color: "rgb(12 11 9)" }}
        >
          Urlice
          <span
            className="block italic my-1"
            style={{ fontFamily: "var(--font-serif)", fontSize: "18px", letterSpacing: "8px", color: "rgb(110 108 102)" }}
          >
            &amp;
          </span>
          José
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-[12px] tracking-[3px] uppercase mt-4"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          19 · Décembre · 2026 · Godomey, Bénin
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[11px] tracking-[3px] uppercase"
          style={{ color: "rgb(110 108 102)", fontFamily: "var(--font-body)" }}
        >
          Découvrir
        </span>
        <motion.div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, rgba(154,152,144,0.5), transparent)" }}
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
