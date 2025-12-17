"use client"

import Image from "next/image"
import { Certificate } from "../lib/types"

interface CertificateCardProps {
  certificate: Certificate
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const handleClick = () => {
    if (certificate.link) {
      window.open(certificate.link, "_blank", "noopener,noreferrer")
    } else {
      alert("링크가 아직 준비되지 않았습니다. 추후 업데이트 예정입니다.")
    }
  }

  const imageUrl = certificate.image || "/images/og-default.jpg"
  const isExternal = imageUrl.startsWith("http")

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={certificate.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized={isExternal}
        />
      </div>

      <div className="p-6">
        {certificate.issuer && (
          <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
            {certificate.issuer}
          </p>
        )}

        <h2 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
          {certificate.title}
        </h2>

        <p className="mt-2 text-[var(--color-text-secondary)] line-clamp-2">
          {certificate.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {certificate.date && (
            <time className="text-sm text-[var(--color-text-secondary)]">
              {certificate.date}
            </time>
          )}

          {certificate.link && (
            <span className="inline-flex items-center text-sm font-medium text-[var(--color-primary)]">
              View Certificate
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
