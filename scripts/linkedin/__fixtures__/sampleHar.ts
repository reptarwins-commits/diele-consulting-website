// A representative slice of a LinkedIn activity HAR, used to drive the parser tests.
//
// This is my best reconstruction of LinkedIn's Voyager GraphQL shape (top-level
// `included[]` bag of denormalized Update entities). When Joe's real HAR lands,
// validate this against it and tune `toRawUpdate`/`looksLikeUpdate` in parseHar.ts
// (plus add a restli `elements[]` example) if the live shape differs.

export const JOE = "urn:li:fsd_profile:JOE";
export const SOMEONEELSE = "urn:li:fsd_profile:SOMEONEELSE";

const textPost = {
  $type: "com.linkedin.voyager.dash.feed.Update",
  updateMetadata: { urn: "urn:li:activity:7150000000000000001" },
  actor: { urn: JOE, name: { text: "Joe Diele" } },
  commentary: { text: { text: "Leadership is a skill you practice, not a title you earn." } },
};

const reshareWithComment = {
  $type: "com.linkedin.voyager.dash.feed.Update",
  updateMetadata: { urn: "urn:li:activity:7150000000000000002" },
  actor: { urn: JOE, name: { text: "Joe Diele" } },
  commentary: { text: { text: "Great points here on quality systems." } },
  resharedUpdate: { entityUrn: "urn:li:activity:7000000000000000999" },
};

const articlePost = {
  $type: "com.linkedin.voyager.dash.feed.Update",
  updateMetadata: { urn: "urn:li:activity:7150000000000000003" },
  actor: { urn: JOE, name: { text: "Joe Diele" } },
  commentary: { text: { text: "I wrote about sustainable quality." } },
  content: {
    articleComponent: {
      title: { text: "Sustainable Quality" },
      navigationContext: { actionTarget: "https://www.linkedin.com/pulse/sustainable-quality-joe" },
    },
  },
};

// The original post inside the reshare — by someone else. LinkedIn denormalizes it
// as its own included[] entry, so the parser sees it too; normalize() must drop it.
const foreignResharedSource = {
  $type: "com.linkedin.voyager.dash.feed.Update",
  updateMetadata: { urn: "urn:li:activity:7000000000000000999" },
  actor: { urn: SOMEONEELSE, name: { text: "Other Person" } },
  commentary: { text: { text: "Original content from someone else." } },
};

// An update with no commentary (e.g. a bare share) — type "empty".
const emptyUpdate = {
  $type: "com.linkedin.voyager.dash.feed.Update",
  updateMetadata: { urn: "urn:li:activity:7150000000000000004" },
  actor: { urn: JOE, name: { text: "Joe Diele" } },
};

const graphqlBody = {
  data: {},
  included: [textPost, reshareWithComment, articlePost, foreignResharedSource, emptyUpdate],
};

export const sampleHar = {
  log: {
    version: "1.2",
    creator: { name: "WebInspector", version: "537.36" },
    entries: [
      {
        request: {
          method: "GET",
          url: "https://www.linkedin.com/voyager/api/graphql?queryId=voyagerFeedDashProfileUpdates.abc123&variables=(count:20)",
        },
        response: {
          status: 200,
          content: { mimeType: "application/json", text: JSON.stringify(graphqlBody) },
        },
      },
      {
        // Unrelated request — must be ignored by parseHar.
        request: { method: "GET", url: "https://media.licdn.com/dms/image/somephoto.jpg" },
        response: { status: 200, content: { mimeType: "image/jpeg", text: "" } },
      },
    ],
  },
};
