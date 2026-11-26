import styled, {keyframes} from 'styled-components';

import {easing, fonts, palette, shadows} from '../theme';

const bob = keyframes`
  0%,
  100% {
    transform: translateY(0) rotate(-8deg);
  }

  50% {
    transform: translateY(-5px) rotate(14deg);
  }
`;

const drift = keyframes`
  from {
    transform: translateX(-30%);
  }

  to {
    transform: translateX(130%);
  }
`;

const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(26px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ring = keyframes`
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
`;

const smoke = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6);
  }

  25% {
    opacity: 0.55;
  }

  100% {
    opacity: 0;
    transform: translate(7px, -26px) scale(1.5);
  }
`;

const wave = keyframes`
  0%,
  100% {
    transform: skewY(-5deg) scaleX(1);
  }

  50% {
    transform: skewY(5deg) scaleX(0.94);
  }
`;

export const Cloud = styled.span<{$delay: number; $top: number}>`
  animation: ${drift} 70s linear infinite;
  animation-delay: ${({$delay}) => $delay}s;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  height: 34%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: ${({$top}) => $top}%;
  width: 46%;
  z-index: 2;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    display: none;
  }
`;

export const Control = styled.button`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(13, 31, 26, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  color: ${palette.white};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  gap: 6px;
  height: 36px;
  justify-content: center;
  min-width: 36px;
  padding: 0 9px;
  transition:
    background 0.15s ease,
    transform 0.12s ease;

  &:hover:enabled {
    background: rgba(44, 107, 85, 0.9);
  }

  &:active:enabled {
    transform: scale(0.94);
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const Controls = styled.div`
  bottom: 12px;
  display: flex;
  gap: 6px;
  position: absolute;
  right: 12px;
  z-index: 5;
`;

export const Hit = styled.button`
  background: transparent;
  border: 0;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  cursor: pointer;
  margin: 0;
  outline: none;
  padding: 0;
  position: absolute;
`;

export const Stage = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: 0 0;
  will-change: transform;

  &[data-animate='true'] {
    transition: transform 0.45s ${easing.out};
  }

  svg {
    display: block;
    overflow: visible;
  }

  .tile {
    animation: ${rise} 0.6s ${easing.out} both;
  }

  .flag {
    animation: ${wave} 2.6s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: 0 50%;
  }

  .smoke {
    animation: ${smoke} 3.6s ease-out infinite;
    transform-box: fill-box;
    transform-origin: 50% 100%;
  }

  .work {
    animation: ${bob} 0.9s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: 50% 80%;
  }

  .selected {
    animation: ${ring} 1.6s ease-in-out infinite;
  }

  .hint {
    animation: ${ring} 2.2s ease-in-out infinite;
  }

  text {
    font-family: ${fonts.ui};
    font-weight: 800;
    user-select: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-animate='true'] {
      transition: none;
    }

    .tile,
    .flag,
    .smoke,
    .work,
    .selected,
    .hint {
      animation: none;
    }
  }
`;

export const Tooltip = styled.div`
  backdrop-filter: blur(10px);
  background: rgba(13, 31, 26, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6);
  color: ${palette.white};
  font-size: 12px;
  left: 0;
  line-height: 1.45;
  max-width: 230px;
  padding: 9px 12px;
  pointer-events: none;
  position: absolute;
  top: 0;
  translate: -50% calc(-100% - 14px);
  white-space: nowrap;
  z-index: 6;

  strong {
    display: block;
    font-size: 13px;
  }

  span {
    color: #b8cbbf;
    display: block;
  }

  em {
    color: ${palette.goldBright};
    font-style: normal;
    font-weight: 700;
  }
`;

export const Viewport = styled.div<{$compact?: boolean; $grabbing: boolean; $zoomed: boolean}>`
  background:
    radial-gradient(120% 90% at 50% 40%, rgba(74, 156, 201, 0.16), transparent 62%),
    radial-gradient(90% 70% at 50% 110%, rgba(230, 170, 60, 0.1), transparent 60%),
    linear-gradient(180deg, #0f2a2c 0%, ${palette.ink} 100%);
  border-radius: 16px;
  cursor: ${({$grabbing, $zoomed}) => {
    if ($grabbing) return 'grabbing';
    return $zoomed ? 'grab' : 'default';
  }};
  height: ${({$compact}) => ($compact ? 'clamp(220px, 34vw, 340px)' : 'clamp(300px, 52vw, 600px)')};
  overflow: hidden;
  position: relative;
  touch-action: ${({$zoomed}) => ($zoomed ? 'none' : 'pan-y')};
  user-select: none;

  &::before {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 36px 36px;
    content: '';
    inset: 0;
    mask-image: radial-gradient(closest-side, #000 30%, transparent 100%);
    position: absolute;
  }
`;
