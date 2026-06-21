import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Unmount React trees after each test to keep tests isolated.
afterEach(() => {
  cleanup();
});

// jsdom has no IntersectionObserver; many components use it for scroll reveals.
// Default mock reports nothing intersecting. Override per-test if needed.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// jsdom has no rAF loop; provide a synchronous-ish shim for count-up animations.
vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 0) as unknown as number,
);
vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
