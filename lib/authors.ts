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

export function getAuthor(id: string): Author | undefined {
  return authors[id]
}

export function getAllAuthors(): Author[] {
  return Object.values(authors)
}

export default authors
