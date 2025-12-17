import fs from "fs"
import path from "path"
import { getOgImage } from "./og-image"
import { Project } from "./types"

const dataDirectory = path.join(process.cwd(), "data")
const projectsFile = path.join(dataDirectory, "projects.json")

export function projectsExist(): boolean {
  return fs.existsSync(projectsFile)
}

export function getAllProjectsRaw(): Project[] {
  if (!projectsExist()) {
    return []
  }

  try {
    const fileContents = fs.readFileSync(projectsFile, "utf8")
    const projects: Project[] = JSON.parse(fileContents)

    // Sort by date (newest first)
    return projects.sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error("Error reading projects.json:", error)
    return []
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = getAllProjectsRaw()

  // Fetch OG images for projects without images
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      if (!project.image && project.link) {
        const ogImage = await getOgImage(project.link)
        return {
          ...project,
          image: ogImage || "/images/og-default.jpg",
        }
      }
      return project
    })
  )

  return projectsWithImages
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getAllProjects()
  return projects.find((project) => project.id === id)
}
