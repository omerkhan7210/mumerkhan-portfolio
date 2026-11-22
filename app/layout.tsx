import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const SITE_URL = 'https://mumerkhan.com';

const DEFAULT_TITLE = 'Muhammad Umer Khan | Freelance Web Developer (WordPress, Next.js & n8n)';
const DEFAULT_DESC =
  'Freelance web developer for growing businesses. Custom websites in WordPress and Next.js, Figma to WordPress, WooCommerce and n8n automation. 80+ projects, 100% Job Success on Upwork.';

export const viewport: Viewport = {
  themeColor: '#161C1A',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s | Umer Khan' },
  description: DEFAULT_DESC,
  keywords: [
    'freelance web developer',
    'hire WordPress developer',
    'freelance WordPress developer',
    'Next.js developer for hire',
    'Figma to WordPress',
    'Elementor expert',
    'WooCommerce developer',
    'n8n automation expert',
    'website redesign services',
    'contractor website design',
  ],
  authors: [{ name: 'Muhammad Umer Khan', url: SITE_URL }],
  creator: 'Muhammad Umer Khan',
  publisher: 'Muhammad Umer Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Muhammad Umer Khan',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  alternates: { canonical: SITE_URL },
};

/* Site-wide entity graph: one Person, the service business he runs, and the website.
   Gives Google a single, consistent entity for brand queries ("muhammad umer khan"). */
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Muhammad Umer Khan',
      alternateName: ['Umer Khan', 'M Umer Khan'],
      url: SITE_URL,
      image: `${SITE_URL}/assets/me/umer-front.webp`,
      jobTitle: 'Freelance Web Developer',
      description: DEFAULT_DESC,
      knowsAbout: ['WordPress', 'Elementor', 'WooCommerce', 'Next.js', 'React', 'Figma to WordPress', 'n8n workflow automation', 'Technical SEO', 'Local SEO'],
      address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
      sameAs: [
        'https://www.upwork.com/freelancers/muhammadumerk5',
        'https://www.linkedin.com/in/muhammad-umer-khan-7998a8266',
        'https://github.com/omerkhan7210',
        'https://clutch.co/profile/muhammad-umer-khan',
        'https://dev.to/omer_khan_846c4feb067c59e',
        'https://medium.com/@omerfarooqkhan7210',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: 'Umer Khan Web Development',
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      founder: { '@id': `${SITE_URL}/#person` },
      areaServed: ['United States', 'United Kingdom', 'European Union', 'Australia', 'Worldwide'],
      priceRange: '$$',
      address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
      serviceType: ['Web development', 'WordPress development', 'Next.js development', 'Website redesign', 'n8n automation', 'Technical SEO'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Muhammad Umer Khan',
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ ['--font-display' as string]: "'TikTok Sans', system-ui, sans-serif", ['--font-body' as string]: "'TikTok Sans', system-ui, sans-serif" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=TikTok+Sans:wdth,wght@75..150,300..900&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
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
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
