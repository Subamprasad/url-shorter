import { CreateLinkForm } from "@/components/create-link-form";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-8 lg:px-10">
      <section className="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink/60 shadow-sm">
            Anonymous link shortener
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
              Short links without the account drama.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/70">
              Paste any long URL, get a compact short link, and manage it later with a private secret URL.
              No signup, no dashboard, no friction.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-ink/10 bg-white/75 p-5 shadow-sm">
              <p className="text-sm font-semibold text-ink">Instant redirect</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Fast code lookup and a clean redirect flow that is ready for caching later.
              </p>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-white/75 p-5 shadow-sm">
              <p className="text-sm font-semibold text-ink">Secret manage link</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Each short URL gets a private management link so edits stay simple without user accounts.
              </p>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-white/75 p-5 shadow-sm">
              <p className="text-sm font-semibold text-ink">Basic analytics</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Track total clicks now and keep the event schema ready for deeper insights later.
              </p>
            </div>
          </div>
        </div>

        <CreateLinkForm />
      </section>
    </main>
  );
}
