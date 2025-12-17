"use client"

import Image from "next/image"
import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

interface MarkdownProps {
  content: string
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="prose prose-lg max-w-none dark:prose-invert"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, rehypeHighlight]}
      components={{
        // Custom image component using Next.js Image
        img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => {
          if (!src || typeof src !== "string") return null

          // Handle external images
          if (src.startsWith("http")) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || ""}
                className="rounded-lg"
                loading="lazy"
                {...props}
              />
            )
          }

          // Handle internal images with Next.js Image
          return (
            <span className="relative block my-8">
              <Image
                src={src}
                alt={alt || ""}
                width={800}
                height={400}
                className="rounded-lg"
                style={{ width: "100%", height: "auto" }}
              />
            </span>
          )
        },

        // Custom link component
        a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
          const isInternal = href?.startsWith("/") || href?.startsWith("#")

          if (isInternal && href) {
            return (
              <Link href={href} {...props}>
                {children}
              </Link>
            )
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          )
        },

        // Custom code block with copy button
        pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
          return (
            <div className="relative group">
              <pre {...props} className="overflow-x-auto rounded-lg p-4">
                {children}
              </pre>
            </div>
          )
        },

        // Custom blockquote styling
        blockquote: ({
          children,
          ...props
        }: ComponentPropsWithoutRef<"blockquote">) => (
          <blockquote
            className="border-l-4 border-[var(--color-primary)] bg-[var(--color-bg-secondary)] pl-4 py-2 italic"
            {...props}
          >
            {children}
          </blockquote>
        ),

        // Custom table styling
        table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse" {...props}>
              {children}
            </table>
          </div>
        ),

        th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
          <th
            className="border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-left font-semibold"
            {...props}
          >
            {children}
          </th>
        ),

        td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
          <td
            className="border border-[var(--color-border)] px-4 py-2"
            {...props}
          >
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
