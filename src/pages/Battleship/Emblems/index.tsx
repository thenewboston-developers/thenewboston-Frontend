import {useId} from 'react';
import {mdiAnchor} from '@mdi/js';
import Icon from '@mdi/react';

import * as S from './Styles';

// Every emblem is decorative: the headings and text next to them carry the meaning.

const SHELL_PATH = 'M138 104Q205 2 268 98';

// A warship in profile, bow to the right, standing on its waterline at y = 36
const SHIP_PATH = [
  'M0 27H104L120 22L111 36H7Z',
  'M42 27V18H56V11H71V18H78V27Z',
  'M46 18L48.5 10H55V18Z',
  'M63 11V1H65V11Z',
  'M59 4H69V5.6H59Z',
  'M84 27V23.5C84 22.4 84.9 21.5 86 21.5H94C95.1 21.5 96 22.4 96 23.5V27Z',
  'M96 22.6H111V24H96Z',
  'M22 27V23.5C22 22.4 22.9 21.5 24 21.5H32C33.1 21.5 34 22.4 34 23.5V27Z',
  'M9 22.6H22V24H9Z',
].join('');

const WINDOWS = [45, 49, 53, 60, 64, 68, 72];

const Ship = ({fill, rim, transform}: {fill: string; rim: string; transform: string}) => (
  <g transform={transform}>
    <path d={SHIP_PATH} fill={fill} stroke={rim} strokeLinejoin="round" strokeWidth="0.8" />
    <rect fill="#ffc89c" height="1.4" opacity="0.8" width="11" x="58" y="13.2" />
    {WINDOWS.map((x) => (
      <rect fill="#ffc89c" height="1.2" key={x} opacity="0.65" width="1.8" x={x} y="21" />
    ))}
  </g>
);

export const AnchorInsignia = () => (
  <S.Insignia aria-hidden="true">
    <Icon path={mdiAnchor} size="26px" />
  </S.Insignia>
);

// Two fleets trading fire across open water, with a shell arcing onto a locked target
export const EngagementArt = () => {
  // Gradient references break on some characters React puts in generated IDs
  const id = `engagement-${useId().replace(/[^\w-]/g, '')}`;
  const friendly = `${id}-friendly`;
  const glow = `${id}-glow`;
  const hostile = `${id}-hostile`;
  const sea = `${id}-sea`;
  return (
    <S.Engagement aria-hidden="true" viewBox="0 0 360 150">
      <defs>
        <linearGradient id={friendly} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2b5d7d" />
          <stop offset="1" stopColor="#0f2638" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#64d2ec" stopOpacity="0.16" />
          <stop offset="1" stopColor="#64d2ec" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={hostile} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2d3b4f" />
          <stop offset="1" stopColor="#111b28" />
        </linearGradient>
        <linearGradient id={sea} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#64d2ec" stopOpacity="0.16" />
          <stop offset="1" stopColor="#64d2ec" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="118" fill={`url(#${glow})`} rx="190" ry="34" />
      <rect fill={`url(#${sea})`} height="32" width="360" y="118" />
      <path d="M0 118.5H360" stroke="#64d2ec" strokeOpacity="0.45" />
      <path
        d="M24 127H118M150 127H214M246 127H340M8 136H96M126 136H236M266 136H352M40 145H140M190 145H320"
        stroke="#64d2ec"
        strokeDasharray="10 7"
        strokeOpacity="0.18"
      />
      <Ship fill={`url(#${friendly})`} rim="#64d2ec" transform="translate(10 77) scale(1.15)" />
      <Ship fill={`url(#${hostile})`} rim="#ffad6a" transform="translate(350 77) scale(-1.15 1.15)" />
      <path d={SHELL_PATH} fill="none" stroke="#ffad6a" strokeDasharray="3 6" strokeOpacity="0.7" strokeWidth="1.5" />
      <S.EngagementTarget>
        <circle cx="272" cy="100" fill="none" r="13" stroke="#ffad6a" strokeDasharray="4 4" strokeWidth="1.5" />
        <path
          d="M272 81V88M272 112V119M253 100H260M284 100H291"
          stroke="#ffc89c"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </S.EngagementTarget>
      <S.EngagementMotion>
        <circle fill="#ffe2c4" r="2.6">
          <animateMotion
            calcMode="linear"
            dur="4.2s"
            keyPoints="0;1;1"
            keyTimes="0;0.42;1"
            path={SHELL_PATH}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            dur="4.2s"
            keyTimes="0;0.04;0.4;0.43;1"
            repeatCount="indefinite"
            values="0;1;1;0;0"
          />
        </circle>
        <circle cx="268" cy="98" fill="none" r="2" stroke="#ffc89c" strokeWidth="2">
          <animate attributeName="r" dur="4.2s" keyTimes="0;0.42;0.7;1" repeatCount="indefinite" values="2;2;18;18" />
          <animate
            attributeName="opacity"
            dur="4.2s"
            keyTimes="0;0.41;0.43;0.7;1"
            repeatCount="indefinite"
            values="0;0;1;0;0"
          />
        </circle>
      </S.EngagementMotion>
    </S.Engagement>
  );
};

export const RadarScope = ({size = 'large'}: {size?: 'large' | 'small'}) => (
  <S.Radar $size={size} aria-hidden="true">
    <S.RadarSweep />
    <S.RadarBlip />
  </S.Radar>
);

export const SonarPing = () => (
  <S.Sonar aria-hidden="true">
    <span />
    <span />
  </S.Sonar>
);

export const TargetReticle = () => (
  <S.Reticle aria-hidden="true" viewBox="0 0 64 64">
    <circle cx="32" cy="32" fill="#0b1d2f" r="31" stroke="#ffad6a" strokeOpacity="0.55" />
    <S.ReticleRing cx="32" cy="32" fill="none" r="22" stroke="#ffad6a" strokeDasharray="4 5" strokeWidth="1.5" />
    <circle cx="32" cy="32" fill="none" r="12" stroke="#ffc89c" strokeOpacity="0.7" />
    <path d="M32 5V17M32 47V59M5 32H17M47 32H59" stroke="#ffad6a" strokeLinecap="round" strokeWidth="2" />
    <circle cx="32" cy="32" fill="#ffc89c" r="2.5" />
  </S.Reticle>
);
