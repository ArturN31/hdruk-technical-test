import type { Metadata } from 'next';
import './globals.css';
import { SkipLink } from '@/components/ui/SkipLink';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Portal | HDR UK - Technical Test',
  description: 'Central portal for managing and accessing all applications in the HDR UK monorepo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Portal | HDR UK - Technical Test',
    description: 'Central portal for managing and accessing all applications in the HDR UK monorepo',
    type: 'website',
    locale: 'en_GB',
    siteName: 'HDR UK - Technical Test',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal | HDR UK - Technical Test',
    description: 'Central portal for managing and accessing all applications in the HDR UK monorepo',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Providers>
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
