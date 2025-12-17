import Link from "next/link"
import PostCard from "../../components/PostCard"
import { getAllPosts, getAllTags } from "../../lib/posts"
import { generateMetadata as generateSEO } from "../../lib/seo"

export const metadata = generateSEO({
  title: "Blog",
  description: "Read our latest articles and insights",
  path: "/blog",
})

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">Blog</h1>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
          All articles and insights
        </p>
      </header>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white"
          >
            All
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
          <p className="text-[var(--color-text-secondary)]">
            No posts yet. Add your first post to{" "}
            <code className="rounded bg-[var(--color-border)] px-2 py-1">
              public/_posts/
            </code>
          </p>
        </div>
      )}
    </div>
  )
}
