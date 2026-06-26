import type { RawUpdate } from "./types";

const ACTIVITY_RE = /urn:li:activity:\d+/;

/** Does this request URL look like a LinkedIn feed / profile-update fetch? */
export function isUpdatesUrl(url: string): boolean {
  return /voyager\/api\/(graphql|identity\/profileUpdates|feed\/updates)/.test(url);
}

type Obj = Record<string, unknown>;
function isObj(x: unknown): x is Obj {
  return typeof x === "object" && x !== null;
}
function str(x: unknown): string | undefined {
  return typeof x === "string" ? x : undefined;
}
function get(o: unknown, key: string): unknown {
  return isObj(o) ? o[key] : undefined;
}

/** An entity is a feed update if it has commentary or an activity-bearing metadata urn. */
function looksLikeUpdate(o: unknown): boolean {
  if (!isObj(o)) return false;
  const commentary = get(get(get(o, "commentary"), "text"), "text");
  if (typeof commentary === "string") return true;
  for (const key of ["updateMetadata", "metadata"]) {
    const urn = str(get(get(o, key), "urn"));
    if (urn && ACTIVITY_RE.test(urn)) return true;
  }
  return false;
}

function findArticle(content: unknown): { title?: string; url?: string } | undefined {
  const ac = get(content, "articleComponent") ?? get(content, "*articleComponent");
  if (!isObj(ac)) return undefined;
  const title = str(get(get(ac, "title"), "text"));
  const nav = get(ac, "navigationContext");
  const url = str(get(nav, "actionTarget")) ?? str(get(nav, "url"));
  return title || url ? { title, url } : undefined;
}

function countMedia(content: unknown): number {
  const imgs = get(get(content, "imageComponent"), "images") ?? get(get(content, "carouselContent"), "items");
  return Array.isArray(imgs) ? imgs.length : 0;
}

function toRawUpdate(raw: unknown): RawUpdate {
  // restli responses wrap the entity under `value: { "com.linkedin…": {…} }`.
  const wrapped = get(raw, "value");
  const node = isObj(wrapped) ? (Object.values(wrapped)[0] ?? raw) : raw;
  const content = get(node, "content");
  const article = findArticle(content);
  return {
    activityUrn: str(get(get(node, "updateMetadata"), "urn")) ?? str(get(get(node, "metadata"), "urn")),
    entityUrn: str(get(node, "entityUrn")) ?? str(get(node, "dashEntityUrn")),
    shareUrn: str(get(get(node, "updateMetadata"), "shareUrn")) ?? str(get(node, "shareUrn")),
    commentaryText: str(get(get(get(node, "commentary"), "text"), "text")),
    actorUrn: str(get(get(node, "actor"), "urn")),
    actorName: str(get(get(get(node, "actor"), "name"), "text")),
    isReshare: Boolean(get(node, "resharedUpdate") ?? get(node, "*resharedUpdate") ?? get(node, "reshareContext")),
    articleTitle: article?.title,
    articleUrl: article?.url,
    mediaCount: countMedia(content),
  };
}

/** Gather the candidate entity arrays from a Voyager response body. */
function collectCandidates(body: unknown): unknown[] {
  const out: unknown[] = [];
  for (const arr of [get(body, "included"), get(body, "elements"), get(get(body, "data"), "elements")]) {
    if (Array.isArray(arr)) out.push(...arr);
  }
  return out;
}

export function extractUpdates(body: unknown): RawUpdate[] {
  return collectCandidates(body).filter(looksLikeUpdate).map(toRawUpdate);
}

export function parseHar(har: unknown): RawUpdate[] {
  const entries = get(get(har, "log"), "entries");
  if (!Array.isArray(entries)) return [];
  const out: RawUpdate[] = [];
  for (const e of entries) {
    const url = str(get(get(e, "request"), "url"));
    const text = str(get(get(get(e, "response"), "content"), "text"));
    if (!url || !isUpdatesUrl(url) || !text) continue;
    try {
      out.push(...extractUpdates(JSON.parse(text)));
    } catch {
      // Non-JSON body (e.g. truncated HAR export) — skip.
    }
  }
  return out;
}
