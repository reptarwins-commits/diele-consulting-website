import type { MetadataRoute } from "next";

const BASE = "https://dieleconsulting.com";

const ROUTES = ["", "/about", "/services", "/resources", "/resources/people-excellence-workshop"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${BASE}${path}` }));
}
