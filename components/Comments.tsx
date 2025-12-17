"use client"

import Giscus from "@giscus/react"
import { useEffect, useState } from "react"
import config from "../blog.config"

export default function Comments() {
  const [theme, setTheme] = useState(() => {
    // Initialize theme based on current dark mode status
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark")
      return isDark ? "dark" : "light"
    }
    return "light"
  })

  useEffect(() => {
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark")
          setTheme(isDark ? "dark" : "light")
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  if (!config.features.comments) {
    return null
  }

  return (
    <section className="mt-16 border-t border-[var(--color-border)] pt-8">
      <h2 className="mb-8 text-2xl font-bold text-[var(--color-text)]">
        Comments
      </h2>
      <Giscus
        id="comments"
        repo={config.giscus.repo as `${string}/${string}`}
        repoId={config.giscus.repoId}
        category={config.giscus.category}
        categoryId={config.giscus.categoryId}
        mapping={config.giscus.mapping as "pathname"}
        reactionsEnabled={config.giscus.reactionsEnabled ? "1" : "0"}
        emitMetadata={config.giscus.emitMetadata ? "1" : "0"}
        inputPosition={config.giscus.inputPosition}
        theme={theme}
        lang={config.giscus.lang}
        loading="lazy"
      />
    </section>
  )
}
