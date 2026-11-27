import styled, {css, keyframes} from 'styled-components';

import {art, easing, fadeUp, fonts, palette, pop, shadows} from '../theme';

export * from '../Styles';

export type Place = 'pack' | 'warehouse';

// Two materials carry the whole page: leather is what one player owns, timber is what the tribe shares
const CANVAS = '#f8efdc';
const CREAM = '#fff4de';
const LEATHER_DEEP = '#7d4c2a';
const PLANK = '#b98755';
const PLANK_SEAM = '#a97847';
const ROOF = '#55707f';
const ROOF_DARK = '#3f5766';
const SHELF = '#2c1d10';
const SHELF_LIT = '#4a321d';
const STACKED = '760px';
const STITCH = 'rgba(255, 238, 208, 0.42)';

const arrive = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.7);
  }

  70% {
    opacity: 1;
    transform: translateY(2px) scale(1.04);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const beckon = keyframes`
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(246, 200, 101, 0.75);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(246, 200, 101, 0);
  }
`;

const bump = keyframes`
  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(1.28) rotate(-6deg);
  }

  70% {
    transform: scale(0.94) rotate(3deg);
  }

  100% {
    transform: scale(1);
  }
`;

const flyAcross = keyframes`
  to {
    transform: translateX(var(--dx));
  }
`;

const flyArc = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.6);
  }

  14% {
    opacity: 1;
  }

  50% {
    transform: translateY(calc(var(--dy) * 0.5 - var(--lift))) scale(1.3) rotate(-12deg);
  }

  86% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(var(--dy)) scale(0.72) rotate(8deg);
  }
`;

const flyAway = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.6);
  }

  18% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(var(--dy)) scale(1.15) rotate(-14deg);
  }
`;

const march = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 18px 0;
  }
`;

const marchDown = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 0 18px;
  }
`;

const nudge = keyframes`
  0%,
  100% {
    transform: translateX(-2px);
  }

  50% {
    transform: translateX(3px);
  }
`;

const rise = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.8);
  }

  18% {
    opacity: 1;
    transform: translateY(-3px) scale(1.06);
  }

  78% {
    opacity: 1;
    transform: translateY(-14px) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateY(-22px) scale(0.96);
  }
`;

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

// A drop target lights up while something is being carried toward it
const targeted = css<{$over?: boolean; $target?: boolean}>`
  ${({$target}) =>
    $target &&
    css`
      outline: 3px dashed rgba(246, 200, 101, 0.9);
      outline-offset: 5px;
    `}

  ${({$over}) =>
    $over &&
    css`
      outline-style: solid;
      transform: scale(1.012);
    `}
`;

export const Bay = styled.div<{$kind: Place}>`
  padding: 9px 8px 12px;
  position: relative;

  ${({$kind}) =>
    $kind === 'pack'
      ? css`
          background: ${CANVAS};
          border: 1.5px dashed rgba(143, 87, 48, 0.5);
          border-radius: 18px;
          box-shadow:
            inset 0 3px 8px -2px rgba(107, 66, 38, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.22);
        `
      : css`
          background: linear-gradient(180deg, ${SHELF} 0%, ${SHELF_LIT} 100%);
          border-radius: 12px 12px 4px 4px;
          box-shadow:
            inset 0 10px 14px -8px rgba(0, 0, 0, 0.7),
            inset 0 0 0 1px rgba(0, 0, 0, 0.3);
          margin-bottom: 9px;
          padding-bottom: 8px;

          /* The plank the goods stand on */
          &::after {
            background: linear-gradient(180deg, #ecc48f 0%, ${art.woodCut} 42%, ${art.woodLight} 100%);
            border-radius: 3px;
            bottom: -9px;
            box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.5);
            content: '';
            height: 9px;
            left: -4px;
            position: absolute;
            right: -4px;
          }
        `}
`;

export const BayLabel = styled.h3<{$kind: Place}>`
  color: ${({$kind}) => ($kind === 'pack' ? art.hideDark : '#e5c594')};
  font-size: 10.5px;
  font-weight: 750;
  letter-spacing: 0.1em;
  line-height: 1.3;
  margin: 0 2px 8px;
  text-transform: uppercase;
