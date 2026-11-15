import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Histoire } from "@/components/histoire";
import { Countdown } from "@/components/countdown";
import { Programme } from "@/components/programme";
import { Galerie } from "@/components/galerie";
import { Rsvp } from "@/components/rsvp";
import { Lieu } from "@/components/lieu";
import { LivreDor } from "@/components/livre-dor";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Histoire />
        <Countdown />
        <Programme />
        <Galerie />
        <Rsvp />
        <Lieu />
        <LivreDor />
      </main>
      <Footer />
    </>
  );
}
