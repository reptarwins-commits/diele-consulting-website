import { describe, it, expect } from "vitest";
import {
  activityIdToMs,
  extractActivityUrn,
  classify,
  permalinkFor,
  normalize,
  inferSelfActorUrn,
} from "./normalize";
import { parseHar } from "./parseHar";
import { sampleHar, JOE, SOMEONEELSE } from "./__fixtures__/sampleHar";

describe("activityIdToMs", () => {
  it("decodes the epoch-ms timestamp embedded in a LinkedIn activity id", () => {
    const ms = Date.UTC(2024, 0, 15, 12, 0, 0);
    const id = (BigInt(ms) << BigInt(22)).toString(); // re-encode, then expect a clean round-trip
    expect(activityIdToMs(id)).toBe(ms);
  });
});

describe("extractActivityUrn", () => {
  it("returns a direct activity urn", () => {
    expect(extractActivityUrn({ activityUrn: "urn:li:activity:12345" })).toBe("urn:li:activity:12345");
  });
  it("pulls the activity id out of a nested entity urn", () => {
    expect(extractActivityUrn({ entityUrn: "urn:li:fsd_update:(urn:li:activity:67890,FEED_DETAIL)" })).toBe(
      "urn:li:activity:67890",
    );
  });
  it("returns undefined when no activity urn is present", () => {
    expect(extractActivityUrn({ entityUrn: "urn:li:fsd_profile:abc" })).toBeUndefined();
  });
});

describe("classify", () => {
  it("flags articles, reshares, text, and empty in priority order", () => {
    expect(classify({ articleTitle: "X" }, "")).toBe("article");
    expect(classify({ isReshare: true }, "")).toBe("reshare");
    expect(classify({}, "hello")).toBe("text");
    expect(classify({}, "")).toBe("empty");
  });
});

describe("permalinkFor", () => {
  it("builds a feed-update permalink", () => {
    expect(permalinkFor("urn:li:activity:42")).toBe("https://www.linkedin.com/feed/update/urn:li:activity:42/");
  });
});

describe("normalize (integration over the sample HAR)", () => {
  const raws = parseHar(sampleHar);

  it("infers Joe as the dominant author", () => {
    expect(inferSelfActorUrn(raws)).toBe(JOE);
  });

  const posts = normalize(raws, { selfActorUrn: JOE });

  it("drops updates authored by someone else (reshared sources)", () => {
    expect(posts.find((p) => p.actorUrn === SOMEONEELSE)).toBeUndefined();
  });

  it("keeps Joe's text, reshare, article, and empty updates", () => {
    expect(posts.map((p) => p.type).sort()).toEqual(["article", "empty", "reshare", "text"]);
  });

  it("sorts newest-first with ISO dates and permalinks", () => {
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].publishedAtMs).toBeGreaterThanOrEqual(posts[i].publishedAtMs);
    }
    expect(posts[0].publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(posts[0].permalink).toContain("/feed/update/urn:li:activity:");
  });

  it("captures article title + url", () => {
    const article = posts.find((p) => p.type === "article")!;
    expect(article.articleTitle).toBe("Sustainable Quality");
    expect(article.articleUrl).toContain("linkedin.com/pulse");
  });
});

describe("normalize dedup", () => {
  it("keeps the richer duplicate when the same urn appears twice", () => {
    const posts = normalize([
      { activityUrn: "urn:li:activity:5", actorUrn: JOE, commentaryText: "" },
      { activityUrn: "urn:li:activity:5", actorUrn: JOE, commentaryText: "the full text" },
    ]);
    expect(posts).toHaveLength(1);
    expect(posts[0].text).toBe("the full text");
  });
});
