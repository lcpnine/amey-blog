import { MetadataRoute } from "next"
import config from "../blog.config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${config.site.url}/sitemap.xml`,
  }
}
