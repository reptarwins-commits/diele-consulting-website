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

  it("includes Anh Bao's testimonial", () => {
    render(<Testimonials />);
    expect(screen.getAllByText("Anh Bao").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Product Quality Manager · Supermicro/).length,
    ).toBeGreaterThan(0);
  });

  it("shows two cards at a time on desktop (2-up)", () => {
    render(<Testimonials />);
    const track = screen.getByTestId("carousel-track");
    const slides = track.children.length;
    const width = parseFloat(track.style.width);
    // 2-up: the track is wide enough to show exactly 2 slides per viewport.
    expect(width).toBeCloseTo((slides / 2) * 100, 1);
  });

  it("shows each recommendation in full with no expand toggle", () => {
    render(<Testimonials />);
    // The full text of even the longest quote is rendered (no truncation)...
    expect(
      screen.getAllByText(/privilege to endorse him/i).length,
    ).toBeGreaterThan(0);
    // ...and there is no show full / show less control.
    expect(
      screen.queryByRole("button", { name: /show (full recommendation|less)/i }),
    ).not.toBeInTheDocument();
  });
});
