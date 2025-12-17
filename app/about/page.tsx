import config from "../../blog.config"
import AuthorCard from "../../components/AuthorCard"
import { getAllAuthors } from "../../lib/authors"
import { generateMetadata as generateSEO } from "../../lib/seo"

export const metadata = generateSEO({
  title: "About",
  description: `Learn more about ${config.site.title} and the team behind it`,
  path: "/about",
})

export default function AboutPage() {
  const authors = getAllAuthors()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">About</h1>
        <p className="mt-4 text-xl text-[var(--color-text-secondary)]">
          {config.site.description}
        </p>
      </header>

      <section className="prose prose-lg max-w-none dark:prose-invert">
        <p>
          Welcome to {config.site.title}! This is a blog about technology,
          programming, and all things interesting. We share insights, tutorials,
          and thoughts on the latest trends in the tech world.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to share knowledge and help developers grow. We believe
          in open source, continuous learning, and building a supportive
          community.
        </p>

        <h2>Meet the Team</h2>
      </section>

      {/* Authors Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>

      <section className="mt-12 prose prose-lg max-w-none dark:prose-invert">
        <h2>Get in Touch</h2>
        <p>
          Have questions or want to collaborate? Feel free to reach out through
          our social media channels or drop us an email.
        </p>
      </section>
    </div>
  )
}
