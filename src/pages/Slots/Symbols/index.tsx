import {SlotSymbolId, SYMBOL_DETAILS} from '../utils';

const OUTLINE = '#24103f';
const SEVEN = 'M17 12 H 85 V 29 C 70 43, 60 62, 57 88 H 33 C 36 65, 46 46, 60 31 H 17 Z';
const BELL =
  'M50 18 C 31 18, 26 33, 26 49 C 26 61, 22 67, 14 73 C 11 75, 12 79, 16 79 L 84 79 C 88 79, 89 75, 86 73 C 78 67, 74 61, 74 49 C 74 33, 69 18, 50 18 Z';
const LEMON =
  'M12 56 C 10 50, 13 45, 18 43 C 22 28, 38 19, 55 19 C 71 19, 83 29, 87 42 C 92 44, 94 50, 90 55 C 88 71, 72 83, 52 83 C 34 83, 20 74, 16 62 C 13 61, 12 59, 12 56 Z';
const DIAMOND = 'M29 17 H 71 L 91 39 L 50 88 L 9 39 Z';

export const symbolHref = (symbol: SlotSymbolId) => `#tnbs-${symbol}`;

/**
 * Artwork for the six reel symbols, defined once per page and drawn everywhere with <use>. The SVG is hidden with a
 * zero size rather than display: none, which would stop browsers from resolving its gradients.
 */
