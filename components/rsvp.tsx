"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Ornament } from "./ornament";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Veuillez indiquer votre nom"),
  attendance: z.enum(["yes", "no"]),
  guests: z.string(),
  message: z.string().optional(),
});

type RsvpValues = z.infer<typeof rsvpSchema>;

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");

  const form = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { name: "", attendance: "yes", guests: "2", message: "" },
  });

  function onSubmit(data: RsvpValues) {
    console.log("RSVP:", data);
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="py-24 bg-card">
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
          Confirmez votre présence
        </p>
        <h2
          className="text-5xl"
          style={{ color: "rgb(245 243 238)", fontFamily: "var(--font-script)" }}
        >
          RSVP
        </h2>
        <div className="max-w-[200px] mx-auto">
          <Ornament />
        </div>
        <p
          className="text-sm mt-2 px-6"
          style={{ color: "rgb(154 152 144)", fontFamily: "var(--font-body)" }}
        >
          Merci de confirmer avant le{" "}
          <strong style={{ color: "rgb(245 243 238)" }}>1er Décembre 2026</strong>
        </p>
      </motion.div>

      <div className="max-w-sm mx-auto px-6">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" exit={{ opacity: 0, y: -16 }}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-[10px] tracking-[3px] uppercase"
                          style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
                        >
                          Votre nom complet
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Famille Amoussou…"
                            className="bg-transparent border-0 border-b rounded-none px-0 text-base focus-visible:ring-0"
                            style={{
                              borderColor: "rgb(37 37 32)",
                              color: "rgb(245 243 238)",
                              fontFamily: "var(--font-body)",
                            }}
                          />
                        </FormControl>
                        <FormMessage
                          style={{ fontFamily: "var(--font-body)", fontSize: "12px" }}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attendance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-[10px] tracking-[3px] uppercase"
                          style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
                        >
                          Serez-vous présent(e) ?
                        </FormLabel>
                        <div className="flex gap-3 mt-1">
                          {(["yes", "no"] as const).map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => {
                                setAttendance(val);
                                field.onChange(val);
                              }}
                              className="flex-1 py-2.5 border text-[10px] tracking-[3px] uppercase transition-all duration-200"
                              style={{
                                fontFamily: "var(--font-body)",
                                borderColor: attendance === val ? "rgb(245 243 238)" : "rgb(37 37 32)",
                                background: attendance === val ? "rgb(245 243 238)" : "transparent",
                                color: attendance === val ? "rgb(8 8 6)" : "rgb(154 152 144)",
                              }}
                            >
                              {val === "yes" ? "Avec joie ✓" : "Dans le cœur ✗"}
                            </button>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  {attendance === "yes" && (
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="text-[10px] tracking-[3px] uppercase"
                            style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
                          >
                            Nombre de personnes
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="bg-transparent border-0 border-b rounded-none px-0 focus:ring-0"
                                style={{
                                  borderColor: "rgb(37 37 32)",
                                  color: "rgb(245 243 238)",
                                  fontFamily: "var(--font-body)",
                                }}
                              >
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              style={{ backgroundColor: "rgb(15 15 13)", borderColor: "rgb(37 37 32)" }}
                            >
                              {["1", "2", "3", "4", "5+"].map((v) => (
                                <SelectItem
                                  key={v}
                                  value={v}
                                  style={{ fontFamily: "var(--font-body)" }}
                                >
                                  {v === "5+" ? "5 personnes ou plus" : `${v} personne${v === "1" ? "" : "s"}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-[10px] tracking-[3px] uppercase"
                          style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
                        >
                          Un message (optionnel)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Vos vœux, une pensée…"
                            rows={3}
                            className="bg-transparent border-0 border-b rounded-none px-0 text-base focus-visible:ring-0 resize-none"
                            style={{
                              borderColor: "rgb(37 37 32)",
                              color: "rgb(245 243 238)",
                              fontFamily: "var(--font-body)",
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full text-[10px] tracking-[4px] uppercase py-5 rounded-none mt-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "rgb(245 243 238)",
                      color: "rgb(8 8 6)",
                    }}
                  >
                    Confirmer ma présence
                  </Button>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h3
                className="text-5xl mb-4"
                style={{ color: "rgb(245 243 238)", fontFamily: "var(--font-script)" }}
              >
                Merci !
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgb(154 152 144)", fontFamily: "var(--font-body)" }}
              >
                Votre présence nous touche profondément.
                <br />
                Urlice & José ont hâte de vous retrouver.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
