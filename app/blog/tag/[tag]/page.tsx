import Link from "next/link"
import { notFound } from "next/navigation"
import PostCard from "../../../../components/PostCard"
import { getAllTags, getPostsByTag } from "../../../../lib/posts"
import { generateMetadata as generateSEO } from "../../../../lib/seo"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  return generateSEO({
    title: `Posts tagged "${decodedTag}"`,
    description: `Browse all posts tagged with ${decodedTag}`,
    path: `/blog/tag/${tag}`,
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  const allTags = getAllTags()

  if (posts.length === 0 && !allTags.includes(decodedTag)) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <Link
          href="/blog"
          className="mb-4 inline-flex items-center text-[var(--color-primary)] hover:underline"
        >
          ← Back to all posts
        </Link>
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Posts tagged &quot;{decodedTag}&quot;
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </header>

      {/* Other Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/blog/tag/${t}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              t === decodedTag
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

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
            No posts found with this tag.
          </p>
        </div>
      )}
    </div>
  )
}
