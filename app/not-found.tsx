import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[var(--color-text)]">404</h1>
      <p className="mt-4 text-xl text-[var(--color-text-secondary)]">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[var(--color-primary)] px-6 py-3 font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        Go back home
      </Link>
    </div>
  )
}
