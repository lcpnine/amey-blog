import config from "../../blog.config"
import { getAuthor } from "../../lib/authors"
import { getAllPosts } from "../../lib/posts"

export async function GET() {
  const posts = getAllPosts()

  const rssItems = posts
    .map((post) => {
      const author = getAuthor(post.authors?.[0] || "")
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>${config.site.url}/blog/${post.slug}</link>
        <guid isPermaLink="true">${config.site.url}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        ${author ? `<author>${author.name}</author>` : ""}
        ${
          post.tags
            ?.map((tag) => `<category>${tag}</category>`)
            .join("\n        ") || ""
        }
      </item>`
    })
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.site.title}</title>
    <description>${config.site.description}</description>
    <link>${config.site.url}</link>
    <atom:link href="${
      config.site.url
    }/rss.xml" rel="self" type="application/rss+xml"/>
    <language>${config.site.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
