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

export function buildShortUrl(shortCode: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/${shortCode}`;
}

export function buildManageUrl(token: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/manage/${token}`;
}
