import {useId} from 'react';

// A lightweight illustration stays crisp at phone sizes and uses the real reward amount in adjacent text.
const RewardArtwork = () => {
  const id = useId();
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 320 260">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#fff0ae" />
          <stop offset="0.5" stopColor="#ffd35a" />
          <stop offset="1" stopColor="#d48a23" />
        </linearGradient>
        <linearGradient id={`${id}-wallet`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#4c7992" />
          <stop offset="1" stopColor="#22465e" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#ffcf62" stopOpacity="0.24" />
          <stop offset="1" stopColor="#ffcf62" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="164" cy="124" fill={`url(#${id}-glow)`} r="124" />
      <ellipse cx="164" cy="232" fill="#081a2f" opacity="0.45" rx="105" ry="12" />
      <g fill="none" stroke="#9ac3c9" strokeDasharray="3 9" strokeWidth="1.5">
        <path d="M48 172C8 95 109 30 191 42s125 107 71 151" />
      </g>
      <g fill="#ffe7a0">
        <path d="m51 56 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        <path d="m266 100 3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
        <circle cx="238" cy="43" r="3" />
        <circle cx="36" cy="135" r="3" />
      </g>
      <g className="reward-coin">
        <circle cx="168" cy="76" fill="#b97820" r="43" />
        <circle cx="164" cy="72" fill={`url(#${id}-gold)`} r="43" />
        <circle cx="164" cy="72" fill="none" r="34" stroke="#fff2b0" strokeWidth="2" />
        <text
          fill="#855216"
          fontFamily="Arial, sans-serif"
          fontSize="21"
          fontWeight="800"
          textAnchor="middle"
          x="164"
          y="80"
        >
          TNB
        </text>
      </g>
      <g transform="rotate(-19 92 126)">
        <circle cx="94" cy="129" fill="#b97820" r="28" />
        <circle cx="91" cy="125" fill={`url(#${id}-gold)`} r="28" />
        <circle cx="91" cy="125" fill="none" r="21" stroke="#fff2b0" strokeWidth="2" />
        <path d="M83 118h16m-8 0v16" fill="none" stroke="#98601c" strokeLinecap="round" strokeWidth="4" />
      </g>
      <path d="M86 150v-16c0-9 7-16 16-18l119-15v59" fill="#16354b" stroke="#80a5b3" strokeWidth="2" />
      <path d="m100 125 111-14v26H100z" fill="#c3d8ce" />
      <rect
        fill={`url(#${id}-wallet)`}
        height="95"
        rx="18"
        stroke="#7ca4b5"
        strokeWidth="2"
        width="159"
        x="78"
        y="135"
      />
      <rect
        fill="none"
        height="75"
        opacity="0.4"
        rx="12"
        stroke="#c8d9d9"
        strokeDasharray="3 5"
        width="139"
        x="88"
        y="145"
      />
      <path d="M211 163h30v39h-30a19.5 19.5 0 0 1 0-39" fill="#183b52" stroke="#7ca4b5" strokeWidth="2" />
      <circle cx="215" cy="182" fill="#f5cc70" r="5" />
      <g fill={`url(#${id}-gold)`} stroke="#e4a53b" strokeWidth="1.5">
        <path d="M241 211v13c0 12 61 12 61 0v-13" />
        <ellipse cx="271.5" cy="211" rx="30.5" ry="8" />
        <path d="M241 198v13c0 12 61 12 61 0v-13" />
        <ellipse cx="271.5" cy="198" rx="30.5" ry="8" />
        <path d="M241 185v13c0 12 61 12 61 0v-13" />
        <ellipse cx="271.5" cy="185" rx="30.5" ry="8" />
      </g>
    </svg>
  );
};

export default RewardArtwork;