`;

export const Bridge = styled.div<{$direction?: 'backward' | 'forward'}>`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 46px;
  position: relative;

  /* The trail goods travel along */
  &::before {
    background-image: radial-gradient(circle, #c9b98f 2px, transparent 2.6px);
    background-size: 9px 6px;
    content: '';
    height: 6px;
    left: 4px;
    position: absolute;
    right: 4px;
    top: 50%;
    translate: 0 -50%;

    ${({$direction}) =>
      $direction &&
      css`
        animation: ${march} 0.7s linear infinite;
        animation-direction: ${$direction === 'forward' ? 'normal' : 'reverse'};
        background-image: radial-gradient(circle, ${palette.gold} 2px, transparent 2.6px);
      `}

    ${still};
  }

  @container (max-width: ${STACKED}) {
    &::before {
      background-size: 6px 9px;
      bottom: 2px;
      height: auto;
      left: 50%;
      right: auto;
      top: 2px;
      translate: -50% 0;
      width: 6px;

      ${({$direction}) =>
        $direction &&
        css`
          animation-name: ${marchDown};
        `}
    }
  }
`;

export const BridgeBadge = styled.span<{$direction?: 'backward' | 'forward'}>`
  align-items: center;
  background: ${({$direction}) =>
    $direction ? `linear-gradient(180deg, ${palette.goldBright} 0%, ${palette.gold} 100%)` : palette.paper};
  border: 1px solid ${({$direction}) => ($direction ? '#c98f25' : palette.line)};
  border-radius: 50%;
  box-shadow: ${({$direction}) => ($direction ? shadows.glow : shadows.card)};
  color: ${({$direction}) => ($direction ? '#2b1e05' : palette.muted)};
  display: inline-flex;
  height: 38px;
  justify-content: center;
  position: relative;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    color 0.25s ease;
  width: 38px;
  z-index: 1;

  svg {
    ${({$direction}) =>
      $direction &&
      css`
        animation: ${nudge} 0.9s ease-in-out infinite;
        animation-direction: ${$direction === 'forward' ? 'normal' : 'reverse'};
      `}

    ${still};
  }

  @container (max-width: ${STACKED}) {
    rotate: 90deg;
  }

  ${still};
`;

export const Buckle = styled.span`
  background: linear-gradient(180deg, ${LEATHER_DEEP} 0%, ${art.woodDark} 100%);
  border-radius: 0 0 6px 6px;
  bottom: -17px;
  box-shadow: 0 4px 5px -2px rgba(60, 30, 10, 0.6);
  height: 32px;
  left: 50%;
  position: absolute;
  translate: -50% 0;
  width: 18px;

  &::after {
    background: ${art.woodDark};
    border: 4px solid ${palette.goldBright};
    border-radius: 7px;
    bottom: 4px;
    box-shadow:
      0 1px 0 ${palette.goldDeep},
      inset 0 1px 0 ${palette.goldDeep};
    content: '';
    height: 20px;
    left: 50%;
    position: absolute;
    translate: -50% 0;
    width: 30px;
  }
`;

export const Delta = styled.span<{$gain: boolean}>`
  animation: ${rise} 1.5s ${easing.out} both;
  background: ${({$gain}) => ($gain ? '#2a6248' : palette.emberDeep)};
  border-radius: 999px;
  box-shadow: 0 4px 10px -4px rgba(13, 31, 26, 0.6);
  color: ${palette.white};
  font-feature-settings: 'tnum';
  font-size: 11px;
  font-weight: 750;
  line-height: 1;
  padding: 4px 7px;
  pointer-events: none;
  position: absolute;
  right: -4px;
  top: -9px;
  white-space: nowrap;
  z-index: 3;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

export const Disclosure = styled.details`
  background: ${palette.paper};
  border: 1px solid #ead9b6;
  border-radius: 16px;
  box-shadow: 0 12px 24px -16px rgba(60, 30, 10, 0.7);
  color: ${palette.text};

  summary {
    align-items: center;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    font-size: 13.5px;
    font-weight: 650;
    gap: 9px;
    list-style: none;
    padding: 13px 14px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    color: ${palette.faint};
    content: '+';
    font-size: 18px;
    font-weight: 500;
    line-height: 1;
    margin-left: auto;
    transition: rotate 0.2s ease;
  }

  &[open] summary::after {
    rotate: 45deg;
  }

  summary:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }

  summary svg {
    color: ${palette.moss};
    flex-shrink: 0;
  }

  > div {
    animation: ${fadeUp} 0.3s ${easing.out} both;
    padding: 0 14px 14px;
  }

  form {
    margin-top: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    > div {
      animation: none;
    }

    summary::after {
      transition: none;
    }
  }
`;

export const DragGhost = styled.span`
  align-items: center;
  background: #fffaf0;
  border: 1px solid ${palette.gold};
  border-radius: 16px;
  box-shadow:
    ${shadows.glow},
    0 18px 30px -12px rgba(13, 31, 26, 0.5);
  color: ${palette.text};
  display: flex;
  flex-direction: column;
  font-feature-settings: 'tnum';
  font-size: 13px;
  font-weight: 750;
  gap: 1px;
  left: 0;
  padding: 8px 12px 6px;
  pointer-events: none;
  position: absolute;
  rotate: -5deg;
  top: 0;
  will-change: transform;
  z-index: 20;
`;

export const Flight = styled.span<{$away: boolean}>`
  animation: ${flyAcross} 0.78s cubic-bezier(0.45, 0, 0.55, 1) both;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 19;

  > span {
    animation: ${({$away}) => ($away ? flyAway : flyArc)} 0.78s ${easing.out} both;
    animation-delay: inherit;
    display: block;
    filter: drop-shadow(0 8px 6px rgba(13, 31, 26, 0.3));
  }
`;

export const Leather = styled.section<{$handle?: boolean; $over?: boolean; $target?: boolean}>`
  animation: ${fadeUp} 0.5s ${easing.out} both;
  background: linear-gradient(168deg, #cb8e5b 0%, ${art.hide} 36%, #9b6137 100%);
  border-radius: ${({$handle}) => ($handle ? '34px 34px 28px 28px' : '28px')};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    inset 0 -14px 26px -14px rgba(74, 40, 16, 0.6),
    0 2px 4px rgba(107, 66, 38, 0.2),
    0 24px 44px -26px rgba(107, 66, 38, 0.8);
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  margin-top: ${({$handle}) => ($handle ? '26px' : 0)};
  min-width: 0;
  position: relative;
  transition:
    outline-color 0.2s ease,
    transform 0.2s ${easing.out};

  ${({$handle}) =>
    $handle &&
    css`
      /* The carry handle */
      &::before {
        border: 10px solid ${art.woodDark};
        border-bottom: 0;
        border-radius: 46px 46px 0 0;
        content: '';
        height: 32px;
        left: 50%;
        position: absolute;
        top: -26px;
        translate: -50% 0;
        width: 128px;
      }
    `}

  /* Stitching along the seam */
  &::after {
    border: 2px dashed ${STITCH};
    border-radius: ${({$handle}) => ($handle ? '27px 27px 21px 21px' : '21px')};
    content: '';
    inset: 7px;
    pointer-events: none;
    position: absolute;
  }

  ${targeted};
  ${still};
`;

export const LeatherBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 26px 15px 18px;
`;

export const LeatherFlap = styled.header<{$handle?: boolean}>`
  align-items: center;
  background: linear-gradient(180deg, ${LEATHER_DEEP} 0%, ${art.woodDark} 100%);
  border-radius: ${({$handle}) => ($handle ? '34px 34px' : '28px 28px')} 50% 50% /
    ${({$handle}) => ($handle ? '34px 34px' : '28px 28px')} 24px 24px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 8px 12px -6px rgba(60, 30, 10, 0.6);
  color: ${CREAM};
  display: flex;
  gap: 12px;
  padding: 20px 22px 30px;
  position: relative;
  z-index: 1;

  @container (max-width: 420px) {
    padding: 18px 16px 28px;
  }
`;

export const Lintel = styled.header<{$roofless?: boolean}>`
  align-items: center;
  background: linear-gradient(180deg, ${art.wood} 0%, #744a2a 100%);
  border: 5px solid ${art.woodDark};
  border-bottom: 0;
  border-radius: ${({$roofless}) => ($roofless ? '22px 22px 0 0' : 0)};
  border-top-width: ${({$roofless}) => ($roofless ? '5px' : 0)};
  box-shadow: inset 0 -8px 10px -8px rgba(40, 22, 8, 0.7);
  color: ${CREAM};
  display: flex;
  gap: 12px;
  margin: ${({$roofless}) => ($roofless ? 0 : '0 8px')};
  padding: ${({$roofless}) => ($roofless ? '16px 16px 18px' : '14px 14px 16px')};
  position: relative;
`;

export const Locked = styled.div`
  align-items: center;
  background: rgba(20, 12, 5, 0.55);
  border: 1px dashed rgba(255, 238, 208, 0.35);
  border-radius: 14px;
  color: ${CREAM};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 13.5px;
  gap: 10px;
  justify-content: center;
  line-height: 1.6;
  min-height: 180px;
  padding: 24px 20px;
  text-align: center;

  strong {
    font-family: ${fonts.display};
    font-size: 20px;
    font-weight: 600;
  }
`;

export const MouseOnly = styled.span`
  @media (hover: none) {
    display: none;
  }
`;

export const Paper = styled.div`
  background: ${palette.paper};
  border: 1px solid #ead9b6;
  border-radius: 16px;
  box-shadow: 0 12px 24px -16px rgba(60, 30, 10, 0.7);
  color: ${palette.text};
  display: grid;
  gap: 12px;
  padding: 14px;

  form {
    margin-top: 0;
  }

  h3 {
    color: ${palette.text};
    font-size: 14px;
    font-weight: 700;
    margin: 0;
  }
`;

export const Quantity = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const QuickPick = styled.button<{$active: boolean}>`
  background: ${({$active}) => ($active ? '#f2f8ef' : palette.white)};
  border: 1px solid ${({$active}) => ($active ? palette.moss : palette.line)};
  border-radius: 999px;
  color: ${({$active}) => ($active ? palette.text : palette.muted)};
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  min-height: 34px;
  padding: 4px 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.12s ease;

  &:hover:enabled {
    border-color: ${palette.moss};
    transform: translateY(-1px);
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${still};
`;

export const QuickPicks = styled.div`
  display: flex;
  gap: 6px;
`;

export const Recipients = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Roof = styled.div`
  height: 76px;
  position: relative;
  z-index: 1;

  > svg {
    display: block;
    filter: drop-shadow(0 7px 6px rgba(40, 26, 12, 0.4));
    height: 100%;
    width: 100%;
  }
`;

export const RoofEmblem = styled.span`
  align-items: center;
  background: ${CREAM};
  border: 3px solid ${ROOF_DARK};
  border-radius: 50%;
  bottom: 10px;
  box-shadow: 0 3px 6px -2px rgba(13, 31, 26, 0.5);
  display: inline-flex;
  height: 42px;
  justify-content: center;
  left: 50%;
  overflow: hidden;
  position: absolute;
  translate: -50% 0;
  width: 42px;
`;

export const SectionLabel = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  padding: 0 4px;

  h2 {
    color: ${palette.text};
    font-family: ${fonts.display};
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0;
  }

  p {
    color: ${palette.muted};
    font-size: 13.5px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const Slot = styled.button<{$fresh?: boolean; $held: boolean; $kind: Place; $selected?: boolean}>`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  background: none;
  border: 0;
  color: inherit;
  cursor: ${({$held}) => ($held ? 'pointer' : 'default')};
  display: flex;
  flex-direction: column;
  font: inherit;
  gap: 5px;
  min-width: 0;
  padding: 0;
  position: relative;
  text-align: center;
  user-select: none;

  &:focus-visible {
    outline: none;
  }

  &:focus-visible > span:first-of-type {
    box-shadow: ${shadows.focus};
  }

  ${({$fresh}) =>
    $fresh &&
    css`
      animation: ${arrive} 0.45s ${easing.spring} both;
      animation-delay: calc(var(--order, 0) * 28ms + 120ms);
    `}

  ${({$held, $selected}) =>
    $held &&
    !$selected &&
    css`
      button&:hover > span:first-of-type {
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.9),
          0 12px 16px -8px rgba(60, 30, 10, 0.6);
        transform: translateY(-3px);
      }

      button&:hover svg {
        transform: scale(1.1) rotate(-5deg);
      }

      button&:active > span:first-of-type {
        transform: translateY(-1px) scale(0.97);
      }
    `}

  ${still};
`;

export const SlotCount = styled.span<{$long?: boolean}>`
  color: ${palette.text};
  font-feature-settings: 'tnum';
  font-size: ${({$long}) => ($long ? '11px' : '14px')};
  font-weight: 750;
  letter-spacing: -0.01em;
  line-height: 1.15;
`;

export const SlotIcon = styled.span<{$bump?: boolean}>`
  display: block;

  ${({$bump}) =>
    $bump &&
    css`
      animation: ${bump} 0.55s ${easing.out} both;
    `}

  svg {
    transition: transform 0.2s ${easing.spring};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    svg {
      transition: none;
    }
  }
`;

export const SlotName = styled.span<{$held: boolean; $kind: Place}>`
  color: ${({$kind}) => ($kind === 'pack' ? '#6f4f33' : '#ecd9b6')};
  font-size: 10.5px;
  font-weight: 650;
  line-height: 1.2;
  min-height: 2.4em;
  opacity: ${({$held}) => ($held ? 1 : 0.62)};
  overflow-wrap: anywhere;
`;

export const SlotTile = styled.span<{$held: boolean; $kind: Place; $selected?: boolean; $twin?: boolean}>`
  align-items: center;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  justify-content: center;
  min-height: 70px;
  padding: 8px 4px 6px;
  position: relative;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ${easing.out};
  width: 100%;

  ${({$held, $kind}) =>
    $held
      ? css`
          background: linear-gradient(180deg, #fffdf7 0%, #fbf1dc 100%);
          border: 1px solid ${$kind === 'pack' ? '#e3cda3' : '#c99e62'};
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 4px 7px -4px rgba(60, 30, 10, 0.55);
        `
      : css`
          border: 1.5px dashed ${$kind === 'pack' ? 'rgba(143, 87, 48, 0.3)' : 'rgba(236, 217, 182, 0.24)'};

          svg {
            filter: grayscale(1) ${$kind === 'pack' ? '' : 'brightness(1.5)'};
            opacity: ${$kind === 'pack' ? 0.3 : 0.26};
          }
        `}

  ${({$selected}) =>
    $selected &&
    css`
      border-color: ${palette.gold};
      box-shadow:
        ${shadows.glow},
        0 14px 18px -10px rgba(60, 30, 10, 0.6);
      transform: translateY(-4px);
    `}

  ${({$twin}) =>
    $twin &&
    css`
      animation: ${beckon} 1.3s ease-out infinite;
      border-color: ${palette.goldBright};
      border-style: dashed;
    `}

  ${still};
`;

export const Slots = styled.div`
  display: grid;
  gap: 8px 4px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @container (min-width: 430px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

export const Stepper = styled.div`
  align-items: stretch;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: ${palette.gold};
    box-shadow: ${shadows.focus};
  }

  button {
    align-items: center;
    background: #f6f1e4;
    border: 0;
    color: ${palette.text};
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    transition: background 0.15s ease;
    width: 38px;
  }

  button:hover:enabled {
    background: #ece4cf;
  }

  button:disabled {
    color: ${palette.faint};
    cursor: not-allowed;
  }

  input {
    -moz-appearance: textfield;
    background: none;
    border: 0;
    color: ${palette.text};
    font: inherit;
    font-feature-settings: 'tnum';
    font-size: 15px;
    font-weight: 700;
    min-height: 40px;
    min-width: 0;
    outline: none;
    padding: 0 4px;
    text-align: center;
    width: 84px;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Storage = styled.div<{$carrying?: boolean}>`
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  position: relative;

  ${({$carrying}) =>
    $carrying &&
    css`
      cursor: grabbing;
      user-select: none;

      * {
        cursor: grabbing !important;
      }
    `}
`;

export const StoreIcon = styled.span`
  align-items: center;
  background: rgba(255, 244, 222, 0.12);
  border: 1px solid rgba(255, 244, 222, 0.2);
  border-radius: 16px;
  display: inline-flex;
  flex-shrink: 0;
  height: 56px;
  justify-content: center;
  width: 56px;

  @container (max-width: 420px) {
    border-radius: 14px;
    height: 46px;
    width: 46px;

    svg {
      height: 34px;
      width: 34px;
    }
  }
`;

export const StoreName = styled.div`
  flex: 1;
  min-width: 0;

  h2 {
    color: ${CREAM};
    font-family: ${fonts.display};
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
  }

  p {
    align-items: center;
    color: rgba(255, 244, 222, 0.78);
    display: flex;
    flex-wrap: wrap;
    font-size: 12.5px;
    font-weight: 500;
    gap: 3px 6px;
    line-height: 1.4;
    margin: 3px 0 0;
  }

  @container (max-width: 420px) {
    h2 {
      font-size: 21px;
    }
  }
`;

export const Stores = styled.div`
  align-items: stretch;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 58px minmax(0, 1fr);

  @container (max-width: ${STACKED}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Tally = styled.div`
  flex-shrink: 0;
  text-align: right;

  strong {
    color: ${palette.white};
    display: block;
    font-feature-settings: 'tnum';
    font-size: 26px;
    font-weight: 750;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }

  small {
    color: ${palette.goldBright};
    font-size: 10.5px;
    font-weight: 750;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @container (max-width: 420px) {
    strong {
      font-size: 22px;
    }
  }
`;

export const Timber = styled.section<{$over?: boolean; $target?: boolean}>`
  animation: ${fadeUp} 0.5s ${easing.out} 0.08s both;
  border-radius: 22px 22px 16px 16px;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
  transition:
    outline-color 0.2s ease,
    transform 0.2s ${easing.out};

  ${targeted};
  ${still};
`;

export const TimberBody = styled.div<{$roofless?: boolean}>`
  background: repeating-linear-gradient(90deg, ${PLANK} 0 38px, ${PLANK_SEAM} 38px 40px);
  border: 5px solid ${art.woodDark};
  border-bottom: 11px solid ${art.stoneDark};
  border-radius: 0 0 16px 16px;
  border-top: 0;
  box-shadow:
    inset 0 12px 14px -10px rgba(40, 22, 8, 0.55),
    0 24px 44px -26px rgba(74, 48, 22, 0.85);
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  margin: ${({$roofless}) => ($roofless ? 0 : '0 8px')};
  padding: 14px 10px 16px;
`;

export const Tray = styled.div<{$open: boolean}>`
  display: grid;
  grid-template-rows: ${({$open}) => ($open ? '1fr' : '0fr')};
  opacity: ${({$open}) => ($open ? 1 : 0)};
  scroll-margin: 90px 0 96px;
  transition:
    grid-template-rows 0.34s ${easing.out},
    opacity 0.25s ease;

  > div {
    min-height: 0;
    overflow: hidden;
  }

  ${still};
`;

export const TrayClose = styled.button`
  align-items: center;
  background: none;
  border: 0;
  border-radius: 8px;
  color: ${palette.faint};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 30px;
  justify-content: center;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  width: 30px;

  &:hover {
    background: #f1ede2;
    color: ${palette.text};
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const TrayHead = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;

  > span {
    align-items: center;
    animation: ${pop} 0.4s ${easing.spring} both;
    background: ${palette.goldWash};
    border: 1px solid #efdcae;
    border-radius: 14px;
    display: inline-flex;
    flex-shrink: 0;
    height: 52px;
    justify-content: center;
    width: 52px;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  strong {
    color: ${palette.text};
    display: block;
    font-size: 15.5px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  small {
    color: ${palette.muted};
    display: block;
    font-size: 12.5px;
    line-height: 1.5;
  }

  em {
    color: ${palette.faint};
    display: block;
    font-size: 12px;
    font-style: normal;
    line-height: 1.5;
    margin-top: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    > span {
      animation: none;
    }
  }
`;

export const TrayHint = styled.p`
  align-items: center;
  color: rgba(255, 244, 222, 0.9);
  display: flex;
  font-size: 12.5px;
  font-weight: 500;
  gap: 8px;
  line-height: 1.5;
  margin: 2px 4px 0;
  text-shadow: 0 1px 1px rgba(40, 22, 8, 0.45);

  svg {
    flex-shrink: 0;
    opacity: 0.9;
  }
`;

export const WalletLink = styled.span`
  margin: 0 4px;

  a {
    color: ${CREAM};
    text-shadow: 0 1px 1px rgba(40, 22, 8, 0.45);
  }

  a:hover {
    color: ${palette.white};
  }
`;

export const roofColors = {dark: ROOF_DARK, light: '#6d8a99', main: ROOF};
