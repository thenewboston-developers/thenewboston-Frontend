import {useId} from 'react';

const ResultArtwork = ({outcome}: {outcome: 'win' | 'loss' | 'draw' | 'complete'}) => {
  const id = useId();
  const victory = outcome === 'win';

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 360 240">
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor={victory ? '#ffcd67' : '#72bfff'} stopOpacity="0.3" />
          <stop offset="0.5" stopColor={victory ? '#d68b21' : '#4175c5'} stopOpacity="0.12" />
          <stop offset="1" stopColor="#12213c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" x2="0.8" y1="0" y2="1">
          <stop stopColor={victory ? '#fbe4a3' : '#c8ebff'} />
          <stop offset="0.22" stopColor={victory ? '#aa6b23' : '#527aab'} />
          <stop offset="0.58" stopColor={victory ? '#5b3517' : '#1f3356'} />
          <stop offset="0.8" stopColor={victory ? '#b17a30' : '#7a9cb9'} />
          <stop offset="1" stopColor={victory ? '#f4cf7c' : '#bfdbec'} />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0.15" x2="0.85" y1="0" y2="1">
          <stop stopColor={victory ? '#fff6d9' : '#edfbff'} />
          <stop offset="0.19" stopColor={victory ? '#f6d58a' : '#afdbf0'} />
          <stop offset="0.43" stopColor={victory ? '#ae762b' : '#537caa'} />
          <stop offset="0.52" stopColor={victory ? '#ffdf92' : '#abd6ee'} />
          <stop offset="0.75" stopColor={victory ? '#dfab4d' : '#729abc'} />
          <stop offset="1" stopColor={victory ? '#fff0bc' : '#e1f6ff'} />
        </linearGradient>
        <radialGradient cx="0.35" cy="0.15" id={`${id}-face`} r="0.95">
          <stop stopColor={victory ? '#5d4724' : '#23486b'} />
          <stop offset="0.5" stopColor={victory ? '#2e2b22' : '#132b48'} />
          <stop offset="1" stopColor={victory ? '#171d2d' : '#0d182e'} />
        </radialGradient>
        <linearGradient id={`${id}-symbol`} x1="0" x2="0.8" y1="0" y2="1">
          <stop stopColor={victory ? '#fff9e3' : '#effcff'} />
          <stop offset="0.4" stopColor={victory ? '#ffdf91' : '#c5f4ff'} />
          <stop offset="1" stopColor={victory ? '#e4a441' : '#7dc5e7'} />
        </linearGradient>
        <linearGradient id={`${id}-left-tile`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor={victory ? '#f4d182' : '#80e8ff'} />
          <stop offset="0.45" stopColor={victory ? '#c09242' : '#369ac5'} />
          <stop offset="1" stopColor={victory ? '#5b3e23' : '#174969'} />
        </linearGradient>
        <linearGradient id={`${id}-right-tile`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor={victory ? '#ffe8ae' : '#ffd1c7'} />
          <stop offset="0.4" stopColor={victory ? '#c69b56' : '#de827c'} />
          <stop offset="1" stopColor={victory ? '#6b4324' : '#7d3d56'} />
        </linearGradient>
        <linearGradient id={`${id}-orbit`} x1="0" x2="1">
          <stop stopColor={victory ? '#f6d58a' : '#67d6ff'} stopOpacity="0.65" />
          <stop offset="0.5" stopColor="#b4d9ff" stopOpacity="0.1" />
          <stop offset="1" stopColor={victory ? '#f6d58a' : '#ffb1a5'} stopOpacity="0.65" />
        </linearGradient>
      </defs>

      <ellipse cx="180" cy="125" fill={`url(#${id}-halo)`} rx="177" ry="115" />
      <ellipse cx="180" cy="211" fill="#050c1c" opacity="0.45" rx="76" ry="9" />
      <g className="result-orbit" fill="none" stroke={`url(#${id}-orbit)`}>
        <ellipse cx="180" cy="126" rx="154" ry="65" strokeDasharray="2 7" transform="rotate(-18 180 126)" />
        <path d="M30 147C18 115 78 72 155 55M205 190C282 180 342 140 331 106" opacity="0.65" />
        <path d="m25 109 4-8 9 2M324 164l-8 6-7-6" strokeWidth="1.5" />
      </g>

      <g transform="rotate(-23 67 121)">
        <rect fill="#102339" height="61" rx="13" stroke="#3d7690" width="61" x="36" y="96" />
        <rect
          fill={`url(#${id}-left-tile)`}
          height="61"
          rx="13"
          stroke={victory ? '#e5bc70' : '#9cecff'}
          width="61"
          x="36"
          y="89"
        />
        <rect fill="#102b43" fillOpacity="0.45" height="43" rx="8" stroke="#ffffff40" width="43" x="45" y="98" />
        <path
          d="M58 112h17M66.5 103.5v17"
          fill="none"
          stroke={victory ? '#ffe6a5' : '#c6f6ff'}
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle cx="58" cy="130" fill={victory ? '#ffe6a5' : '#c6f6ff'} r="2.5" />
        <circle cx="75" cy="130" fill={victory ? '#ffe6a5' : '#c6f6ff'} r="2.5" />
        <path d="M47 94h33" opacity="0.65" stroke="#ffffff" strokeLinecap="round" />
      </g>
      <g transform="rotate(23 293 121)">
        <rect fill="#332339" height="61" rx="13" stroke="#875968" width="61" x="263" y="96" />
        <rect
          fill={`url(#${id}-right-tile)`}
          height="61"
          rx="13"
          stroke={victory ? '#f5d18b' : '#ffc8bc'}
          width="61"
          x="263"
          y="89"
        />
        <rect fill="#40283e" fillOpacity="0.45" height="43" rx="8" stroke="#ffffff40" width="43" x="272" y="98" />
        <g fill={victory ? '#ffe7ac' : '#ffe0d5'}>
          <circle cx="283" cy="109" r="3.5" />
          <circle cx="304" cy="109" r="3.5" />
          <circle cx="293.5" cy="119.5" r="3.5" />
          <circle cx="283" cy="130" r="3.5" />
          <circle cx="304" cy="130" r="3.5" />
        </g>
        <path d="M274 94h33" opacity="0.65" stroke="#ffffff" strokeLinecap="round" />
      </g>

      <path
        d="m180 40 55 23 23 55-23 55-55 23-55-23-23-55 23-55Z"
        fill="#071126"
        opacity="0.6"
        transform="translate(0 10)"
      />
      <path
        d="m180 34 57 24 24 57-24 57-57 24-57-24-24-57 24-57Z"
        fill={`url(#${id}-edge)`}
        stroke={victory ? '#8b642e' : '#496782'}
        transform="translate(0 7)"
      />
      <path
        d="m180 34 57 24 24 57-24 57-57 24-57-24-24-57 24-57Z"
        fill={`url(#${id}-metal)`}
        stroke={victory ? '#fff0bc' : '#c6e5f4'}
        strokeWidth="1.2"
      />
      <path d="m180 42 51 21 21 52-21 51-51 22-51-22-21-51 21-52Z" fill={`url(#${id}-edge)`} />
      <circle
        cx="180"
        cy="115"
        fill={`url(#${id}-face)`}
        r="66"
        stroke={victory ? '#e3b96b' : '#a0c1d8'}
        strokeWidth="1.5"
      />
      <circle cx="180" cy="115" fill="none" r="59" stroke={victory ? '#ddbc6d' : '#83c5e0'} strokeOpacity="0.2" />
      <path
        d="M125 91a61 61 0 0 1 83-32"
        fill="none"
        opacity="0.5"
        stroke={victory ? '#fff0c3' : '#b5eaff'}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <g stroke={victory ? '#ffe9af' : '#c7efff'} strokeLinecap="round" strokeOpacity="0.5">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
          <path d="M180 46v4" key={rotation} transform={`rotate(${rotation} 180 115)`} />
        ))}
      </g>
      <path
        d="m123 58 57-24 57 24"
        fill="none"
        opacity="0.8"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="1.3"
      />

      {victory && (
        <g>
          <path
            d="M154 82h-16v12c0 16 9 25 25 25m43-37h16v12c0 16-9 25-25 25"
            fill="none"
            stroke={`url(#${id}-symbol)`}
            strokeWidth="7"
          />
          <path
            d="M151 74h58l-5 31c-3 18-11 28-24 28s-21-10-24-28Z"
            fill={`url(#${id}-symbol)`}
            stroke="#fff2c9"
            strokeWidth="1.5"
          />
          <path d="M174 131h12v17l13 6h-38l13-6Z" fill={`url(#${id}-metal)`} />
          <rect fill={`url(#${id}-symbol)`} height="8" rx="3" width="44" x="158" y="153" />
          <path
            d="m180 87 4.2 8.6 9.5 1.4-6.9 6.7 1.7 9.4-8.5-4.5-8.5 4.5 1.7-9.4-6.9-6.7 9.5-1.4Z"
            fill="#fff8df"
            stroke="#c18c38"
          />
          <path d="M160 80h39" opacity="0.8" stroke="#ffffff" strokeLinecap="round" strokeWidth="2" />
        </g>
      )}
      {outcome === 'draw' && (
        <g>
          <g fill="#020a19" opacity="0.5" transform="translate(0 4)">
            <rect height="14" rx="4" width="64" x="148" y="96" />
            <rect height="14" rx="4" width="64" x="148" y="123" />
          </g>
          <g fill={`url(#${id}-symbol)`} stroke="#e6faff" strokeWidth="0.7">
            <rect height="14" rx="4" width="64" x="148" y="96" />
            <rect height="14" rx="4" width="64" x="148" y="123" />
          </g>
          <path d="M152 99h56m-56 27h56" opacity="0.75" stroke="#ffffff" strokeLinecap="round" />
        </g>
      )}
      {outcome === 'loss' && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M205 96a32 32 0 1 0 5 32m-5-53v23h-23"
            opacity="0.5"
            stroke="#020a19"
            strokeWidth="10"
            transform="translate(0 4)"
          />
          <path d="M205 96a32 32 0 1 0 5 32m-5-53v23h-23" stroke={`url(#${id}-symbol)`} strokeWidth="9" />
          <path d="m176 106 13 9-13 9Z" fill={`url(#${id}-symbol)`} stroke={`url(#${id}-symbol)`} strokeWidth="2" />
        </g>
      )}
      {outcome === 'complete' && (
        <g>
          <path d="m180 76 39 39-39 39-39-39Z" fill="#07152b" stroke={`url(#${id}-symbol)`} strokeWidth="3" />
          <g fill={`url(#${id}-symbol)`}>
            <path d="m180 89 10 10-10 10-10-10Z" />
            <path d="m164 105 10 10-10 10-10-10Z" />
            <path d="m196 105 10 10-10 10-10-10Z" />
            <path d="m180 121 10 10-10 10-10-10Z" />
          </g>
        </g>
      )}
      <g className="result-sparkle" fill={victory ? '#ffe6a1' : '#b8eaff'}>
        <path d="m82 43 2.5 7.5L92 53l-7.5 2.5L82 63l-2.5-7.5L72 53l7.5-2.5Z" />
        <path d="m269 31 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        <circle cx="111" cy="201" opacity="0.7" r="2" />
        <circle cx="44" cy="66" opacity="0.6" r="1.5" />
        <circle cx="320" cy="84" opacity="0.8" r="2" />
        <path d="m279 185 1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5Z" />
      </g>
      <g fill={victory ? '#eac373' : '#f4aca3'} opacity="0.7">
        <path d="m300 58 4-4 4 4-4 4Z" />
        <path d="m58 180 3-3 3 3-3 3Z" />
        <circle cx="245" cy="209" r="1.5" />
      </g>
    </svg>
  );
};

export default ResultArtwork;
