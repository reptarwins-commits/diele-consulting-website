import { describe, it, expect } from "vitest";
import { isUpdatesUrl, parseHar } from "./parseHar";
import { sampleHar, JOE, SOMEONEELSE } from "./__fixtures__/sampleHar";

describe("isUpdatesUrl", () => {
  it("matches voyager graphql + profile-update endpoints", () => {
    expect(
      isUpdatesUrl("https://www.linkedin.com/voyager/api/graphql?queryId=voyagerFeedDashProfileUpdates.x"),
    ).toBe(true);
    expect(isUpdatesUrl("https://www.linkedin.com/voyager/api/identity/profileUpdatesV2?count=20")).toBe(true);
  });

  it("ignores unrelated requests", () => {
    expect(isUpdatesUrl("https://media.licdn.com/dms/image/x.jpg")).toBe(false);
    expect(isUpdatesUrl("https://www.linkedin.com/voyager/api/voyagerMessagingDashConversations")).toBe(false);
  });
});

describe("parseHar", () => {
  const raws = parseHar(sampleHar);

  it("extracts every update entity from matching responses and ignores the rest", () => {
    expect(raws).toHaveLength(5);
  });

  it("pulls full commentary text (no truncation)", () => {
    const t = raws.find((r) => r.commentaryText?.startsWith("Leadership"));
    expect(t?.commentaryText).toBe("Leadership is a skill you practice, not a title you earn.");
  });

  it("detects reshares", () => {
    expect(raws.some((r) => r.isReshare)).toBe(true);
  });

  it("detects an article's title + url", () => {
    const a = raws.find((r) => r.articleTitle);
    expect(a?.articleTitle).toBe("Sustainable Quality");
    expect(a?.articleUrl).toContain("/pulse/");
  });

  it("captures actor urns, including the reshared source's foreign author", () => {
    expect(raws.some((r) => r.actorUrn === JOE)).toBe(true);
    expect(raws.some((r) => r.actorUrn === SOMEONEELSE)).toBe(true);
  });

  it("returns [] for a HAR with no entries", () => {
    expect(parseHar({ log: { entries: [] } })).toEqual([]);
    expect(parseHar({})).toEqual([]);
  });
});
