import type { RawUpdate, NormalizedPost, PostType } from "./types";

const ACTIVITY_RE = /urn:li:activity:(\d+)/;

/**
 * LinkedIn activity ids are 64-bit; the high 41 bits are the creation time in
 * epoch ms and the low 22 bits are a sequence/worker — so `id >> 22` is the ms.
 */
export function activityIdToMs(id: string): number {
  return Number(BigInt(id) >> BigInt(22));
}

/** Resolve a canonical `urn:li:activity:NNN` from whatever urn fields are present. */
export function extractActivityUrn(raw: RawUpdate): string | undefined {
  for (const cand of [raw.activityUrn, raw.entityUrn, raw.shareUrn]) {
    const m = cand?.match(ACTIVITY_RE);
    if (m) return `urn:li:activity:${m[1]}`;
  }
  return undefined;
}

export function classify(raw: RawUpdate, text: string): PostType {
  if (raw.articleTitle || raw.articleUrl) return "article";
  if (raw.isReshare) return "reshare";
  if (text.trim().length > 0) return "text";
  return "empty";
}

export function permalinkFor(urn: string): string {
  return `https://www.linkedin.com/feed/update/${urn}/`;
}

function toISODate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

function normalizeOne(raw: RawUpdate): NormalizedPost | null {
  const urn = extractActivityUrn(raw);
  if (!urn) return null;
  const id = urn.match(ACTIVITY_RE)![1];
  const text = (raw.commentaryText ?? "").trim();
  const ms = raw.createdAtMs ?? activityIdToMs(id);
  return {
    urn,
    permalink: permalinkFor(urn),
    publishedAt: toISODate(ms),
    publishedAtMs: ms,
    type: classify(raw, text),
    text,
    articleTitle: raw.articleTitle,
    articleUrl: raw.articleUrl,
    mediaCount: raw.mediaCount ?? 0,
    isReshare: Boolean(raw.isReshare),
    actorUrn: raw.actorUrn,
    actorName: raw.actorName,
  };
}

/**
 * Best-guess at Joe's own profile urn: the author who appears most across
 * updates that carry commentary (his posts). Lets `normalize` drop the
 * foreign authors of reshared source posts. Override with a known urn if needed.
 */
export function inferSelfActorUrn(raws: RawUpdate[]): string | undefined {
  const tally = new Map<string, number>();
  for (const r of raws) {
    if (!r.actorUrn || !r.commentaryText?.trim()) continue;
    tally.set(r.actorUrn, (tally.get(r.actorUrn) ?? 0) + 1);
  }
  let best: string | undefined;
  let bestN = 0;
  for (const [urn, n] of tally) {
    if (n > bestN) {
      best = urn;
      bestN = n;
    }
  }
  return best;
}

export function normalize(
  raws: RawUpdate[],
  opts: { selfActorUrn?: string } = {},
): NormalizedPost[] {
  const byUrn = new Map<string, NormalizedPost>();
  for (const raw of raws) {
    const post = normalizeOne(raw);
    if (!post) continue;
    // Keep only Joe's own updates when we know who he is.
    if (opts.selfActorUrn && post.actorUrn && post.actorUrn !== opts.selfActorUrn) continue;

    const existing = byUrn.get(post.urn);
    if (!existing) {
      byUrn.set(post.urn, post);
      continue;
    }
    // Same activity seen twice (paged/denormalized) — keep the richer copy.
    const richer = post.text.length > existing.text.length || (!existing.articleUrl && !!post.articleUrl);
    if (richer) byUrn.set(post.urn, post);
  }
  return [...byUrn.values()].sort((a, b) => b.publishedAtMs - a.publishedAtMs);
}
