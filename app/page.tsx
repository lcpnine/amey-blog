import Link from "next/link"
import config from "../blog.config"
import PostCard from "../components/PostCard"
import { getAllPosts, getFeaturedPosts } from "../lib/posts"

export default function HomePage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
          Welcome to {config.site.title}
        </h1>
        <p className="mt-4 text-xl text-[var(--color-text-secondary)]">
          {config.site.description}
        </p>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-[var(--color-text)]">
            Featured
          </h2>
          <div className="grid gap-8">
            {featuredPosts.slice(0, 1).map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-[var(--color-primary)] hover:underline"
          >
            View all posts →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {recentPosts.map((post) => (
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
      </section>
    </div>
  )
}
