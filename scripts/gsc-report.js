// Read-only Search Console report: node -r dotenv/config scripts/gsc-report.js dotenv_config_path=.env.local
const { google } = require('googleapis');
const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const creds = JSON.parse(raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf-8'));
const auth = new google.auth.GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
const wm = google.webmasters({ version: 'v3', auth });
const site = 'sc-domain:mumerkhan.com';
const fmt = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 90);
async function q(dimensions, rowLimit = 40) {
  const r = await wm.searchanalytics.query({ siteUrl: site, requestBody: { startDate: fmt(start), endDate: fmt(end), dimensions, rowLimit } });
  return r.data.rows || [];
}
(async () => {
  const show = (t, rows) => { console.log(`\n## ${t}`); rows.forEach((r) => console.log(`${r.keys.join(' | ')} | clicks ${r.clicks} | impr ${r.impressions} | ctr ${(r.ctr*100).toFixed(1)}% | pos ${r.position.toFixed(1)}`)); };
  const tot = await wm.searchanalytics.query({ siteUrl: site, requestBody: { startDate: fmt(start), endDate: fmt(end) } });
  console.log('Range', fmt(start), '→', fmt(end), JSON.stringify(tot.data.rows));
  show('Top queries', await q(['query'], 50));
  show('Top pages', await q(['page'], 30));
  show('Countries', await q(['country'], 8));
  show('Devices', await q(['device'], 3));
  const sm = await wm.sitemaps.list({ siteUrl: site });
  console.log('\n## Sitemaps'); (sm.data.sitemap || []).forEach((s) => console.log(s.path, s.lastDownloaded, 'errors', s.errors, 'warnings', s.warnings, JSON.stringify(s.contents)));
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
