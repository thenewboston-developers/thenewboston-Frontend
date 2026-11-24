import {useId} from 'react';

// Decorative deposit illustration; the receipt's actual amount lives in the adjacent heading.
const PaidRewardArtwork = () => {
  const id = useId();

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 360 280">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" x2="0.8" y1="0" y2="1">
          <stop stopColor="#fff5bf" />
          <stop offset="0.45" stopColor="#f5ce67" />
          <stop offset="1" stopColor="#cf8c30" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" x2="1" y1="0" y2="0">
          <stop stopColor="#b87628" />
          <stop offset="0.5" stopColor="#edba51" />
          <stop offset="1" stopColor="#bb7c29" />
        </linearGradient>
        <linearGradient id={`${id}-wallet`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#356777" />
          <stop offset="0.5" stopColor="#214a5b" />
          <stop offset="1" stopColor="#163543" />
        </linearGradient>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#fffdf0" />
          <stop offset="0.55" stopColor="#ffe5a0" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffe5a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="#5f4525" stopOpacity="0.28" />
          <stop offset="1" stopColor="#5f4525" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="179" cy="133" fill={`url(#${id}-halo)`} r="132" />
      <circle cx="179" cy="133" fill="none" r="105" stroke="#c2954650" />
      <path d="M49 143C35 53 152 0 244 49s102 157 26 188" fill="none" stroke="#c19a5455" strokeDasharray="3 9" />
      <ellipse cx="184" cy="249" fill={`url(#${id}-shadow)`} rx="146" ry="25" />
      <g fill="#c99539">
        <path d="m59 62 2.5 8 8 2.5-8 2.5-2.5 8-2.5-8-8-2.5 8-2.5z" />
        <path d="m291 94 2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />
        <circle cx="284" cy="53" r="2.5" />
        <circle cx="43" cy="183" r="2" />
      </g>
      <g transform="rotate(10 224 136)">
        <rect fill="#c09a55" height="114" opacity="0.2" rx="11" width="91" x="184" y="76" />
        <rect fill="#fffdf3" height="114" rx="11" stroke="#ddc48e" width="91" x="181" y="71" />
        <rect fill="#f0d491" height="5" rx="2.5" width="41" x="197" y="88" />
        <path d="M198 110h56m-56 12h43m-43 12h50" fill="none" stroke="#d9dfd8" strokeLinecap="round" strokeWidth="4" />
      </g>
      <g className="paid-reward-coin">
        <circle cx="132" cy="86" fill={`url(#${id}-edge)`} r="48" />
        <circle cx="127" cy="81" fill={`url(#${id}-gold)`} r="48" />
        <circle cx="127" cy="81" fill="none" r="40" stroke="#fff1bd" strokeWidth="2" />
        <circle cx="127" cy="81" fill="none" r="35" stroke="#c99540" strokeOpacity="0.6" />
        <path d="M98 56a38 38 0 0 1 49-6" fill="none" stroke="#fff9d8" strokeLinecap="round" strokeWidth="3" />
        <text
          fill="#8b5b20"
          fontFamily="Arial, sans-serif"
          fontSize="21"
          fontWeight="800"
          textAnchor="middle"
          x="127"
          y="89"
        >
          TNB
        </text>
      </g>
      <path
        d="m90 142 138-24c13-2 23 5 23 18v84c0 13-10 23-23 23H94c-14 0-25-10-25-24v-52c0-13 8-23 21-25"
        fill="#143241"
      />
      <path d="m91 140 137-23c8-1 15 3 15 9v16H87z" fill="#173d4b" stroke="#57818a" strokeWidth="1.5" />
      <path d="m101 135 126-18v23H101z" fill="#b3c9bc" />
      <rect
        fill={`url(#${id}-wallet)`}
        height="101"
        rx="18"
        stroke="#5d8b94"
        strokeWidth="1.5"
        width="180"
        x="66"
        y="142"
      />
      <rect
        fill="none"
        height="81"
        rx="12"
        stroke="#a4c0bb"
        strokeDasharray="3 5"
        strokeOpacity="0.38"
        width="160"
        x="76"
        y="152"
      />
      <path d="M218 172h35v38h-35a19 19 0 0 1 0-38" fill="#153746" stroke="#759c9c" strokeWidth="1.5" />
      <circle cx="224" cy="191" fill={`url(#${id}-gold)`} r="5" />
      <g fill={`url(#${id}-edge)`} stroke="#c18b35" strokeWidth="1.2">
        <path d="M258 226v14c0 13 68 13 68 0v-14" />
        <ellipse cx="292" cy="226" fill={`url(#${id}-gold)`} rx="34" ry="9" />
        <path d="M258 213v14c0 13 68 13 68 0v-14" />
        <ellipse cx="292" cy="213" fill={`url(#${id}-gold)`} rx="34" ry="9" />
        <path d="M258 200v14c0 13 68 13 68 0v-14" />
        <ellipse cx="292" cy="200" fill={`url(#${id}-gold)`} rx="34" ry="9" />
        <ellipse cx="292" cy="200" fill="none" rx="25" ry="5" stroke="#fff0b5" />
      </g>
      <g className="paid-reward-check">
        <circle cx="258" cy="140" fill="#1d4437" opacity="0.12" r="29" />
        <circle cx="255" cy="136" fill="#fffdf1" r="29" />
        <circle cx="255" cy="136" fill="#257a5a" r="23" />
        <path
          d="m244 136 7 7 15-16"
          fill="none"
          stroke="#f5ffe4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};

export default PaidRewardArtwork;
