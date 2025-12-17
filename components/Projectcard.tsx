"use client"

import Image from "next/image"
import { Project } from "../lib/types"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer")
    } else {
      alert("링크가 아직 준비되지 않았습니다. 추후 업데이트 예정입니다.")
    }
  }

  const imageUrl = project.image || "/images/og-default.jpg"
  const isExternal = imageUrl.startsWith("http")

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized={isExternal}
        />
      </div>

      <div className="p-6">
        {project.tags && project.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
          {project.title}
        </h2>

        <p className="mt-2 text-[var(--color-text-secondary)] line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {project.date && (
            <time className="text-sm text-[var(--color-text-secondary)]">
              {project.date}
            </time>
          )}

          {project.link && (
            <span className="inline-flex items-center text-sm font-medium text-[var(--color-primary)]">
              View Project
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