export const SymbolDefs = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{height: 0, left: 0, overflow: 'hidden', position: 'absolute', top: 0, width: 0}}
  >
    <defs>
      <filter height="140%" id="tnbs-shadow" width="140%" x="-20%" y="-20%">
        <feDropShadow dx="0" dy="3" floodColor="#12062a" floodOpacity="0.45" stdDeviation="2.4" />
      </filter>
      <filter height="190%" id="tnbs-motion" width="120%" x="-10%" y="-45%">
        <feGaussianBlur stdDeviation="0 7" />
      </filter>
      <radialGradient cx="35%" cy="30%" id="tnbs-cherry-fill" r="75%">
        <stop offset="0" stopColor="#ffc2cc" />
        <stop offset="0.25" stopColor="#ff4d6d" />
        <stop offset="0.62" stopColor="#d90429" />
        <stop offset="1" stopColor="#6a0014" />
      </radialGradient>
      <linearGradient id="tnbs-leaf" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#d9f99d" />
        <stop offset="0.45" stopColor="#84cc16" />
        <stop offset="1" stopColor="#3f6212" />
      </linearGradient>
      <linearGradient id="tnbs-stem" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#a3e635" />
        <stop offset="1" stopColor="#4d7c0f" />
      </linearGradient>
      <radialGradient cx="38%" cy="32%" id="tnbs-lemon-fill" r="80%">
        <stop offset="0" stopColor="#fffde7" />
        <stop offset="0.25" stopColor="#fff176" />
        <stop offset="0.55" stopColor="#ffd60a" />
        <stop offset="0.85" stopColor="#f4a100" />
        <stop offset="1" stopColor="#c27c00" />
      </radialGradient>
      <linearGradient id="tnbs-gold-fill" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#9a4a04" />
        <stop offset="0.18" stopColor="#f59e0b" />
        <stop offset="0.42" stopColor="#ffe58f" />
        <stop offset="0.62" stopColor="#fbbf24" />
        <stop offset="0.9" stopColor="#b45309" />
        <stop offset="1" stopColor="#7c2d12" />
      </linearGradient>
      <linearGradient id="tnbs-gold-rim" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#fff3c4" />
        <stop offset="0.5" stopColor="#f6c453" />
        <stop offset="1" stopColor="#b7791f" />
      </linearGradient>
      <linearGradient id="tnbs-bar-plate" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#4c3a8f" />
        <stop offset="0.5" stopColor="#241a52" />
        <stop offset="1" stopColor="#120c2e" />
      </linearGradient>
      <linearGradient id="tnbs-bar-text" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.35" stopColor="#fff3c4" />
        <stop offset="0.7" stopColor="#f6c453" />
        <stop offset="1" stopColor="#d08a1a" />
      </linearGradient>
      <linearGradient id="tnbs-seven-fill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#ff8a80" />
        <stop offset="0.3" stopColor="#ff3b3b" />
        <stop offset="0.65" stopColor="#e10600" />
        <stop offset="1" stopColor="#8b0000" />
      </linearGradient>
      <linearGradient id="tnbs-seven-rim" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#fff7cc" />
        <stop offset="0.5" stopColor="#ffcf4a" />
        <stop offset="1" stopColor="#c68600" />
      </linearGradient>
    </defs>
    <symbol id="tnbs-cherry" viewBox="0 0 100 100">
      <g filter="url(#tnbs-shadow)">
        <path d="M33 60 C 38 42, 50 28, 63 15" fill="none" stroke={OUTLINE} strokeLinecap="round" strokeWidth="8" />
        <path d="M67 63 C 70 46, 69 30, 63 15" fill="none" stroke={OUTLINE} strokeLinecap="round" strokeWidth="8" />
        <path
          d="M33 60 C 38 42, 50 28, 63 15"
          fill="none"
          stroke="url(#tnbs-stem)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M67 63 C 70 46, 69 30, 63 15"
          fill="none"
          stroke="url(#tnbs-stem)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M63 16 C 69 5, 86 3, 93 11 C 86 21, 71 24, 63 16 Z"
          fill="url(#tnbs-leaf)"
          stroke={OUTLINE}
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M66 15 C 74 11, 83 10, 90 11"
          fill="none"
          opacity="0.85"
          stroke="#ecfccb"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <circle cx="32" cy="69" fill="url(#tnbs-cherry-fill)" r="19" stroke={OUTLINE} strokeWidth="3.5" />
        <circle cx="68" cy="72" fill="url(#tnbs-cherry-fill)" r="19" stroke={OUTLINE} strokeWidth="3.5" />
        <ellipse cx="25" cy="61" fill="#ffffff" opacity="0.8" rx="6.5" ry="4" transform="rotate(-35 25 61)" />
        <ellipse cx="61" cy="64" fill="#ffffff" opacity="0.8" rx="6.5" ry="4" transform="rotate(-35 61 64)" />
      </g>
    </symbol>
    <symbol id="tnbs-lemon" viewBox="0 0 100 100">
      <g filter="url(#tnbs-shadow)">
        <path d={LEMON} fill="url(#tnbs-lemon-fill)" stroke={OUTLINE} strokeLinejoin="round" strokeWidth="3.5" />
        <path
          d="M27 38 C 34 30, 45 26, 56 27"
          fill="none"
          opacity="0.7"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <g fill="#b8860b" opacity="0.28">
          <circle cx="38" cy="62" r="1.5" />
          <circle cx="50" cy="68" r="1.5" />
          <circle cx="62" cy="62" r="1.5" />
          <circle cx="70" cy="52" r="1.5" />
          <circle cx="46" cy="55" r="1.5" />
          <circle cx="58" cy="74" r="1.5" />
          <circle cx="30" cy="54" r="1.5" />
        </g>
        <path
          d="M57 21 C 58 11, 67 4, 79 5 C 78 15, 69 22, 57 21 Z"
          fill="url(#tnbs-leaf)"
          stroke={OUTLINE}
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </g>
    </symbol>
    <symbol id="tnbs-bell" viewBox="0 0 100 100">
      <g filter="url(#tnbs-shadow)">
        <circle cx="50" cy="84" fill="url(#tnbs-gold-fill)" r="8.5" stroke={OUTLINE} strokeWidth="3" />
        <path
          d="M50 10 C 54 10, 56 13, 56 16 L 56 19 L 44 19 L 44 16 C 44 13, 46 10, 50 10 Z"
          fill="url(#tnbs-gold-fill)"
          stroke={OUTLINE}
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path d={BELL} fill="url(#tnbs-gold-fill)" stroke={OUTLINE} strokeLinejoin="round" strokeWidth="3.5" />
        <path d="M17 72 Q 50 77 83 72" fill="none" opacity="0.55" stroke="#92400e" strokeWidth="3" />
        <path
          d="M37 28 C 33 35, 32 44, 32 56"
          fill="none"
          opacity="0.75"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <circle cx="35" cy="64" fill="#ffffff" opacity="0.6" r="2.2" />
      </g>
    </symbol>
    <symbol id="tnbs-bar" viewBox="0 0 100 100">
      <g filter="url(#tnbs-shadow)">
        <rect
          fill="url(#tnbs-bar-plate)"
          height="42"
          rx="10"
          stroke={OUTLINE}
          strokeWidth="3.5"
          width="86"
          x="7"
          y="29"
        />
        <rect
          fill="none"
          height="31"
          rx="6"
          stroke="url(#tnbs-gold-rim)"
          strokeWidth="2.6"
          width="75"
          x="12.5"
          y="34.5"
        />
        <text
          fill="url(#tnbs-bar-text)"
          fontFamily="OpenSans, 'Arial Black', Arial, sans-serif"
          fontSize="25"
          fontWeight="800"
          lengthAdjust="spacingAndGlyphs"
          paintOrder="stroke"
          stroke={OUTLINE}
          strokeWidth="1.6"
          textAnchor="middle"
          textLength="58"
          x="50"
          y="59"
        >
          BAR
        </text>
        <path d="M17 37.5 H 83" opacity="0.2" stroke="#ffffff" strokeLinecap="round" strokeWidth="2" />
      </g>
    </symbol>
    <symbol id="tnbs-diamond" viewBox="0 0 100 100">
      <g filter="url(#tnbs-shadow)">
        <path d={DIAMOND} fill="#38bdf8" />
        <path d="M29 17 L 40 39 H 9 Z" fill="#bae6fd" />
        <path d="M29 17 H 71 L 60 39 H 40 Z" fill="#ecfeff" />
        <path d="M71 17 L 91 39 H 60 Z" fill="#7dd3fc" />
        <path d="M9 39 H 40 L 50 88 Z" fill="#0ea5e9" />
        <path d="M40 39 H 60 L 50 88 Z" fill="#38bdf8" />
        <path d="M60 39 H 91 L 50 88 Z" fill="#0369a1" />
        <path
          d="M9 39 H 91 M29 17 L 40 39 L 50 88 L 60 39 L 71 17"
          fill="none"
          opacity="0.4"
          stroke={OUTLINE}
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path d={DIAMOND} fill="none" stroke={OUTLINE} strokeLinejoin="round" strokeWidth="3.5" />
        <path d="M34 21.5 H 52" opacity="0.9" stroke="#ffffff" strokeLinecap="round" strokeWidth="3" />
        <path d="M82 4 L 84.5 11.5 L 92 14 L 84.5 16.5 L 82 24 L 79.5 16.5 L 72 14 L 79.5 11.5 Z" fill="#ffffff" />
      </g>
    </symbol>
    <symbol id="tnbs-seven" viewBox="0 0 100 100">
      <g filter="url(#tnbs-shadow)">
        <path d={SEVEN} fill="none" stroke={OUTLINE} strokeLinejoin="round" strokeWidth="9" />
        <path
          d={SEVEN}
          fill="url(#tnbs-seven-fill)"
          stroke="url(#tnbs-seven-rim)"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path d="M22 17 H 80" opacity="0.55" stroke="#ffffff" strokeLinecap="round" strokeWidth="3" />
        <path
          d="M58 37 C 50 47, 44 59, 41 72"
          fill="none"
          opacity="0.3"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </g>
    </symbol>
  </svg>
);

interface SlotSymbolProps {
  className?: string;
  // Announce the symbol by name; otherwise the artwork is decorative.
  labelled?: boolean;
  symbol: SlotSymbolId;
}

export const SlotSymbol = ({className, labelled = false, symbol}: SlotSymbolProps) => (
  <svg
    aria-hidden={labelled ? undefined : true}
    aria-label={labelled ? SYMBOL_DETAILS[symbol].name : undefined}
    className={className}
    focusable="false"
    role={labelled ? 'img' : undefined}
    viewBox="0 0 100 100"
  >
    <use href={symbolHref(symbol)} />
  </svg>
);
