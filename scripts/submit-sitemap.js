/* One-off helper: submit https://mumerkhan.com/sitemap.xml to Google
   Search Console via the API. Requires GOOGLE_SERVICE_ACCOUNT_KEY in
   .env.local (base64-encoded service account JSON, or raw JSON).
   Run with: node -r dotenv/config scripts/submit-sitemap.js dotenv_config_path=.env.local */
const { google } = require('googleapis');

const SITE_URL = 'https://mumerkhan.com/';

function getCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env var is not set.');
  const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf-8');
  return JSON.parse(json);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  const webmasters = google.webmasters({ version: 'v3', auth });

  await webmasters.sitemaps.submit({ siteUrl: SITE_URL, feedpath: `${SITE_URL}sitemap.xml` });
  console.log('Sitemap submitted successfully.');

  const list = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
  console.log('Current sitemaps on file:', JSON.stringify(list.data.sitemap ?? [], null, 2));
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
