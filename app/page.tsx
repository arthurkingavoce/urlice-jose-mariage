import { Nav } from "@/components/nav";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
