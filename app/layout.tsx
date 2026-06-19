import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';
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
    default: 'Muhammad Umer Khan | Full Stack Developer & WordPress Expert',
    template: '%s | Umer Khan',
  },
  description:
    'Full Stack Developer with 6+ years of experience. 80+ projects delivered. Specialising in WordPress, MERN Stack, and n8n Automation. 100% Job Success Score on Upwork. Based in Karachi, Pakistan.',
  keywords: [
    'Full Stack Developer',
    'WordPress Developer',
    'MERN Stack Developer',
    'n8n Automation',
    'React Developer',
    'Figma to WordPress',
    'WooCommerce Developer',
    'Web Developer Karachi',
    'Upwork Full Stack Developer',
    'Next.js Developer',
  ],
  authors: [{ name: 'Muhammad Umer Khan', url: SITE_URL }],
  creator: 'Muhammad Umer Khan',
  publisher: 'Muhammad Umer Khan',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Muhammad Umer Khan',
    title: 'Muhammad Umer Khan | Full Stack Developer & WordPress Expert',
    description:
      '80+ projects · 6+ years · 100% JSS on Upwork. WordPress, MERN Stack, n8n Automation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Umer Khan — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Umer Khan | Full Stack Developer',
    description:
      '80+ projects · 6+ years · 100% JSS on Upwork. WordPress, MERN, n8n.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Muhammad Umer Khan',
      url: SITE_URL,
      email: 'omerfarooqkhan7210@gmail.com',
      jobTitle: 'Full Stack Developer',
      description:
        'Full Stack Developer specialising in WordPress, MERN Stack, and n8n automation with 6+ years of experience.',
      knowsAbout: [
        'WordPress Development',
        'React.js',
        'Node.js',
        'MERN Stack',
        'n8n Automation',
        'WooCommerce',
        'Next.js',
        'Figma',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressCountry: 'PK',
      },
      sameAs: [
        'https://www.upwork.com/freelancers/muhammadumerk5',
        'https://github.com/omerkhan7210',
        'https://www.linkedin.com/in/muhammad-umer-khan-7998a8266',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Muhammad Umer Khan — Full Stack Developer Portfolio',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager — only renders if NEXT_PUBLIC_GTM_ID is set */}
        {GTM_ID && (
          <>
            <Script id="gtm-script" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}

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
