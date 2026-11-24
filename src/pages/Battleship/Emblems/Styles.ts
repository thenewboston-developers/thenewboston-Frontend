import styled, {css, keyframes} from 'styled-components';

import {naval} from '../theme';

const lockOn = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(0.88); }
`;

// The contact lights up just after the sweep passes it (the blip sits about 35 degrees clockwise from north)
const radarBlip = keyframes`
  0%, 8% { opacity: 0; transform: scale(0.6); }
  11% { opacity: 1; transform: scale(1.25); }
  60%, 100% { opacity: 0; transform: scale(0.85); }
`;

const sonarRipple = keyframes`
  0% { opacity: 0.85; transform: scale(0.2); }
  100% { opacity: 0; transform: scale(1); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Engagement = styled.svg`
  display: block;
  height: auto;
  max-width: 520px;
  width: 100%;
`;

// The flying shell and splash animate with SMIL, so they are hidden rather than paused for reduced motion
export const EngagementMotion = styled.g`
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const EngagementTarget = styled.g`
  animation: ${lockOn} 2.4s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
  ${reducedMotion};
`;

export const Insignia = styled.span`
  align-items: center;
  background: radial-gradient(circle at 50% 35%, #173450, #0a1a2b 70%);
  border: 1px solid #f6cb6f99;
  border-radius: 50%;
  box-shadow:
    0 0 0 5px #f6cb6f12,
    0 0 26px #f6cb6f26;
  color: ${naval.gold};
  display: flex;
  flex-shrink: 0;
  height: 58px;
  justify-content: center;
  position: relative;
  width: 58px;

  &::after {
    border: 1px dashed #f6cb6f59;
    border-radius: 50%;
    content: '';
    inset: 5px;
    position: absolute;
  }
`;

export const Radar = styled.span<{$size: 'large' | 'small'}>`
  background:
    radial-gradient(
      circle,
      transparent 0 30%,
      #64d2ec47 31% 32.5%,
      transparent 34% 62%,
      #64d2ec3d 63% 64.5%,
      transparent 66%
    ),
    linear-gradient(#64d2ec33, #64d2ec33) center / 1px 100% no-repeat,
    linear-gradient(90deg, #64d2ec33, #64d2ec33) center / 100% 1px no-repeat,
    radial-gradient(circle, #0f3a52, #061727 72%);
  border: 1px solid #64d2ec8c;
  border-radius: 50%;
  box-shadow: ${({$size}) =>
    $size === 'large' ? `0 0 0 5px #64d2ec0f, 0 0 26px #64d2ec2e, inset 0 0 18px #00000073` : 'none'};
  display: inline-block;
  flex-shrink: 0;
  height: ${({$size}) => ($size === 'large' ? '58px' : '22px')};
  overflow: hidden;
  position: relative;
  width: ${({$size}) => ($size === 'large' ? '58px' : '22px')};
`;

export const RadarBlip = styled.span`
  animation: ${radarBlip} 3.6s linear infinite;
  background: ${naval.amberLight};
  border-radius: 50%;
  box-shadow: 0 0 8px ${naval.amber};
  height: 12%;
  left: 59%;
  position: absolute;
  top: 25%;
  width: 12%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.9;
  }
`;

export const RadarSweep = styled.span`
  animation: ${spin} 3.6s linear infinite;
  background: conic-gradient(from 0deg, transparent 0deg 270deg, #64d2ec66 350deg, #b4f0ff 360deg);
  border-radius: 50%;
  inset: 0;
  position: absolute;
  ${reducedMotion};
`;

export const Reticle = styled.svg`
  display: block;
  flex-shrink: 0;
  filter: drop-shadow(0 0 14px #ffad6a33);
  height: 58px;
  width: 58px;
`;

export const ReticleRing = styled.circle`
  animation: ${spin} 14s linear infinite;
  transform-box: fill-box;
  transform-origin: center;
  ${reducedMotion};
`;

export const Sonar = styled.span`
  background: radial-gradient(circle, ${naval.sonar} 0 3px, transparent 4px);
  border: 1px solid #64d2ec40;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  height: 56px;
  position: relative;
  width: 56px;

  span {
    animation: ${sonarRipple} 2.8s ease-out infinite;
    border: 1px solid ${naval.sonar};
    border-radius: 50%;
    inset: 0;
    position: absolute;
  }

  span:nth-child(2) {
    animation-delay: 1.4s;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      animation: none;
      opacity: 0.35;
      transform: scale(0.6);
    }

    span:nth-child(2) {
      transform: scale(0.95);
    }
  }
`;
