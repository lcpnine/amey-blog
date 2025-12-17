"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import config from "../blog.config"

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      return savedTheme === "dark" || (!savedTheme && prefersDark)
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.classList.toggle("light", !isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)]"
        >
          {config.site.title}
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {config.nav.map((item: { href: string; label: string }) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {config.features.darkMode && (
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              suppressHydrationWarning
            >
              {isDark ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
