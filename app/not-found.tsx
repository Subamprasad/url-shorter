import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
        Link not found
      </div>
      <h1 className="mt-6 font-display text-5xl text-ink">This short link is missing or inactive.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/70">
        The URL may have been deleted, disabled, or typed incorrectly. You can create a new short link from
        the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-coral"
      >
        Back to home
      </Link>
    </main>
  );
}
