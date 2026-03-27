import type { Metadata } from 'next';
import './globals.css';
import { SkipLink } from '@/components/ui/SkipLink';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'HDR UK - Applications Dashboard',
  description: 'Central portal for managing and monitoring all applications in the HDR UK monorepo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'HDR UK - Applications Dashboard',
    description: 'Central portal for managing and monitoring all applications in the HDR UK monorepo',
    type: 'website',
    locale: 'en_GB',
    siteName: 'HDR UK Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HDR UK - Applications Dashboard',
    description: 'Central portal for managing and monitoring all applications in the HDR UK monorepo',
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
