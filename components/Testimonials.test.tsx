import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Testimonials from "./Testimonials";

// The active progress dot is the one rendered wider (w-6); inactive dots stay w-2.
function activeDotIndex() {
  return screen
    .getAllByRole("button", { name: /go to testimonial/i })
    .findIndex((dot) => dot.className.includes("w-6"));
}

describe("Testimonials carousel", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("auto-advances to the next testimonial every 3 seconds", () => {
    render(<Testimonials />);

    // Flush the requestAnimationFrame init chain so the carousel is "initialized"
    // and the auto-advance interval is armed.
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(activeDotIndex()).toBe(0);

    // Just before the 3s mark the carousel should not have advanced yet.
    act(() => {
      vi.advanceTimersByTime(2900);
    });
    expect(activeDotIndex()).toBe(0);

    // Crossing 3s advances exactly one testimonial.
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(activeDotIndex()).toBe(1);
  });
});
