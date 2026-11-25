import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import {pagePadding} from 'styles';

// The palette of a classic Jacks or Better cabinet: a royal blue screen, yellow pay table and a red bet column.
const SCREEN_BLUE = '#0f24a8';
const TABLE_NAVY = '#050b45';
const YELLOW = '#ffe94a';
const RED = '#d0021b';
const ARCADE_FONT = "'Arial Black', 'Arial Bold', Impact, 'Helvetica Neue', Arial, sans-serif";

const blink = keyframes`
  0%, 49% { opacity: 0.25; }
  50%, 100% { opacity: 1; }
`;
const flip = keyframes`
  from { transform: rotateY(90deg); }
  to { transform: rotateY(0); }
`;
const flash = keyframes`
  0%, 49% { background: #ffffff; }
  50%, 100% { background: ${YELLOW}; }
`;
// A win flashes for a few seconds, then stays lit: nothing on the page blinks forever.
const winLit = css`
  animation: ${flash} 0.5s steps(1) 8;
  background: ${YELLOW};
  color: #14143a;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Page chrome */

export const Container = styled.div`
  ${pagePadding};
  background: #f4f5f9;
  color: #1c2340;
  min-height: 100%;
  padding-bottom: 48px;
  padding-top: 24px;
`;
export const Content = styled.div`
  margin: auto;
  max-width: 1320px;
`;
export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;
export const TextLink = styled(Link)`
  color: #4a5584;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: #17226b;
    text-decoration: underline;
  }
`;
export const Badge = styled.span`
  background: #e8ebf8;
  border: 1px solid #d3d9f0;
  border-radius: 30px;
  color: #33407d;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 8px 12px;
