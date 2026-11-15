"use client";

import { useEffect, useState } from "react";

type Countdown = { days: number; hours: number; mins: number; secs: number };

function calc(target: Date): Countdown {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function useCountdown(target: Date): Countdown {
  const [state, setState] = useState<Countdown>(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setState(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return state;
}
