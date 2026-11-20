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