`;
export const Header = styled.header`
  padding: 26px 0;

  h1 {
    font-size: clamp(36px, 4.5vw, 54px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0;
  }
  p:last-child {
    color: #5d678c;
    font-size: 14px;
    line-height: 1.7;
    margin: 8px 0 0;
  }
`;
export const Eyebrow = styled.p`
  color: #3f4fa3;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin: 0 0 10px;
  text-transform: uppercase;
`;
export const Layout = styled.div`
  align-items: start;
  display: grid;
  gap: 22px;
  grid-template-columns: minmax(0, 1.85fr) minmax(280px, 1fr);
  margin-bottom: 22px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #dfe3f0;
  border-radius: 18px;
  min-width: 0;
  padding: 24px;

  @media (max-width: 540px) {
    padding: 20px;
  }
`;
export const Heading = styled.h2`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
export const Note = styled.p`
  color: #5d678c;
  font-size: 12px;
  line-height: 1.7;
  margin: 12px 0;
`;
export const Rules = styled.div`
  display: grid;
  gap: 18px;

  h3 {
    font-size: 14px;
    margin: 0;
  }
  p {
    color: #5d678c;
    font-size: 12px;
    line-height: 1.8;
    margin: 6px 0 0;
  }
  kbd {
    background: #eef0f8;
    border: 1px solid #d3d9f0;
    border-radius: 4px;
    font: inherit;
    font-weight: 700;
    padding: 0 5px;
  }
`;
export const Facts = styled.dl`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 20px 0;

  dt {
    color: #6b7494;
    font-size: 11px;
    margin-bottom: 6px;
  }
  dd {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    overflow-wrap: anywhere;
  }
`;
export const History = styled.div`
  display: grid;
  gap: 6px;
`;
export const HistoryButton = styled.button<{$selected: boolean}>`
  align-items: center;
  background: ${({$selected}) => ($selected ? '#e8ebf8' : '#f6f7fb')};
  border: 1px solid ${({$selected}) => ($selected ? '#b9c2ea' : 'transparent')};
  border-radius: 8px;
  color: #1c2340;
  cursor: pointer;
  display: grid;
  font: inherit;
  font-size: 12px;
  gap: 4px 12px;
  grid-template-columns: minmax(0, 1fr) auto;
  padding: 10px 12px;
  text-align: left;

  span {
    color: #5d678c;
  }
  &:focus-visible {
    outline: 3px solid #3f4fa3;
  }
`;
export const MiniHand = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  gap: 6px;
`;
export const MiniCard = styled.span<{$kept?: boolean; $red: boolean}>`
  && {
    color: ${({$red}) => ($red ? '#c2182b' : '#1c2340')};
  }
  border-bottom: 2px solid ${({$kept}) => ($kept ? '#e0b400' : 'transparent')};
`;
export const Net = styled.strong<{$won: boolean}>`
  color: ${({$won}) => ($won ? '#16794a' : '#1c2340')};
  grid-row: span 2;
`;
export const Button = styled.button`
  background: #f6f7fb;
  border: 1px solid #d3d9f0;
  border-radius: 10px;
  color: #17226b;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  min-height: 44px;
  padding: 10px 16px;

  &:hover:not(:disabled) {
    background: #e8ebf8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  &:focus-visible {
    outline: 3px solid #3f4fa3;
    outline-offset: 3px;
  }
`;
export const Status = styled.p`
  color: #16794a;
  font-size: 12px;
  line-height: 1.6;
  margin: 14px 0;
`;
export const Error = styled.p`
  background: #fdf0ef;
  border: 1px solid #f3cfcb;
  border-radius: 9px;
  color: #9a2a20;
  font-size: 13px;
  line-height: 1.6;
  margin: 14px 0;
  padding: 12px;
`;
export const Raw = styled.pre`
  background: #f6f7fb;
  border-radius: 8px;
  font-size: 11px;
  max-height: 280px;
  overflow: auto;
  padding: 12px;
`;

/* The machine */

export const Cabinet = styled.section`
  background: linear-gradient(180deg, #2b2d3a 0, #171820 38%, #0e0f15 100%);
  border: 1px solid #05060a;
  border-radius: 22px;
  box-shadow:
    inset 0 1px 0 #6a6e82,
    inset 0 0 0 3px #1f212c,
    0 18px 40px #10143a33;
  color: #ffffff;
  font-family: ${ARCADE_FONT};
  min-width: 0;
  padding: clamp(10px, 2vw, 18px);
`;
export const Marquee = styled.div`
  align-items: center;
  background: linear-gradient(180deg, #ff4a3d 0, ${RED} 55%, #8f0012 100%);
  border: 2px solid #ffd84a;
  border-radius: 12px;
  box-shadow:
    inset 0 0 18px #ffb4a366,
    0 0 18px #ff2a1f55;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: clamp(10px, 2vw, 16px);
  padding: 10px 14px;
`;
export const MarqueeTitle = styled.div`
  color: ${YELLOW};
  font-size: clamp(17px, 3.4vw, 30px);
  letter-spacing: 0.04em;
  line-height: 1.05;
  text-shadow:
    0 2px 0 #6b0010,
    0 0 12px #fff2a366;
  text-transform: uppercase;

  small {
    color: #ffffff;
    display: block;
    font-family: Arial, sans-serif;
    font-size: clamp(9px, 1.3vw, 11px);
    font-weight: 700;
    letter-spacing: 0.2em;
    margin-top: 4px;
    text-shadow: none;
  }
`;
export const SoundButton = styled.button`
  align-items: center;
  background: #5c000c;
  border: 1px solid #ffd84a;
  border-radius: 50%;
  color: ${YELLOW};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  width: 40px;

  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 2px;
  }
`;
export const Screen = styled.div`
  background: radial-gradient(ellipse at 50% 28%, #2a45e2 0, ${SCREEN_BLUE} 55%, #081470 100%);
  border: 3px solid #05060a;
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 2px #3a4bd0,
    inset 0 0 50px #02093fcc;
  container-type: inline-size;
  overflow: hidden;
  padding: clamp(8px, 1.8vw, 16px);
  position: relative;

  /* Faint scan lines, like the tube these machines were built around */
  &::after {
    background: repeating-linear-gradient(180deg, #ffffff08 0 1px, transparent 1px 3px);
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
  }
`;
export const PayTable = styled.table`
  background: ${TABLE_NAVY};
  border: 2px solid ${YELLOW};
  border-collapse: separate;
  border-spacing: 0;
  color: ${YELLOW};
  font-size: clamp(9px, 2.2cqw, 16px);
  letter-spacing: 0.02em;
  line-height: 1.25;
  table-layout: fixed;
  text-transform: uppercase;
  width: 100%;

  caption {
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }
  th,
  td {
    font-weight: 900;
    padding: clamp(1px, 0.5cqw, 4px) clamp(3px, 1cqw, 10px);
    white-space: nowrap;
  }
  th[scope='row'] {
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
  }
  td,
  thead th {
    border-left: 1px solid #f7d51d66;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  thead th {
    border-bottom: 1px solid #f7d51d66;
    color: #ffffff;
    font-family: Arial, sans-serif;
    font-size: 0.72em;
    letter-spacing: 0.08em;
  }
  /* With a fixed layout the first row sets the column widths: the hand names get the room they need */
  thead th:first-child {
    border-left: 0;
    text-align: left;
    width: 44%;
  }
`;
export const PayCell = styled.td<{$active: boolean; $win: boolean}>`
  ${({$active}) =>
    $active &&
    css`
      background: ${RED};
      color: #ffffff;
    `}
  ${({$win}) => $win && winLit}
`;
export const PayColumn = styled.th<{$active: boolean}>`
  && {
    ${({$active}) =>
      $active &&
      css`
        background: ${RED};
        color: #ffffff;
      `}
  }
`;
export const PayName = styled.th<{$lit: boolean; $win: boolean}>`
  ${({$lit}) =>
    $lit &&
    css`
      color: #ffffff;
    `}
  ${({$win}) => $win && winLit}
`;
export const Message = styled.div<{$blink?: boolean; $tone: 'info' | 'lose' | 'win'}>`
  align-items: center;
  color: ${({$tone}) => ({info: '#ffffff', lose: '#ff8f85', win: YELLOW})[$tone]};
  display: flex;
  flex-direction: column;
  font-size: clamp(13px, 3.6cqw, 28px);
  justify-content: center;
  letter-spacing: 0.06em;
  line-height: 1.1;
  min-height: clamp(44px, 9cqw, 70px);
  padding: clamp(6px, 1.4cqw, 12px) 0 clamp(2px, 0.6cqw, 6px);
  text-align: center;
  text-shadow: 0 2px 0 #020a52;
  text-transform: uppercase;

  strong {
    font-weight: 900;
    ${({$blink}) =>
      $blink &&
      css`
        animation: ${blink} 0.9s steps(1) 5;

        @media (prefers-reduced-motion: reduce) {
          animation: none;
        }
      `}
  }
  small {
    color: #c9d2ff;
    display: block;
    font-family: Arial, sans-serif;
    font-size: clamp(10px, 1.7cqw, 12px);
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-top: 5px;
    text-shadow: none;
  }
`;
export const Cards = styled.div`
  display: grid;
  gap: clamp(4px, 1.4cqw, 12px);
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;
export const CardSlot = styled.button`
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: grid;
  font: inherit;
  gap: clamp(2px, 0.6cqw, 5px);
  min-width: 0;
  padding: 0;
  perspective: 600px;

  &:disabled {
    cursor: default;
  }
  &:focus-visible {
    outline: 3px solid ${YELLOW};
    outline-offset: 3px;
  }
`;
export const HeldTag = styled.span<{$visible: boolean}>`
  color: ${YELLOW};
  font-size: clamp(10px, 2.7cqw, 20px);
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-shadow: 0 2px 0 #020a52;
  text-transform: uppercase;
  visibility: ${({$visible}) => ($visible ? 'visible' : 'hidden')};
`;
export const Card = styled.span<{$back: boolean; $dim: boolean; $held: boolean; $red: boolean}>`
  animation: ${flip} 170ms ease-out both;
  aspect-ratio: 5 / 7;
  background: ${({$back}) =>
    $back
      ? `repeating-linear-gradient(45deg, #14309c 0 6px, #2f55d6 6px 8px),
         repeating-linear-gradient(-45deg, #14309c 0 6px, #2f55d6 6px 8px)`
      : 'linear-gradient(160deg, #ffffff 0, #f1f1ec 100%)'};
  background-blend-mode: ${({$back}) => ($back ? 'screen' : 'normal')};
  border: clamp(2px, 0.5cqw, 4px) solid ${({$back}) => ($back ? '#e9ecff' : '#ffffff')};
  border-radius: clamp(5px, 1.3cqw, 11px);
  box-shadow: ${({$held}) =>
    $held ? `0 0 0 clamp(2px, 0.5cqw, 4px) ${YELLOW}, 0 6px 14px #01083c99` : '0 6px 14px #01083c99'};
  color: ${({$red}) => ($red ? '#d3142b' : '#101223')};
  display: block;
  filter: ${({$dim}) => ($dim ? 'brightness(0.72)' : 'none')};
  font-family: Georgia, 'Times New Roman', serif;
  overflow: hidden;
  position: relative;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
export const CardIndex = styled.span`
  display: grid;
  font-size: clamp(13px, 4.6cqw, 36px);
  font-weight: 700;
  justify-items: center;
  left: 6%;
  letter-spacing: -0.06em;
  line-height: 0.95;
  position: absolute;
  top: 4%;

  span {
    font-size: 0.8em;
  }
`;
export const CardFigure = styled.span<{$face: boolean}>`
  align-items: center;
  bottom: 7%;
  display: flex;
  font-size: ${({$face}) => ($face ? 'clamp(20px, 7cqw, 56px)' : 'clamp(26px, 9.5cqw, 76px)')};
  justify-content: center;
  line-height: 1;
  position: absolute;
  right: 7%;

  ${({$face}) =>
    $face &&
    css`
      border: 2px solid currentColor;
      border-radius: 6px;
      font-weight: 700;
      gap: 0.08em;
      padding: 0.12em 0.16em;
    `}
`;
export const Meters = styled.dl`
  align-items: end;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr auto 1fr;
  margin: clamp(8px, 1.8cqw, 14px) 0 0;
  text-shadow: 0 2px 0 #020a52;

  div:nth-child(2) {
    text-align: center;
  }
  div:last-child {
    text-align: right;
  }
  dt {
    color: ${YELLOW};
    display: inline;
    font-size: clamp(11px, 2.9cqw, 22px);
    letter-spacing: 0.05em;
    margin-right: 0.4em;
    text-transform: uppercase;
  }
  dd {
    color: #ffffff;
    display: inline;
    font-size: clamp(13px, 3.4cqw, 26px);
    font-variant-numeric: tabular-nums;
    margin: 0;
  }
`;
export const Deck = styled.div`
  background: linear-gradient(180deg, #30323f 0, #1b1c25 100%);
  border: 1px solid #05060a;
  border-radius: 14px;
  box-shadow: inset 0 1px 0 #5a5e72;
  margin-top: clamp(10px, 2vw, 16px);
  padding: clamp(8px, 1.8vw, 14px);
`;
export const HoldRow = styled.div`
  display: grid;
  gap: clamp(4px, 1.4vw, 12px);
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-bottom: clamp(8px, 1.6vw, 12px);
`;
export const Key = styled.button<{$lit?: boolean; $tone?: 'bet' | 'deal' | 'hold'}>`
  background: ${({$lit, $tone}) => {
    if ($tone === 'deal') return 'linear-gradient(180deg, #fff27a 0, #ffc400 100%)';
    if ($lit) return 'linear-gradient(180deg, #fff7b0 0, #ffd21f 100%)';
    return 'linear-gradient(180deg, #fdfdf6 0, #d9d9cc 100%)';
  }};
  border: 1px solid #05060a;
  border-radius: 9px;
  box-shadow: ${({$lit, $tone}) =>
    $lit || $tone === 'deal'
      ? 'inset 0 -3px 0 #b98a00, 0 3px 0 #05060a, 0 0 14px #ffd21f88'
      : 'inset 0 -3px 0 #a6a698, 0 3px 0 #05060a'};
  color: ${({$tone}) => ($tone === 'bet' ? '#a80013' : '#14143a')};
  cursor: pointer;
  font: inherit;
  font-size: clamp(10px, 1.7vw, 14px);
  letter-spacing: 0.03em;
  line-height: 1.1;
  min-height: 46px;
  min-width: 0;
  padding: 6px 4px;
  text-transform: uppercase;

  small {
    display: block;
    font-family: Arial, sans-serif;
    font-size: 0.78em;
    font-weight: 700;
    letter-spacing: 0.02em;
    margin-top: 2px;
    text-transform: none;
  }
  &:active:not(:disabled) {
    box-shadow: inset 0 -1px 0 #a6a698;
    transform: translateY(2px);
  }
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.5) brightness(0.62);
  }
  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 2px;
  }
`;
export const BetRow = styled.div`
  display: grid;
  gap: clamp(4px, 1.4vw, 12px);
  grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.6fr);

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    button:last-child {
      grid-column: 1 / -1;
      min-height: 52px;
    }
  }
`;
export const Service = styled.div`
  color: #d6d9ea;
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 1.7;
  margin-top: clamp(8px, 1.6vw, 12px);
  text-align: center;

  p {
    margin: 4px 0;
  }
  a {
    color: ${YELLOW};
    font-weight: 700;
  }
  [role='alert'] {
    color: #ffb0a8;
  }
`;
export const ServiceActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin: 8px 0;

  button {
    min-width: 170px;
  }
`;
