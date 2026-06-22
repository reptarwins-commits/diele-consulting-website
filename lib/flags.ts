/**
 * Feature flags.
 *
 * BLOG_ENABLED gates the /blog routes and the Nav "Blog" link. It stays off until
 * Joe has added real posts to the Notion "Blog Posts" database. To reveal the blog,
 * set NEXT_PUBLIC_BLOG_ENABLED=true in the Vercel project env and redeploy.
 */
export const BLOG_ENABLED = process.env.NEXT_PUBLIC_BLOG_ENABLED === "true";
