import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "Smart URL Shortener with QR Code & Password Protection",
  description: "Smart URL shortener with QR code, password protection and expiry links.",
  verification: {
    google: "2rPmmRIo2EOJg71GgMWSRj-1qwM0duI4FmX86uxpGQc"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8117593741940163"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
