import type { CSSProperties } from "react"
import type { HeroSceneVariant } from "@/data/types"

/**
 * The horizon band at the foot of the hero: sunset over the Sea of Japan, a
 * torii, Eiheiji's cedars, and the two of you on the ridge watching the light
 * go. Drawn inline so the page ships without image assets.
 *
 * It is a short strip on purpose — it sits entirely below the headline,
 * forecast and stats, so nothing here ever competes with the text.
 *
 * The torii and cedars belong to Fukui; the "plain" variant keeps only the
 * sunset, the ridges and the two of you, for trips without a drawing yet.
 */
export function HeroScene({
  variant,
  className,
  style,
}: {
  variant: HeroSceneVariant
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

      {variant === "fukui" ? <FukuiLandmarks /> : null}
    </svg>
  )
}

function FukuiLandmarks() {
  return (
    <>
      {/* Eiheiji's cedars, a stand of tall sugi along the foot of the ridge */}
      <g fill="#280a1d" opacity="0.5">
        <path d="M462 240 C478 229 492 226 510 225 Q626 216 744 222 L744 240 Z" />
        <path d="M496 190 L500.5 203.6 L498.8 203.6 L503.5 217.2 L501.5 217.2 L506 230 L486 230 L490.5 217.2 L488.5 217.2 L493.2 203.6 L491.5 203.6 Z" />
        <path d="M522 172 L527.9 191.7 L525.6 191.7 L531.8 211.4 L529.1 211.4 L535 230 L509 230 L514.9 211.4 L512.2 211.4 L518.4 191.7 L516.1 191.7 Z" />
        <path d="M548 184 L553 199.6 L551.1 199.6 L556.2 215.3 L554 215.3 L559 230 L537 230 L542 215.3 L539.8 215.3 L544.9 199.6 L543 199.6 Z" />
        <path d="M578 164 L584.3 186.4 L581.9 186.4 L588.5 208.9 L585.7 208.9 L592 230 L564 230 L570.3 208.9 L567.5 208.9 L574.1 186.4 L571.7 186.4 Z" />
        <path d="M608 178 L613.4 195.7 L611.4 195.7 L617 213.4 L614.6 213.4 L620 230 L596 230 L601.4 213.4 L599 213.4 L604.6 195.7 L602.6 195.7 Z" />
        <path d="M640 168 L646.3 189.1 L643.9 189.1 L650.5 210.2 L647.7 210.2 L654 230 L626 230 L632.3 210.2 L629.5 210.2 L636.1 189.1 L633.7 189.1 Z" />
        <path d="M672 186 L677 201 L675.1 201 L680.2 215.9 L678 215.9 L683 230 L661 230 L666 215.9 L663.8 215.9 L668.9 201 L667 201 Z" />
        <path d="M702 174 L707.9 193 L705.6 193 L711.8 212.1 L709.1 212.1 L715 230 L689 230 L694.9 212.1 L692.2 212.1 L698.4 193 L696.1 193 Z" />
        <path d="M732 190 L736.5 203.6 L734.8 203.6 L739.5 217.2 L737.5 217.2 L742 230 L722 230 L726.5 217.2 L724.5 217.2 L729.2 203.6 L727.5 203.6 Z" />
      </g>

      {/* Torii, for Kehi-jingu */}
      <g opacity="0.45" fill="#2b0b20">
        <rect x="214" y="172" width="6" height="50" />
        <rect x="272" y="172" width="6" height="50" />
        <rect x="202" y="164" width="88" height="7" rx="2" />
        <rect x="210" y="180" width="72" height="5" rx="1.5" />
      </g>
    </>
  )
}
