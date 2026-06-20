import fs from 'fs';
import path from 'path';

export function SocialCard() {
  const photoPath = path.join(process.cwd(), 'public', 'assets', 'my_og_image.jpg');
  const photoBase64 = fs.readFileSync(photoPath).toString('base64');
  const photoSrc = `data:image/jpeg;base64,${photoBase64}`;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0A0A0A',
        padding: '0 80px',
        position: 'relative',
      }}
    >
      {/* Lime glow accent, top-right */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -150,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.16) 0%, rgba(200,255,0,0) 65%)',
        }}
      />

      {/* Left: text */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 640, zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 18px',
            borderRadius: 100,
            border: '1px solid rgba(200,255,0,0.3)',
            background: 'rgba(200,255,0,0.06)',
            color: '#C8FF00',
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 28,
            alignSelf: 'flex-start',
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Muhammad Umer Khan
        </div>
        <div
          style={{
            fontSize: 27,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.4,
          }}
        >
          WordPress · MERN Stack · n8n Automation
        </div>
        <div style={{ display: 'flex', gap: 36, marginTop: 40 }}>
          {[
            ['80+', 'Projects'],
            ['100%', 'Job Success'],
            ['6+', 'Years'],
          ].map(([num, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#C8FF00', letterSpacing: '-0.02em' }}>{num}</span>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: photo */}
      <div
        style={{
          width: 360,
          height: 440,
          borderRadius: 28,
          overflow: 'hidden',
          border: '2px solid rgba(200,255,0,0.3)',
          display: 'flex',
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} width={360} height={440} style={{ objectFit: 'cover' }} alt="" />
      </div>
    </div>
  );
}
