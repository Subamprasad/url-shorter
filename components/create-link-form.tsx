"use client";

import { useState } from "react";

import type { CreateLinkResponse } from "@/lib/types";

type ResultState = Extract<CreateLinkResponse, { ok: true }>["data"] | null;

export function CreateLinkForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          originalUrl,
          customAlias
        })
      });

      const payload: CreateLinkResponse = await response.json();

      if (!payload.ok) {
        setError(payload.error);
        setResult(null);
        return;
      }

      setResult(payload.data);
      setOriginalUrl("");
      setCustomAlias("");
    } catch {
      setError("Something went wrong while creating the short link.");
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-card sm:p-8"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="originalUrl" className="mb-2 block text-sm font-semibold text-ink/70">
              Long URL
            </label>
            <input
              id="originalUrl"
              type="url"
              required
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              placeholder="https://example.com/very/long/link"
              className="w-full rounded-2xl border border-ink/15 bg-sand px-4 py-4 text-base text-ink outline-none transition focus:border-coral"
            />
          </div>

          <div>
            <label htmlFor="customAlias" className="mb-2 block text-sm font-semibold text-ink/70">
              Custom alias (optional)
            </label>
            <input
              id="customAlias"
              type="text"
              value={customAlias}
              onChange={(event) => setCustomAlias(event.target.value)}
              placeholder="summer-launch"
              className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-coral"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-ink px-5 py-4 text-base font-semibold text-white transition hover:bg-coral disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating..." : "Shorten URL"}
          </button>
        </div>
      </form>

      {error ? (
        <div className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-ink">
          {error}
        </div>
      ) : null}

      {result ? (
        <section className="rounded-[28px] border border-pine/15 bg-pine p-6 text-white shadow-card sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-white/70">Your short link is ready</p>
          <div className="mt-4 grid gap-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Short URL</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="break-all text-lg font-semibold">{result.shortUrl}</span>
                <button
                  type="button"
                  onClick={() => copyText(result.shortUrl)}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-pine transition hover:bg-sand"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Manage URL</p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="break-all text-sm font-medium">{result.manageUrl}</span>
                <button
                  type="button"
                  onClick={() => copyText(result.manageUrl)}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-pine transition hover:bg-sand"
                >
                  Copy
                </button>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Save this private manage link now. It is the only way to edit or disable the short URL later.
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
