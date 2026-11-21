import { describe, it, expect, vi } from "vitest";
vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "" }), Playfair_Display: () => ({ variable: "" }), Caveat: () => ({ variable: "" }) }));
import { metadata } from "./layout";

describe("site metadata", () => {
  it("uses the approved home title for <title> and og:title", () => {
    const title = "Leader Development for Hardware and Software Managers | Diele Consulting LLC";
    expect(metadata.title).toBe(title);
    expect((metadata.openGraph as { title?: string }).title).toBe(title);
  });
});
