/* Ping IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live sitemap.
   Bing's index feeds ChatGPT search and Copilot, so this speeds up AI visibility too.
   Usage: npm run indexnow   (run after a deploy) */
const fs = require('fs');
const path = require('path');

const HOST = 'mumerkhan.com';
const keyFile = fs.readdirSync(path.join(__dirname, '..', 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('IndexNow key file missing from /public');
const key = keyFile.replace('.txt', '');

(async () => {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  urlList.push(`https://${HOST}/llms.txt`, `https://${HOST}/llms-full.txt`);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
  });
  console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status} ${res.statusText}`);
  if (!res.ok && res.status !== 202) process.exitCode = 1;
})();
