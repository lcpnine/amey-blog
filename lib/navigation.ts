import { certificatesExist } from "./certificates"
import { projectsExist } from "./projects"

export interface NavItem {
  label: string
  href: string
}

// Base navigation items that are always shown
const baseNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

// Optional navigation items based on data availability
const optionalNav: { key: string; item: NavItem; check: () => boolean }[] = [
  {
    key: "projects",
    item: { label: "Projects", href: "/projects" },
    check: projectsExist,
  },
  {
    key: "certificates",
    item: { label: "Certificates", href: "/certificates" },
    check: certificatesExist,
  },
]

export function getNavigationItems(): NavItem[] {
  const nav = [...baseNav]

  // Insert optional items before "About"
  const aboutIndex = nav.findIndex((item) => item.href === "/about")

  optionalNav.forEach(({ item, check }) => {
    if (check()) {
      nav.splice(aboutIndex, 0, item)
    }
  })

  return nav
}

export function isProjectsEnabled(): boolean {
  return projectsExist()
}

export function isCertificatesEnabled(): boolean {
  return certificatesExist()
}
