import { customAlphabet } from "nanoid";

const codeAlphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const createShortCode = customAlphabet(codeAlphabet, 7);
const createManageToken = customAlphabet(codeAlphabet, 32);

export function generateShortCode() {
  return createShortCode();
}

export function generateManageToken() {
  return createManageToken();
}

function resolveBaseUrl(input?: string) {
  if (input && input.trim().length > 0) {
    return input.trim().replace(/\/$/, "");
  }

  if (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.trim().length > 0) {
    return process.env.NEXT_PUBLIC_APP_URL.trim().replace(/\/$/, "");
  }

  if (process.env.NETLIFY_URL && process.env.NETLIFY_URL.trim().length > 0) {
    const netlifyUrl = process.env.NETLIFY_URL.trim();
    const withProtocol = netlifyUrl.startsWith("http://") || netlifyUrl.startsWith("https://")
      ? netlifyUrl
      : `https://${netlifyUrl}`;
    return withProtocol.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

export function normalizeUrl(input: string) {
  const value = input.trim();
  const parsed = new URL(value);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP and HTTPS links are allowed.");
  }

  return parsed.toString();
}

export function normalizeAlias(input: string) {
  const value = input.trim();

  if (!value) {
    return null;
  }

  if (!/^[a-zA-Z0-9_-]{4,32}$/.test(value)) {
    throw new Error("Custom alias must be 4-32 characters and use only letters, numbers, underscores, or dashes.");
  }

  return value;
}

export function normalizePassword(input: string) {
  const value = input.trim();

  if (!value) {
    return null;
  }

  if (value.length < 6 || value.length > 128) {
    throw new Error("Password must be 6-128 characters.");
  }

  return value;
}

export function normalizeExpiresAt(input: string | null | undefined) {
  if (input === undefined) {
    return undefined;
  }

  if (input === null || input.trim() === "") {
    return null;
  }

  const parsed = new Date(input);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Expiration date is invalid.");
  }

  if (parsed <= new Date()) {
    throw new Error("Expiration must be in the future.");
  }

  return parsed;
}

export function buildShortUrl(shortCode: string, baseUrl?: string) {
  const base = resolveBaseUrl(baseUrl);
  return `${base}/${shortCode}`;
}

export function buildManageUrl(token: string, baseUrl?: string) {
  const base = resolveBaseUrl(baseUrl);
  return `${base}/manage/${token}`;
}
