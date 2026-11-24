import {useId} from 'react';

const ResultArtwork = ({victory}: {victory: boolean}) => {
  const id = useId();

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 240 210">
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop offset="0" stopColor={victory ? '#f8d57c' : '#8fd5d1'} stopOpacity="0.2" />
          <stop offset="1" stopColor={victory ? '#f8d57c' : '#8fd5d1'} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-metal`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor={victory ? '#fff1c5' : '#d1e6e9'} />
          <stop offset="0.45" stopColor={victory ? '#f2ca70' : '#91bbc5'} />
          <stop offset="1" stopColor={victory ? '#b48032' : '#477c8d'} />
        </linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" x2="1">
          <stop stopColor="#cb913e" />
          <stop offset="0.35" stopColor="#fff0bd" />
          <stop offset="0.72" stopColor="#f3cc76" />
          <stop offset="1" stopColor="#bf8330" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="104" fill={`url(#${id}-halo)`} r="104" />
      <circle cx="120" cy="104" fill="#102d39" r="74" stroke="#ffffff16" />
      <circle cx="120" cy="104" fill="none" r="66" stroke={victory ? '#e3bc6555' : '#9bcbd455'} />
      <g fill={`url(#${id}-metal)`}>
        {[false, true].map((mirrored) => (
          <g key={String(mirrored)} transform={mirrored ? 'translate(240 0) scale(-1 1)' : undefined}>
            <path
              d="M109 176C64 164 40 126 51 79"
              fill="none"
              stroke={victory ? '#cba351' : '#7ca6b2'}
              strokeWidth="2"
            />
            <path d="M50 85C38 80 36 64 44 55C54 65 57 76 50 85Z" />
            <path d="M48 104C33 102 27 88 31 77C44 83 51 92 48 104Z" />
            <path d="M53 124C36 125 25 112 26 100C41 103 51 111 53 124Z" />
            <path d="M63 143C47 148 32 140 28 127C43 125 57 131 63 143Z" />
            <path d="M79 159C65 168 49 164 41 153C56 146 69 149 79 159Z" />
            <path d="M99 173C88 185 71 185 60 176C72 166 87 165 99 173Z" />
          </g>
        ))}
      </g>
      {victory ? (
        <g>
          <path
            d="M91 65H73V82C73 99 83 108 100 108M149 65H167V82C167 99 157 108 140 108"
            fill="none"
            stroke={`url(#${id}-metal)`}
            strokeWidth="8"
          />
          <path
            d="M87 55H153L148 88C145 110 134 120 120 120C106 120 95 110 92 88Z"
            fill={`url(#${id}-cup)`}
            stroke="#ffe6a4"
            strokeWidth="1.5"
          />
          <path d="M114 119H126V140L140 146H100L114 140Z" fill={`url(#${id}-metal)`} />
          <rect fill={`url(#${id}-metal)`} height="10" rx="3" width="50" x="95" y="146" />
          <path
            d="m120 71 4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3-9.3-4.9-9.3 4.9 1.8-10.3-7.5-7.3 10.4-1.5Z"
            fill="#fff6d8"
            stroke="#c68f37"
          />
          <path d="M96 61H144" opacity="0.8" stroke="#fff7df" strokeLinecap="round" strokeWidth="3" />
          <g className="result-sparkle" fill="#ffe7a3">
            <path d="m180 35 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
            <path d="m64 28 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
            <circle cx="207" cy="113" r="2.5" />
            <circle cx="30" cy="44" r="2" />
            <circle cx="174" cy="177" r="2" />
          </g>
        </g>
      ) : (
        <g>
          <path d="M120 55 151 68V100C151 125 136 141 120 151C104 141 89 125 89 100V68Z" fill={`url(#${id}-metal)`} />
          <path d="M120 66 142 75V100C142 119 132 132 120 140C108 132 98 119 98 100V75Z" fill="#173e4b" />
          <path
            d="m120 80 6.3 13 14.3 2.1-10.3 10 2.4 14.2-12.7-6.7-12.7 6.7 2.4-14.2-10.3-10 14.3-2.1Z"
            fill={`url(#${id}-metal)`}
          />
        </g>
      )}
    </svg>
  );
};

export default ResultArtwork;
