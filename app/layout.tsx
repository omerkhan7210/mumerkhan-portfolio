import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Muhammad Umer Khan | Full Stack Developer',
  description:
    'Full Stack Developer specializing in WordPress, MERN Stack & n8n Automation. 100% Job Success on Upwork. Based in Karachi, Pakistan.',
  keywords:
    'Full Stack Developer, WordPress Developer, MERN Stack, n8n Automation, Figma to WordPress, Elementor, React Developer',
  authors: [{ name: 'Muhammad Umer Khan' }],
  creator: 'Muhammad Umer Khan',
  metadataBase: new URL('https://mumerkhan.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mumerkhan.com',
    title: 'Muhammad Umer Khan | Full Stack Developer',
    description:
      'Full Stack Developer. WordPress. MERN. Automation. 100% Job Success on Upwork.',
    siteName: 'Muhammad Umer Khan',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Page preloader — shown once per session */}
        <Preloader />

        {/* Animated film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Lenis smooth scroll wrapper */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
