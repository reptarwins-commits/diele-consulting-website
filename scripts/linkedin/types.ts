// Shared types for the LinkedIn → blog backfill tooling.
// Data flows: HAR (Voyager JSON) --parseHar--> RawUpdate[] --normalize--> NormalizedPost[]
//             --mapPostToNotion--> Notion page (Draft).

/** A loosely-extracted LinkedIn feed update, straight out of the HAR. */
export interface RawUpdate {
  /** An `urn:li:activity:NNN` if one was directly on the entity. */
  activityUrn?: string;
  /** Any urn that may embed the activity id (e.g. `urn:li:fsd_update:(urn:li:activity:NNN,…)`). */
  entityUrn?: string;
  shareUrn?: string;
  /** Full post commentary text (no "…see more" truncation). */
  commentaryText?: string;
  /** Author profile urn — used to keep Joe's posts and drop reshared sources. */
  actorUrn?: string;
  actorName?: string;
  /** Epoch ms, if the payload carried an explicit timestamp. */
  createdAtMs?: number;
  isReshare?: boolean;
  articleTitle?: string;
  articleUrl?: string;
  mediaCount?: number;
}

export type PostType = "article" | "text" | "reshare" | "empty";

/** A clean, deduped, dated post ready for inventory + Notion import. */
export interface NormalizedPost {
  urn: string; // urn:li:activity:NNN
  permalink: string;
  publishedAt: string; // YYYY-MM-DD
  publishedAtMs: number;
  type: PostType;
  text: string;
  articleTitle?: string;
  articleUrl?: string;
  mediaCount: number;
  isReshare: boolean;
  actorUrn?: string;
  actorName?: string;
}
