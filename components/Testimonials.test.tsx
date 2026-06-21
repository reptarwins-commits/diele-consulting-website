import { render, screen, act, fireEvent } from "@testing-library/react";
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

  it("previews long recommendations behind a 'Show full recommendation' control", () => {
    render(<Testimonials />);
    // The tail of Anh's long quote is hidden until expanded.
    expect(screen.queryAllByText(/privilege to endorse him/i).length).toBe(0);
    expect(
      screen.getAllByRole("button", { name: /show full recommendation/i }).length,
    ).toBeGreaterThan(0);
  });

  it("expands to reveal the full recommendation when the control is clicked", () => {
    render(<Testimonials />);
    fireEvent.click(
      screen.getAllByRole("button", { name: /show full recommendation/i })[0],
    );
    expect(
      screen.getAllByText(/privilege to endorse him/i).length,
    ).toBeGreaterThan(0);
  });
});
