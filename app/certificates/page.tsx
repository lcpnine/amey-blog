import { notFound } from "next/navigation"
import CertificateCard from "../../components/CertificateCard"
import { certificatesExist, getAllCertificates } from "../../lib/certificates"
import { generateMetadata as generateSEO } from "../../lib/seo"

export const metadata = generateSEO({
  title: "Certificates",
  description: "My professional certifications and achievements",
  path: "/certificates",
})

export default async function CertificatesPage() {
  // Return 404 if certificates.json doesn't exist
  if (!certificatesExist()) {
    notFound()
  }

  const certificates = await getAllCertificates()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Certificates
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
          Professional certifications and achievements
        </p>
      </header>

      {certificates.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
          <p className="text-[var(--color-text-secondary)]">
            No certificates yet. Add certificates to{" "}
            <code className="rounded bg-[var(--color-border)] px-2 py-1">
              data/certificates.json
            </code>
          </p>
        </div>
      )}
    </div>
  )
}
