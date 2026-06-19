import { google } from 'googleapis';

/* The Search Console property is verified as a domain property, so
   the API's `siteUrl` parameter must be the `sc-domain:` identifier,
   not a regular https:// URL — those are two different "site" types
   in Search Console and using the wrong one returns a permission
   error even though the service account has access. */
const SITE_PROPERTY = 'sc-domain:mumerkhan.com';
const SITEMAP_FEED_URL = 'https://mumerkhan.com/sitemap.xml';

/* Service account credentials are provided as a single base64-encoded
   JSON string in GOOGLE_SERVICE_ACCOUNT_KEY (never as a raw file in
   the repo). Decode + parse once, then reuse the auth client. */
function getCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set.');
  }
  const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf-8');
  return JSON.parse(json);
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
}

export async function submitSitemap(sitemapUrl = SITEMAP_FEED_URL) {
  const auth = getAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });
  await webmasters.sitemaps.submit({ siteUrl: SITE_PROPERTY, feedpath: sitemapUrl });
  return { ok: true, sitemapUrl };
}

export async function listSitemaps() {
  const auth = getAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });
  const res = await webmasters.sitemaps.list({ siteUrl: SITE_PROPERTY });
  return res.data.sitemap ?? [];
}

export async function getSearchPerformance(days = 28) {
  const auth = getAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_PROPERTY,
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['query'],
      rowLimit: 25,
    },
  });
  return res.data.rows ?? [];
}
