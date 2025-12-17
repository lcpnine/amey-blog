import { notFound } from "next/navigation"
import ProjectCard from "../../components/ProjectCard"
import { getAllProjects, projectsExist } from "../../lib/projects"
import { generateMetadata as generateSEO } from "../../lib/seo"

export const metadata = generateSEO({
  title: "Projects",
  description: "My projects and portfolio",
  path: "/projects",
})

export default async function ProjectsPage() {
  // Return 404 if projects.json doesn't exist
  if (!projectsExist()) {
    notFound()
  }

  const projects = await getAllProjects()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Projects
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
          My projects and portfolio
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
          <p className="text-[var(--color-text-secondary)]">
            No projects yet. Add projects to{" "}
            <code className="rounded bg-[var(--color-border)] px-2 py-1">
              data/projects.json
            </code>
          </p>
        </div>
      )}
    </div>
  )
}
