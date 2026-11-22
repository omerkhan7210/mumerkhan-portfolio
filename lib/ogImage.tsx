import fs from 'fs';
import path from 'path';

/* Share card in the site's dark-room style: deep green-grey ground, bone type,
   jade accent, square corners, the background-removed portrait standing on the bottom edge. */
export function SocialCard() {
  const photo = fs.readFileSync(path.join(process.cwd(), 'public', 'assets', 'me', 'umer-og.png')).toString('base64');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#161C1A',
        position: 'relative',
        padding: '72px 80px',
      }}
    >
      {/* Portrait, right side, standing on the bottom edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${photo}`}
        width={295}
        height={620}
        alt=""
        style={{ position: 'absolute', right: 96, bottom: 0 }}
      />
      {/* Jade bar under the portrait */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: '#9FC7B8', display: 'flex' }} />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 700, height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#E3E2DA', letterSpacing: '-0.03em', lineHeight: 1.0 }}>
            Muhammad Umer Khan
          </div>
          <div style={{ fontSize: 34, color: '#9FC7B8', marginTop: 26, lineHeight: 1.25 }}>
            Freelance web developer
          </div>
          <div style={{ fontSize: 28, color: '#9AA099', marginTop: 10, lineHeight: 1.35 }}>
            WordPress, Next.js and n8n automation
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              ['80+', 'projects'],
              ['100%', 'Job Success'],
              ['5.0', 'Upwork rating'],
            ].map(([num, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 44, fontWeight: 800, color: '#E3E2DA', letterSpacing: '-0.02em' }}>{num}</span>
                <span style={{ fontSize: 20, color: '#9AA099' }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: '#E3E2DA', marginTop: 32 }}>mumerkhan.com</div>
        </div>
      </div>
    </div>
  );
}
