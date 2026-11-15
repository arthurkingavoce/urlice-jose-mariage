"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Ornament } from "./ornament";

export type Message = { name: string; text: string; id: string };

const STORAGE_KEY = "urlice-jose-messages";

const INITIAL: Message[] = [
  {
    id: "0",
    name: "Famille Amoussou",
    text: "Que votre amour soit aussi fort que votre joie en ce jour. Toutes nos félicitations aux futurs mariés !",
  },
  {
    id: "1",
    name: "Tantine Céline",
    text: "Urlice et José, vous méritez tout le bonheur du monde. Ce mariage est le début d'une magnifique aventure.",
  },
];

export function getMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveMessage(msg: Omit<Message, "id">): void {
  const msgs = getMessages();
  msgs.push({ ...msg, id: Date.now().toString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

export function LivreDor() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL);

  useEffect(() => {
    const stored = getMessages();
    if (stored.length > 0) {
      setMessages((prev) => [...stored, ...prev]);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
    };
    saveMessage({ name: msg.name, text: msg.text });
    setMessages((prev) => [msg, ...prev]);
    setName("");
    setText("");
  }

  return (
    <section id="livredor" className="py-24 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <p
          className="text-[10px] tracking-[4px] uppercase mb-2"
          style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
        >
          Vos mots pour eux
        </p>
        <h2
          className="text-5xl"
          style={{ color: "rgb(245 243 238)", fontFamily: "var(--font-script)" }}
        >
          Livre d&apos;or
        </h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto px-6 mb-12 space-y-5">
        <div>
          <label
            className="text-[10px] tracking-[3px] uppercase block mb-1"
            style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
          >
            Votre prénom
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marie…"
            className="bg-transparent border-0 border-b rounded-none px-0 text-base focus-visible:ring-0"
            style={{
              borderColor: "rgb(37 37 32)",
              color: "rgb(245 243 238)",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>
        <div>
          <label
            className="text-[10px] tracking-[3px] uppercase block mb-1"
            style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
          >
            Votre message
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Vos vœux les plus sincères…"
            rows={3}
            className="bg-transparent border-0 border-b rounded-none px-0 text-base focus-visible:ring-0 resize-none"
            style={{
              borderColor: "rgb(37 37 32)",
              color: "rgb(245 243 238)",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>
        <Button
          type="submit"
          className="w-full text-[10px] tracking-[4px] uppercase py-5 rounded-none"
          style={{
            fontFamily: "var(--font-body)",
            backgroundColor: "rgb(245 243 238)",
            color: "rgb(8 8 6)",
          }}
        >
          Laisser mon message
        </Button>
      </form>

      <div className="max-w-sm mx-auto px-6 flex flex-col gap-0.5">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 relative"
              style={{ backgroundColor: "rgba(8,8,6,0.5)" }}
            >
              <span
                className="absolute top-3 left-4 text-3xl leading-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "rgba(100,100,96,0.3)",
                }}
              >
                &ldquo;
              </span>
              <p
                className="text-sm italic leading-relaxed pt-2"
                style={{ color: "rgb(154 152 144)", fontFamily: "var(--font-body)" }}
              >
                {msg.text}
              </p>
              <p
                className="text-[9px] tracking-[2px] uppercase mt-3"
                style={{ color: "rgba(100,100,96,0.6)", fontFamily: "var(--font-body)" }}
              >
                — {msg.name}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
