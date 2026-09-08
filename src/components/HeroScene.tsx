import type { CSSProperties } from "react"

/**
 * The horizon band at the foot of the hero: sunset over the Sea of Japan, a
 * torii, Tojinbo's basalt headland, and the two of you on the ridge watching
 * the light go. Drawn inline so the page ships without
 * image assets.
 *
 * It is a short strip on purpose — it sits entirely below the headline,
 * forecast and stats, so nothing here ever competes with the text.
 */
export function HeroScene({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 744 240"
      className={className}
      style={style}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b1f43" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5b1f43" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="hero-ridge-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a0f2a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3a0f2a" stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffe8c4" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#ffc79a" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#ff9e7d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The sun, going down behind the ridge */}
      <circle cx="372" cy="132" r="112" fill="url(#hero-sun)" />
      <circle cx="372" cy="132" r="21" fill="#ffeed2" opacity="0.72" />

      {/* Far ridgeline */}
      <path
        d="M0 118 L74 96 L128 110 L196 80 L248 102 L318 72 L388 100 L452 78 L520 106 L586 86 L648 112 L744 94 L744 240 L0 240 Z"
        fill="url(#hero-ridge-far)"
      />

      {/* Near ridgeline */}
      <path
        d="M0 158 L88 134 L156 154 L232 124 L300 150 L372 130 L444 154 L516 134 L600 158 L672 142 L744 162 L744 240 L0 240 Z"
        fill="url(#hero-ridge-near)"
      />

      {/* The two of you, on the ridge */}
      <g opacity="0.7" fill="#2b0b20">
        <circle cx="356" cy="116" r="4.5" />
        <path d="M351.5 121.5 q4.5 -2.5 9 0 l1.8 20 h-12.6 z" />
        <circle cx="374" cy="114" r="5" />
        <path d="M368.5 119.5 q5.5 -2.5 11 0 l1.8 22 h-14.6 z" />
      </g>

      {/* Tojinbo headland, its columnar basalt suggested by the vertical seams */}
      <path
        d="M474 196 L492 178 L508 186 L524 172 L544 184 L562 168 L584 182 L606 174 L628 186 L654 176 L682 188 L710 180 L744 190 L744 240 L474 240 Z"
        fill="#280a1d"
        opacity="0.5"
      />
      <g opacity="0.2" stroke="#ffc0d5" strokeWidth="1.5">
        <path d="M508 192 L508 230" />
        <path d="M544 190 L544 232" />
        <path d="M584 188 L584 230" />
        <path d="M628 192 L628 234" />
        <path d="M682 194 L682 232" />
      </g>

      {/* Torii, for Kehi-jingu */}
      <g opacity="0.45" fill="#2b0b20">
        <rect x="214" y="172" width="6" height="50" />
        <rect x="272" y="172" width="6" height="50" />
        <rect x="202" y="164" width="88" height="7" rx="2" />
        <rect x="210" y="180" width="72" height="5" rx="1.5" />
      </g>

    </svg>
  )
}
