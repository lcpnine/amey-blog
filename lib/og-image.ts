import fs from "fs"
import path from "path"

const cacheDir = path.join(process.cwd(), ".og-cache")
const cacheFile = path.join(cacheDir, "og-images.json")

interface OgCache {
  [url: string]: {
    ogImage: string | null
    fetchedAt: number
  }
}

function loadCache(): OgCache {
  try {
    if (fs.existsSync(cacheFile)) {
      return JSON.parse(fs.readFileSync(cacheFile, "utf8"))
    }
  } catch (error) {
    console.error("Error loading OG cache:", error)
  }
  return {}
}

function saveCache(cache: OgCache): void {
  try {
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2))
  } catch (error) {
    console.error("Error saving OG cache:", error)
  }
}

async function fetchOgImageFromUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OGImageFetcher/1.0)",
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      return null
    }

    const html = await response.text()

    // Extract OG image from meta tags
    const ogImageMatch =
      html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i
      )

    // Also try twitter:image as fallback
    const twitterImageMatch =
      html.match(
        /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["'][^>]*>/i
      )

    const ogImage = ogImageMatch?.[1] || twitterImageMatch?.[1] || null

    // Make relative URLs absolute
    if (ogImage && !ogImage.startsWith("http")) {
      const urlObj = new URL(url)
      return ogImage.startsWith("/")
        ? `${urlObj.origin}${ogImage}`
        : `${urlObj.origin}/${ogImage}`
    }

    return ogImage
  } catch (error) {
    console.error(`Error fetching OG image from ${url}:`, error)
    return null
  }
}

export async function getOgImage(url: string): Promise<string | null> {
  const cache = loadCache()
  const cacheExpiry = 24 * 60 * 60 * 1000 // 24 hours

  // Check cache
  if (cache[url] && Date.now() - cache[url].fetchedAt < cacheExpiry) {
    return cache[url].ogImage
  }

  // Fetch and cache
  const ogImage = await fetchOgImageFromUrl(url)
  cache[url] = {
    ogImage,
    fetchedAt: Date.now(),
  }
  saveCache(cache)

  return ogImage
}

export async function preloadOgImages(
  urls: string[]
): Promise<Map<string, string | null>> {
  const results = new Map<string, string | null>()

  await Promise.all(
    urls.map(async (url) => {
      const ogImage = await getOgImage(url)
      results.set(url, ogImage)
    })
  )

  return results
}
