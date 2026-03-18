import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/blog"],
        disallow: [
          "/concept-2",
          "/concept-3",
          "/concept-4",
          "/concept-a",
          "/concept-b",
          "/concept-c",
          "/concept-d",
          "/concept-e",
          "/concept-e1",
          "/concept-e2",
          "/concept-e3",
        ],
      },
    ],
    sitemap: "https://www.dieleconsulting.com/sitemap.xml",
  };
}
