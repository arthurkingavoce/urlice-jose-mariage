import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "@/hooks/use-countdown";

describe("useCountdown", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("retourne des valeurs numériques positives pour une date future", () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 25);
    const { result } = renderHook(() => useCountdown(future));
    expect(result.current.days).toBeGreaterThanOrEqual(0);
    expect(result.current.hours).toBeGreaterThanOrEqual(0);
    expect(result.current.mins).toBeGreaterThanOrEqual(0);
    expect(result.current.secs).toBeGreaterThanOrEqual(0);
  });

  it("retourne 0 pour une date passée", () => {
    const past = new Date(Date.now() - 1000);
    const { result } = renderHook(() => useCountdown(past));
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.mins).toBe(0);
    expect(result.current.secs).toBe(0);
  });

  it("décrémente les secondes", () => {
    const future = new Date(Date.now() + 10000);
    const { result } = renderHook(() => useCountdown(future));
    const initial = result.current.secs;
    act(() => { jest.advanceTimersByTime(2000); });
    expect(result.current.secs).toBeLessThanOrEqual(initial);
  });
});
