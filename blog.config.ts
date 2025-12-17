import { BlogConfig } from "./lib/types"

const config: BlogConfig = {
  // Site metadata
  site: {
    title: "My Blog",
    description: "A blog about technology, programming, and life",
    url: "https://yourdomain.com", // Change this to your domain
    language: "en",
    locale: "en_US",
  },

  // Default author (used when post doesn't specify an author)
  defaultAuthor: "john-doe",

  // Navigation links
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],

  // Social links (used in footer and author profiles)
  social: {
    twitter: "yourusername",
    github: "yourusername",
    linkedin: "yourusername",
  },

  // Giscus configuration for comments
  // Get these values from https://giscus.app
  giscus: {
    repo: "yourusername/yourrepo", // e.g., "john-doe/my-blog"
    repoId: "your-repo-id",
    category: "Announcements",
    categoryId: "your-category-id",
    mapping: "pathname",
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: "bottom",
    theme: "preferred_color_scheme",
    lang: "en",
  },

  // Posts per page for pagination
  postsPerPage: 10,

  // Enable/disable features
  features: {
    comments: true,
    darkMode: true,
    search: false, // Future feature
    rss: true,
  },
}

export default config
