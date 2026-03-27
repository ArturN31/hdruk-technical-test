import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SkipLink } from "@/components/common/SkipLink";

export const metadata: Metadata = {
  title: "GitHub Portfolio | HDR UK - Technical Test",
  description: "Browse and explore GitHub repositories with advanced filtering and search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SkipLink />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
