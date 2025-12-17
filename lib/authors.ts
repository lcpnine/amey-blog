import { Author } from "./types"

const authors: Record<string, Author> = {
  "john-doe": {
    id: "john-doe",
    name: "John Doe",
    bio: "Full-stack developer passionate about web technologies and open source.",
    avatar: "/images/authors/john-doe.jpg",
    social: {
      twitter: "johndoe",
      github: "johndoe",
      website: "https://johndoe.com",
    },
  },
  "jane-smith": {
    id: "jane-smith",
    name: "Jane Smith",
    bio: "Tech writer and software engineer with a focus on developer experience.",
    avatar: "/images/authors/jane-smith.jpg",
    social: {
      twitter: "janesmith",
      github: "janesmith",
      linkedin: "janesmith",
    },
  },
  // Add more authors here
}

// Alias mapping for easier lookup (case-insensitive)
const authorAliases: Record<string, string> = {
  john: "john-doe",
  "john doe": "john-doe",
  johndoe: "john-doe",
  doe: "john-doe",
}

export function getAuthor(id: string): Author | undefined {
  if (!id) return undefined

  // Normalize the input
  const normalizedId = id.toLowerCase().trim()

  // Try direct lookup first
  if (authors[normalizedId]) {
    return authors[normalizedId]
  }

  // Try alias lookup
  const aliasedId = authorAliases[normalizedId]
  if (aliasedId && authors[aliasedId]) {
    return authors[aliasedId]
  }

  return undefined
}

export function getAllAuthors(): Author[] {
  return Object.values(authors)
}

export default authors
