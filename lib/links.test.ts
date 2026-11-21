import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Every LinkedIn link to Joe must use /in/jdiele (Joe confirmed, Fix List v2.1).
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(tsx?|mdx?)$/.test(name) && !/\.test\./.test(name) ? [p] : [];
  });
}

describe("site links", () => {
  it("never links to the old /in/josephdiele LinkedIn profile", () => {
    const offenders = ["app", "components", "lib"]
      .flatMap(sourceFiles)
      .filter((f) => readFileSync(f, "utf8").includes("linkedin.com/in/josephdiele"));
    expect(offenders).toEqual([]);
  });
});

describe("timespan claims", () => {
  it("never says twenty years", () => {
    const offenders = ["app", "components", "lib"]
      .flatMap(sourceFiles)
      .filter((f) => /twenty years/i.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});

describe("P12 consistency", () => {
  const files = () =>
    ["app", "components", "lib"].flatMap(sourceFiles).filter((f) => !f.endsWith("lib/results.ts"));

  it("says 35+ years, never a bare '35 years' / '35 Years'", () => {
    const offenders = files().filter((f) => /\b35 (years|Years)\b/.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("uses 'Leader Development' except in the approved Services offer heading", () => {
    const offenders = files().filter((f) => {
      const src = readFileSync(f, "utf8").replace("Leadership Development & Executive Coaching", "");
      return /[Ll]eadership [Dd]evelopment/.test(src);
    });
    expect(offenders).toEqual([]);
  });

  it("names the business 'Diele Consulting LLC' in page titles (About keeps its approved title)", () => {
    const offenders = files().filter((f) => {
      const src = readFileSync(f, "utf8");
      return /\| Diele Consulting"/.test(src);
    });
    expect(offenders).toEqual([]);
  });

  it("never says M.S. Org. Leadership", () => {
    expect(files().filter((f) => readFileSync(f, "utf8").includes("M.S. Org. Leadership"))).toEqual([]);
  });
});
