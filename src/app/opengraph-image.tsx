import { ImageResponse } from 'next/og'

export const alt = 'Pavel Piatrovich - Frontend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BG = '#0b0c0e'
const CARD = '#131519'
const INK = '#e6e4dc'
const FAINT = '#76746c'
const RULE = '#24262b'
const ACCENT = '#ffb224'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: FAINT,
            borderBottom: `1px solid ${RULE}`,
            paddingBottom: 20,
          }}
        >
          <div style={{ display: 'flex' }}>
            <span style={{ color: ACCENT }}>pavel</span>
            <span>@portfolio:~$ whoami</span>
          </div>
          <span>Warsaw, Poland</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 136, lineHeight: 0.9, color: INK, letterSpacing: '-0.06em', fontWeight: 700 }}>
            Pavel
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 136, lineHeight: 0.9, color: ACCENT, letterSpacing: '-0.06em', fontWeight: 700 }}>
              Piatrovich
            </span>
            <div style={{ width: 56, height: 104, background: ACCENT, marginLeft: 16, marginBottom: 6 }} />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: CARD,
            border: `1px solid ${RULE}`,
            padding: '18px 24px',
            fontSize: 24,
          }}
        >
          <span style={{ color: INK }}>Frontend Engineer</span>
          <span style={{ color: FAINT }}>React · React Native · TypeScript</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
