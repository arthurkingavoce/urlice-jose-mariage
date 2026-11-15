"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const links = [
  { label: "Histoire", href: "#histoire" },
  { label: "Compte à rebours", href: "#countdown" },
  { label: "Programme", href: "#programme" },
  { label: "Galerie", href: "#galerie" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Lieu", href: "#lieu" },
  { label: "Livre d'or", href: "#livredor" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
      }`}
    >
      <a
        href="#hero"
        className="font-script text-2xl text-foreground/90 hover:text-foreground transition-colors"
        style={{ fontFamily: "var(--font-script)" }}
      >
        U &amp; J
      </a>

      {/* Desktop */}
      <ul className="hidden md:flex gap-7 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[12px] tracking-[2px] uppercase text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-foreground" />}>
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-background border-border flex flex-col items-center justify-center gap-10"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-4xl text-foreground/80 hover:text-foreground transition-colors"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {l.label}
            </a>
          ))}
        </SheetContent>
      </Sheet>
    </nav>
  );
}
