import { Ornament } from "./ornament";

export function Footer() {
  return (
    <footer
      className="py-16 px-6 text-center"
      style={{
        backgroundColor: "rgb(8 8 6)",
        borderTop: "1px solid rgb(37 37 32)",
      }}
    >
      <p
        className="text-5xl mb-2"
        style={{ color: "rgb(245 243 238)", fontFamily: "var(--font-script)" }}
      >
        Urlice & José
      </p>
      <p
        className="text-[11px] tracking-[4px] uppercase mb-6"
        style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
      >
        19 · Décembre · 2026
      </p>
      <div className="max-w-[180px] mx-auto mb-6">
        <Ornament />
      </div>
      <p
        className="text-[13px] italic max-w-xs mx-auto leading-loose"
        style={{ color: "rgb(100 100 96)", fontFamily: "var(--font-body)" }}
      >
        « L'amour est patient, l'amour est serviable… il supporte tout, il croit
        tout, il espère tout, il endure tout. »
        <br />
        <span
          className="not-italic text-[10px] tracking-[2px] uppercase"
          style={{ color: "rgb(110 108 102)" }}
        >
          — 1 Corinthiens 13
        </span>
      </p>
    </footer>
  );
}
