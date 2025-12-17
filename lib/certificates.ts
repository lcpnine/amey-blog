import fs from "fs"
import path from "path"
import { getOgImage } from "./og-image"
import { Certificate } from "./types"

const dataDirectory = path.join(process.cwd(), "data")
const certificatesFile = path.join(dataDirectory, "certificates.json")

export function certificatesExist(): boolean {
  return fs.existsSync(certificatesFile)
}

export function getAllCertificatesRaw(): Certificate[] {
  if (!certificatesExist()) {
    return []
  }

  try {
    const fileContents = fs.readFileSync(certificatesFile, "utf8")
    const certificates: Certificate[] = JSON.parse(fileContents)

    // Sort by date (newest first)
    return certificates.sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error("Error reading certificates.json:", error)
    return []
  }
}

export async function getAllCertificates(): Promise<Certificate[]> {
  const certificates = getAllCertificatesRaw()

  // Fetch OG images for certificates without images
  const certificatesWithImages = await Promise.all(
    certificates.map(async (cert) => {
      if (!cert.image && cert.link) {
        const ogImage = await getOgImage(cert.link)
        return {
          ...cert,
          image: ogImage || "/images/og-default.jpg",
        }
      }
      return cert
    })
  )

  return certificatesWithImages
}

export async function getCertificateById(
  id: string
): Promise<Certificate | undefined> {
  const certificates = await getAllCertificates()
  return certificates.find((cert) => cert.id === id)
}
