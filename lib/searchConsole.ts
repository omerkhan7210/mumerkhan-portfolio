import { google } from 'googleapis';

const SITE_URL = 'https://mumerkhan.com/';

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

export async function submitSitemap(sitemapUrl = `${SITE_URL}sitemap.xml`) {
  const auth = getAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });
  await webmasters.sitemaps.submit({ siteUrl: SITE_URL, feedpath: sitemapUrl });
  return { ok: true, sitemapUrl };
}

export async function listSitemaps() {
  const auth = getAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });
  const res = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
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
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['query'],
      rowLimit: 25,
    },
  });
  return res.data.rows ?? [];
}
