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

export const AnchorInsignia = ({size = 'large'}: {size?: S.EmblemSize}) => (
  <S.Insignia $size={size} aria-hidden="true">
    <Icon path={mdiAnchor} size={size === 'large' ? '26px' : '20px'} />
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

// Result crest for the shared result panel: a naval medal for a victory, a sinking ship for a defeat and a
// lifebuoy when nobody won. Sparkles reuse the panel's own `result-sparkle` animation.
export const ResultArtwork = ({outcome}: {outcome: 'complete' | 'draw' | 'loss' | 'win'}) => {
  const id = `result-${useId().replace(/[^\w-]/g, '')}`;
  const above = `${id}-above`;
  const below = `${id}-below`;
  const halo = `${id}-halo`;
  const horizon = `${id}-horizon`;
  const hull = `${id}-hull`;
  const metal = `${id}-metal`;
  const victory = outcome === 'win';
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 360 240">
      <defs>
        <radialGradient id={halo}>
          <stop offset="0" stopColor={victory ? '#ffcd67' : '#64d2ec'} stopOpacity="0.3" />
          <stop offset="1" stopColor="#061323" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={metal} x1="0.15" x2="0.85" y1="0" y2="1">
          <stop offset="0" stopColor="#fff3cc" />
          <stop offset="0.3" stopColor="#f2c86e" />
          <stop offset="0.55" stopColor="#a8711f" />
          <stop offset="0.8" stopColor="#e9b75a" />
          <stop offset="1" stopColor="#fff0bc" />
        </linearGradient>
        <linearGradient id={hull} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3b6683" />
          <stop offset="1" stopColor="#14283a" />
        </linearGradient>
        <linearGradient id={horizon} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#64d2ec" stopOpacity="0" />
          <stop offset="0.5" stopColor="#64d2ec" stopOpacity="0.8" />
          <stop offset="1" stopColor="#64d2ec" stopOpacity="0" />
        </linearGradient>
        <mask id={above}>
          <rect fill="#ffffff" height="151" width="360" />
        </mask>
        <mask id={below}>
          <rect fill="#ffffff" height="89" width="360" y="151" />
        </mask>
      </defs>
      <ellipse cx="180" cy="122" fill={`url(#${halo})`} rx="170" ry="118" />
      {victory && (
        <g>
          <path d="M150 14H210V58L180 78L150 58Z" fill="#163c66" stroke="#ffe2a1" strokeOpacity="0.5" />
          <path d="M162 14H174V69L162 61ZM186 14H198V61L186 69Z" fill="#f4efe1" />
          <path d="M174 14H186V77L180 79L174 77Z" fill="#c43a2c" />
          <circle cx="180" cy="134" fill={`url(#${metal})`} r="62" stroke="#fff3cc" strokeOpacity="0.6" />
          <circle cx="180" cy="134" fill="none" r="50" stroke="#7a4d14" strokeOpacity="0.55" strokeWidth="3" />
          <path d={mdiAnchor} fill="#6b4314" transform="translate(143 97) scale(3.1)" />
          <g className="result-sparkle" fill="#fff3cc">
            <path d="M84 92L88 102L98 106L88 110L84 120L80 110L70 106L80 102Z" />
            <path d="M276 150L279 157L286 160L279 163L276 170L273 163L266 160L273 157Z" />
            <circle cx="262" cy="84" r="3" />
            <circle cx="104" cy="170" r="2.5" />
          </g>
        </g>
      )}
      {outcome === 'loss' && (
        <g>
          <g mask={`url(#${below})`} opacity="0.22">
            <g transform="translate(150 162) rotate(-26) scale(1.9) translate(-40 -30)">
              <path d={SHIP_PATH} fill="#64d2ec" />
            </g>
          </g>
          <g mask={`url(#${above})`}>
            <g transform="translate(150 162) rotate(-26) scale(1.9) translate(-40 -30)">
              <path d={SHIP_PATH} fill={`url(#${hull})`} stroke="#64d2ec" strokeLinejoin="round" strokeWidth="0.6" />
            </g>
          </g>
          <path d="M10 151.5H350" stroke={`url(#${horizon})`} strokeWidth="1.5" />
          <path
            d="M50 168H150M186 168H310M24 184H128M160 184H270M70 200H200M228 200H330"
            stroke={`url(#${horizon})`}
            strokeDasharray="10 7"
            strokeOpacity="0.5"
          />
          <ellipse cx="122" cy="152" fill="none" rx="54" ry="7" stroke="#9fe6f6" strokeOpacity="0.55" />
          <g className="result-sparkle" fill="none" stroke="#9fe6f6">
            <circle cx="104" cy="134" r="4.5" />
            <circle cx="90" cy="114" r="3" />
            <circle cx="118" cy="104" r="3.5" />
          </g>
          <g fill="#7d97ab" opacity="0.32">
            <circle cx="222" cy="58" r="11" />
            <circle cx="236" cy="38" r="14" />
            <circle cx="256" cy="20" r="10" />
          </g>
        </g>
      )}
      {(outcome === 'complete' || outcome === 'draw') && (
        <g>
          <circle cx="180" cy="116" fill="none" r="78" stroke="#ffe2c4" strokeDasharray="2 7" strokeOpacity="0.45" />
          <circle cx="180" cy="116" fill="none" r="56" stroke="#f4efe1" strokeWidth="24" />
          <circle
            cx="180"
            cy="116"
            fill="none"
            r="56"
            stroke="#d9452f"
            strokeDasharray="44 44"
            strokeDashoffset="22"
            strokeWidth="24"
          />
          <circle cx="180" cy="116" fill="none" r="68" stroke="#0b2236" strokeOpacity="0.4" />
          <path
            d="M40 212H140M176 212H320M80 226H200M232 226H300"
            stroke="#64d2ec"
            strokeDasharray="10 7"
            strokeOpacity="0.3"
          />
        </g>
      )}
    </svg>
  );
};

export const RadarScope = ({size = 'large'}: {size?: S.EmblemSize}) => (
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

export const TargetReticle = ({size = 'large'}: {size?: S.EmblemSize}) => (
  <S.Reticle $size={size} aria-hidden="true" viewBox="0 0 64 64">
    <circle cx="32" cy="32" fill="#0b1d2f" r="31" stroke="#ffad6a" strokeOpacity="0.55" />
    <S.ReticleRing cx="32" cy="32" fill="none" r="22" stroke="#ffad6a" strokeDasharray="4 5" strokeWidth="1.5" />
    <circle cx="32" cy="32" fill="none" r="12" stroke="#ffc89c" strokeOpacity="0.7" />
    <path d="M32 5V17M32 47V59M5 32H17M47 32H59" stroke="#ffad6a" strokeLinecap="round" strokeWidth="2" />
    <circle cx="32" cy="32" fill="#ffc89c" r="2.5" />
  </S.Reticle>
);
