import {useId} from 'react';

import * as S from './Styles';

const RewardIllustration = () => {
  const id = useId();
  const gold = `url(#${id}-gold)`;
  const edge = `url(#${id}-edge)`;

  return (
    <S.Illustration aria-hidden="true" focusable="false" viewBox="0 0 440 250">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff3c6" />
          <stop offset="0.4" stopColor="#ffda81" />
          <stop offset="1" stopColor="#ca8428" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#efbd5e" />
          <stop offset="0.5" stopColor="#936027" />
          <stop offset="1" stopColor="#e6ac49" />
        </linearGradient>
        <linearGradient id={`${id}-controller`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#e8edf8" />
          <stop offset="1" stopColor="#8193b5" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#ffc75d" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ffc75d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="253" cy="134" fill={`url(#${id}-glow)`} rx="181" ry="115" />
      <ellipse cx="232" cy="214" fill="#050c1c" opacity="0.35" rx="145" ry="16" />
      <ellipse
        cx="234"
        cy="141"
        fill="none"
        rx="175"
        ry="70"
        stroke="#b2c7ed"
        strokeDasharray="2 9"
        strokeOpacity="0.15"
        transform="rotate(-17 234 141)"
      />
      <path d="M99 120C124 59 181 46 225 57" fill="none" stroke="#b7c9e8" strokeOpacity="0.45" strokeWidth="2" />
      <path
        d="m218 49 10 9-13 3"
        fill="none"
        stroke="#b7c9e8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <g transform="translate(56 130) rotate(-12)">
        <path
          d="M19 6C8 8 5 25 1 53-2 72 11 78 25 66L40 53H74L89 66C104 78 116 72 113 53L104 20C101 8 94 4 83 4H28Z"
          fill="#51617f"
          transform="translate(0 6)"
        />
        <path
          d="M19 6C8 8 5 25 1 53-2 72 11 78 25 66L40 53H74L89 66C104 78 116 72 113 53L104 20C101 8 94 4 83 4H28Z"
          fill={`url(#${id}-controller)`}
          stroke="#ffffff"
          strokeOpacity="0.4"
        />
        <path d="M27 20v23m-11-11h23" stroke="#273957" strokeLinecap="round" strokeWidth="8" />
        <circle cx="85" cy="24" fill="#f0c678" r="5" />
        <circle cx="96" cy="36" fill="#677eab" r="5" />
        <circle cx="73" cy="36" fill="#677eab" r="5" />
        <circle cx="85" cy="48" fill="#677eab" r="5" />
        <rect fill="#697e9f" height="4" rx="2" width="13" x="50" y="29" />
      </g>
      <g transform="translate(186 84) rotate(-9)">
        <path
          d="M15 10H1v15c0 20 13 30 29 30m42-45h16v15c0 20-13 30-29 30"
          fill="none"
          stroke="#ba8137"
          strokeWidth="10"
        />
        <path d="M14 6H0v15c0 20 13 30 29 30M73 6h15v15c0 20-13 30-29 30" fill="none" stroke={gold} strokeWidth="7" />
        <path d="M17 1h55v33c0 23-12 36-28 36S17 57 17 34Z" fill={edge} transform="translate(4 3)" />
        <path d="M17 0h55v33c0 23-12 36-28 36S17 56 17 33Z" fill={gold} />
        <path d="M23 7h8v27c0 14 3 22 8 27-10-3-16-14-16-28Z" fill="#fff4cf" opacity="0.6" />
        <path d="m44 18 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#ae712a" opacity="0.65" />
        <path d="M39 69h11v24H39Z" fill={gold} />
        <path d="M26 93h36l7 10H19Z" fill={gold} />
        <rect fill="#8c602f" height="9" rx="3" width="58" x="15" y="103" />
        <rect fill={gold} height="6" rx="2" width="58" x="15" y="100" />
      </g>
      <g transform="translate(274 181)">
        {[24, 16, 8, 0].map((y) => (
          <g key={y}>
            <path d={`M0 ${y}v7c0 11 76 11 76 0v-7Z`} fill={edge} stroke="#dfa94f" strokeWidth="0.6" />
            <ellipse cx="38" cy={y} fill={gold} rx="38" ry="9" stroke="#ffdf94" />
          </g>
        ))}
      </g>
      <g transform="translate(300 108) rotate(14)">
        <ellipse cx="5" cy="0" fill={edge} rx="49" ry="56" />
        <ellipse cx="0" cy="0" fill={gold} rx="48" ry="56" stroke="#ffebad" strokeWidth="2" />
        <ellipse cx="0" cy="0" fill="none" rx="39" ry="47" stroke="#b87e2f" strokeWidth="1.5" />
        <ellipse cx="-1" cy="-1" fill="none" rx="35" ry="43" stroke="#ffedaf" strokeOpacity="0.65" />
        <path d="m-12-24 25 24-25 24h12L25 0 0-24Z" fill="#9e6424" />
        <path d="m-14-26 25 24-25 24h12L23-2-2-26Z" fill="#fff3c7" />
      </g>
      <g transform="translate(369 64) rotate(27)">
        <ellipse cx="3" fill={edge} rx="15" ry="21" />
        <ellipse fill={gold} rx="15" ry="21" stroke="#ffe6a3" />
        <path d="m-5-8 8 8-8 8h5l8-8-8-8Z" fill="#fff1bd" />
      </g>
      <g fill="#ffe2a0">
        <path d="m169 57 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
        <path d="m365 136 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
        <path d="m276 32 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        <circle cx="131" cy="92" r="2" />
        <circle cx="378" cy="185" r="2" />
        <circle cx="215" cy="39" r="1.5" />
      </g>
    </S.Illustration>
  );
};

export default RewardIllustration;
