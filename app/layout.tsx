import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Briefly | Anonymous URL Shortener",
  description: "Create short links instantly and manage them with a private secret URL."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
