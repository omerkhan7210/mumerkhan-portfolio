import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 28,
            border: '3px solid rgba(200,255,0,0.4)',
            background: 'rgba(200,255,0,0.06)',
          }}
        >
          <span
            style={{
              color: '#C8FF00',
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            UK
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
