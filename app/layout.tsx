import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import './globals.css';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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

const SITE_URL = 'https://mumerkhan.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Muhammad Umer Khan | Websites for Trade & Local Service Businesses',
    template: '%s | Umer Khan',
  },
  description:
    'Websites and lead systems for roofing, plumbing, HVAC, cleaning, and local service businesses. WordPress, conversion UX, and light automation. 100% Job Success on Upwork. 80+ projects.',
  keywords: [
    'Trade business website',
    'Roofing website designer',
    'Plumbing website WordPress',
    'HVAC website developer',
    'Local service website',
    'WordPress Developer',
    'Quote path website',
    'WooCommerce booking developer',
    'Local SEO landing pages',
    'Upwork WordPress Developer',
  ],
  authors: [{ name: 'Muhammad Umer Khan', url: SITE_URL }],
  creator: 'Muhammad Umer Khan',
  publisher: 'Muhammad Umer Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Muhammad Umer Khan',
    title: 'Muhammad Umer Khan | Websites for Trade & Local Service Businesses',
    description:
      'Websites and lead systems for roofing, plumbing, HVAC, cleaning, and local service businesses. 100% Job Success on Upwork.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Muhammad Umer Khan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Umer Khan | Websites for Trade & Local Service Businesses',
    description:
      'Websites and lead systems for trade and local service businesses. WordPress, conversion UX, automation.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}</Script>
        ) : null}
      </head>
      <body className="bg-ink text-fg antialiased">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
