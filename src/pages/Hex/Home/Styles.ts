import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import UUserSearchInput from 'components/UserSearchInput';
import {fonts} from 'styles';
import {HexSide} from 'types/hex';

import URules from '../Rules';
import {boardPanel, glassStone, hex, HEXAGON, label, sideAccent} from '../theme';

export {Badge, Container, Navigation, TextLink} from '../Styles';

export type MatchTone = 'active' | 'closed' | 'incoming' | 'lost' | 'waiting' | 'won';

const TONES: Record<MatchTone, string> = {
  active: hex.cobaltLight,
  closed: '#5f6b94',
  incoming: hex.gold,
  lost: hex.rubyLight,
  waiting: hex.haze,
  won: hex.gold,
};

const LEGEND_COLOR = '#a9b4d8';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

// Native radios stay focusable and clickable through their label, but the styled sibling is what players see
const hiddenRadio = css`
  input {
    height: 1px;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 1px;
  }
`;

const fieldControl = css`
  background: #0b142cb3;
  border: 1px solid ${hex.line};
  border-radius: 12px;
  color: ${hex.ice};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: ${hex.lineBright};
  }

  &:focus {
    border-color: var(--accent-strong);
    box-shadow: 0 0 0 3px var(--accent-soft);
    outline: none;
  }
`;

// A card for one choice. An empty spot in its corner takes a stone of the panel's color once it is picked.
const choiceCard = css`
  background: #0b142cb3;
  border: 1px solid ${hex.line};
  border-radius: 14px;
  position: relative;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  strong {
    color: ${hex.ice};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
  }

  small {
    color: ${hex.mist};
    font-size: 12px;
    line-height: 1.45;
    text-wrap: balance;
  }

  &::after {
    border: 1.5px dashed #46598f;
    border-radius: 50%;
    content: '';
    height: 12px;
    position: absolute;
    right: 11px;
    top: 11px;
    transition: transform 0.15s ease;
    width: 12px;
  }

  label:hover > & {
    border-color: ${hex.lineBright};
  }

  input:checked + & {
    background: linear-gradient(180deg, var(--accent-soft), #0b142c66);
    border-color: var(--accent-strong);
    box-shadow:
      inset 0 0 0 1px var(--accent-strong),
      0 0 24px var(--accent-glow);
  }

  input:checked + &::after {
    ${glassStone};
    border: 0;
    height: 14px;
    right: 10px;
    top: 10px;
    width: 14px;
  }

  input:focus-visible + & {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const Alert = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #3a1517, #161a33);
  border: 1px solid #e0483c66;
  border-radius: 14px;
  color: #ffd9d3;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 20px 0;
  padding: 14px 18px;
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: ${hex.lineBright};
    color: ${hex.ice};
  }

  button:first-child:hover {
    background: #ffffff14;
  }

  button:last-child,
  button:last-child:hover {
    background: linear-gradient(180deg, var(--button-top), var(--button-bottom));
    box-shadow: 0 3px 0 var(--accent-deep);
  }

  button:last-child:hover {
    filter: brightness(1.06);
  }
`;

export const Choice = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};
`;

// The difficulty card: its chain of cells turns to porcelain and its stones to glass once it is picked
export const ChoiceCard = styled.span`
  ${choiceCard};
  --chain-cell: #17244a;
  --chain-edge: #34467a;
  --chain-stone: #66739e;
  align-content: start;
  display: grid;
  gap: 4px;
  grid-template-areas:
    'chain'
    'name'
    'note';
  padding: 14px;

  svg {
    grid-area: chain;
  }

  strong {
    grid-area: name;
    margin-top: 10px;
  }

  small {
    grid-area: note;
  }

  label:hover > & {
    --chain-stone: #8592bd;
  }

  input:checked + & {
    --chain-cell: ${hex.porcelain};
    --chain-edge: ${hex.groove};
    --chain-stone: var(--accent-strong);
  }

  @container hex-form (max-width: 400px) {
    align-items: center;
    column-gap: 14px;
    grid-template-areas:
      'chain name'
      'chain note';
    grid-template-columns: auto minmax(0, 1fr);
    padding-right: 34px;

    strong {
      margin-top: 0;
    }
  }
`;

export const ChoiceGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @container hex-form (max-width: 400px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Clear = styled.div`
  ${boardPanel};
  align-items: center;
  display: flex;
  gap: 22px;
  margin-top: 24px;
  padding: 24px 28px;

  @media (max-width: 600px) {
    gap: 16px;
    padding: 22px 20px;
  }
`;

export const ClearBoard = styled.div`
  flex-shrink: 0;
  width: 92px;

  @media (max-width: 600px) {
    width: 72px;
  }
`;

export const ClearCopy = styled.div`
  strong {
    color: ${hex.ice};
    display: block;
    font-size: 16px;
    margin-bottom: 4px;
  }

  p {
    color: ${hex.mist};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

// The number of matches in a list, written on a porcelain cell
export const Count = styled.span`
  align-items: center;
  background: ${hex.porcelain};
  clip-path: ${HEXAGON};
  color: #1d2640;
  display: inline-flex;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  height: 28px;
  justify-content: center;
  min-width: 25px;
  padding: 0 4px;
`;

export const Eyebrow = styled.p`
  ${label};
  color: var(--accent);
  margin: 0 0 6px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  ${label};
  color: ${LEGEND_COLOR};
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const Form = styled.form`
  container: hex-form / inline-size;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 22px;
`;

export const GhostButton = styled.button`
  ${label};
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: inherit;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #ffffff14;
  }

  &:focus-visible {
    outline: 2px solid ${hex.gold};
    outline-offset: 3px;
  }
`;

// A raised glass button in the panel's color, pressed down when clicked like the hero's
export const LaunchButton = styled.button`
  align-items: center;
  background: linear-gradient(180deg, var(--button-top), var(--button-bottom));
  border: 0;
  border-radius: 12px;
  box-shadow:
    0 4px 0 var(--accent-deep),
    0 14px 26px var(--accent-glow),
    inset 0 1px 0 #ffffff40;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 10px;
  justify-content: center;
  margin-bottom: 4px;
  min-height: 50px;
  padding: 0 22px;
  text-shadow: 0 1px 1px #00000040;
  transition:
    box-shadow 0.12s ease,
    filter 0.15s ease,
    transform 0.12s ease;
  width: 100%;

  &:hover:not(:disabled) {
    filter: brightness(1.07);
  }

  &:active:not(:disabled) {
    box-shadow:
      0 1px 0 var(--accent-deep),
      0 8px 18px var(--accent-glow),
      inset 0 1px 0 #ffffff40;
    transform: translateY(3px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

export const Lead = styled.p`
  color: ${hex.mist};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  text-wrap: pretty;
`;

export const Legend = styled.legend`
  ${label};
  color: ${LEGEND_COLOR};
  margin-bottom: 10px;
  padding: 0;
`;

export const MatchAction = styled.span<{$tone: MatchTone}>`
  ${label};
  border: 1px solid ${({$tone}) => `${TONES[$tone]}66`};
  border-radius: 999px;
  color: ${({$tone}) => ($tone === 'incoming' ? hex.gold : hex.ice)};
  flex-shrink: 0;
  font-size: 10px;
  padding: 8px 12px;
  white-space: nowrap;
`;

// A small cell lit in the color of the match's state; it blinks while a challenge waits for your answer
export const MatchCell = styled.span<{$tone: MatchTone}>`
  background: ${({$tone}) => TONES[$tone]};
  clip-path: ${HEXAGON};
  flex-shrink: 0;
  height: 16px;
  width: 14px;

  ${({$tone}) =>
    $tone === 'incoming' &&
    css`
      animation: ${blink} 1.6s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

export const MatchInfo = styled.div`
  min-width: 0;
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: #0b142c8c;
  border: 1px solid #26355fb3;
  border-radius: 12px;
  color: ${hex.ice};
  display: grid;
  gap: 10px 16px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 14px 16px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: #ffffff0a;
    border-color: ${hex.lineBright};
    color: ${hex.ice};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${hex.gold};
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    gap: 10px 14px;
    grid-template-columns: auto minmax(0, 1fr);

    ${MatchAction} {
      grid-column: 2;
      justify-self: start;
    }
  }
`;

export const MatchList = styled.section`
  ${boardPanel};
  margin-top: 24px;
  padding: 24px 28px;

  @media (max-width: 600px) {
    padding: 22px 16px;
  }
`;

export const MatchListHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const MatchListTitle = styled.h2`
  color: ${hex.ice};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const MatchMeta = styled.p`
  color: ${hex.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 4px 0 0;
`;

export const MatchRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MemberSearch = styled(UUserSearchInput)`
  > div:first-child {
    ${label};
    color: ${LEGEND_COLOR};
    margin-bottom: 10px;
  }

  input {
    ${fieldControl};
    font-size: 15px;
    height: 48px;
    padding-left: 16px;
  }

  input::placeholder {
    color: ${hex.haze};
  }

  button {
    color: ${hex.mist};
  }

  button:hover {
    color: ${hex.ice};
  }
`;

// The swap rule, marked with the gold of the rivalry emblem's arc
export const Note = styled.p`
  align-items: flex-start;
  background: #0b142c99;
  border: 1px solid ${hex.line};
  border-radius: 12px;
  color: ${hex.mist};
  display: flex;
  font-size: 13px;
  gap: 10px;
  line-height: 1.6;
  margin: 0;
  padding: 12px 14px;

  svg {
    color: ${hex.gold};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

// A player's stone and name, kept together when the line wraps
export const Opponent = styled.span`
  display: inline-block;
  max-width: 100%;
  overflow-wrap: anywhere;
`;

export const Opponents = styled.strong`
  display: block;
  font-size: 15px;
  overflow-wrap: break-word;
`;

export const Panel = styled.section<{$side: HexSide}>`
  ${boardPanel};
  ${({$side}) => sideAccent($side)};
  --panel-glow: ${({$side}) => ($side === 'red' ? '#a640342e' : '#2456b440')};
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 28px;
  scroll-margin-top: 24px;

  /* Above the sections that follow, so the member search results can open over them */
  z-index: 1;

  @media (max-width: 600px) {
    padding: 22px 18px;
  }
`;

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Panels = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Rules = styled(URules)`
  ${boardPanel};
  color: ${hex.mist};
  margin-top: 24px;
  padding: 20px 28px;

  summary {
    align-items: center;
    color: ${hex.ice};
    display: flex;
    gap: 14px;
    list-style: none;
    min-height: 32px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  /* A cell split between the two sides */
  summary::before {
    background: linear-gradient(135deg, ${hex.ruby} 50%, ${hex.cobalt} 50%);
    clip-path: ${HEXAGON};
    content: '';
    flex-shrink: 0;
    height: 26px;
    width: 23px;
  }

  summary::after {
    border-bottom: 2px solid ${hex.mist};
    border-right: 2px solid ${hex.mist};
    content: '';
    height: 8px;
    margin: -4px 4px 0 auto;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
    width: 8px;
  }

  &[open] summary::after {
    margin-top: 4px;
    transform: rotate(-135deg);
  }

  summary:focus-visible {
    border-radius: 6px;
    outline: 2px solid ${hex.gold};
    outline-offset: 4px;
  }

  ol {
    counter-reset: order;
    display: grid;
    gap: 14px;
    list-style: none;
    margin: 20px 0 8px;
    padding: 0;
  }

  li {
    counter-increment: order;
    display: grid;
    gap: 14px;
    grid-template-columns: 32px minmax(0, 1fr);
    margin: 0;
  }

  /* Numbers on cells that take turns between red and blue, as the players do */
  li::before {
    align-items: center;
    background: #e0483c38;
    clip-path: ${HEXAGON};
    color: ${hex.rubyLight};
    content: counter(order);
    display: flex;
    font-size: 12px;
    font-weight: ${fonts.weight.extraBold};
    height: 30px;
    justify-content: center;
    width: 26px;
  }

  li:nth-child(even)::before {
    background: #2f72da3d;
    color: ${hex.cobaltLight};
  }

  @media (max-width: 600px) {
    padding: 18px 20px;
  }
`;

export const Segment = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};

  span {
    ${label};
    align-items: center;
    border-radius: 9px;
    color: ${hex.mist};
    display: flex;
    justify-content: center;
    letter-spacing: 0.06em;
    min-height: 40px;
    transition:
      background 0.15s ease,
      color 0.15s ease;
    white-space: nowrap;
    width: 100%;
  }

  &:hover span {
    background: #ffffff0d;
    color: ${hex.ice};
  }

  input:checked + span {
    background: linear-gradient(180deg, var(--accent-soft), #0b142c33);
    box-shadow: inset 0 0 0 1px var(--accent-strong);
    color: ${hex.ice};
  }

  input:focus-visible + span {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const Segmented = styled.div`
  background: #0b142c99;
  border: 1px solid ${hex.line};
  border-radius: 12px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 4px;
`;

// Fills the room the signed-out challenge panel has left, with the demo game in the middle of it
export const Showcase = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
`;

export const ShowcaseLegend = styled.p`
  color: ${hex.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 6px 18px;
  justify-content: center;
  margin: 0;
`;

// The board-size card: the board itself, dimmed until it is picked
export const SizeCard = styled.span`
  ${choiceCard};
  --board-blue: #33477a;
  --board-cells: #8c94b0;
  --board-grout: ${hex.midnight};
  --board-red: #6c3c47;
  align-content: start;
  display: grid;
  gap: 2px;
  justify-items: center;
  padding: 14px 10px 12px;
  text-align: center;

  strong {
    font-variant-numeric: tabular-nums;
    margin-top: 10px;
    white-space: nowrap;
  }

  label:hover > & {
    --board-cells: #aab1c8;
  }

  input:checked + & {
    --board-blue: #2c6fd6;
    --board-cells: ${hex.porcelain};
    --board-grout: #1d2640;
    --board-red: #d9463c;
  }
`;

export const SizeGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @container hex-form (max-width: 360px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SizePicture = styled.span`
  display: block;
  margin-top: 6px;
  max-width: 92px;
  width: 100%;
`;

export const StakeControl = styled.span`
  display: flex;
  position: relative;
`;

export const StakeInput = styled.input`
  ${fieldControl};
  -moz-appearance: textfield;
  font-family: inherit;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  min-height: 48px;
  padding: 0 64px 0 16px;
  width: 100%;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StakeUnit = styled.span`
  ${label};
  color: var(--accent);
  pointer-events: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

export const Status = styled.div`
  align-items: center;
  background: ${hex.midnight};
  border: 1px solid ${hex.line};
  border-radius: 14px;
  color: ${hex.mist};
  display: flex;
  font-size: 14px;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 20px;
`;

// A glass stone of either side, sized for running text
export const Stone = styled.span<{$side: HexSide}>`
  ${({$side}) => sideAccent($side)};
  ${glassStone};
  display: inline-block;
  flex-shrink: 0;
  height: 10px;
  margin-right: 7px;
  vertical-align: -1px;
  width: 10px;
`;

// The stake terms, set off by the panel's color
export const Terms = styled.p`
  background: linear-gradient(90deg, var(--accent-soft), transparent 85%);
  border-left: 2px solid var(--accent-strong);
  border-radius: 0 10px 10px 0;
  color: ${hex.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
  padding: 12px 14px;
`;

export const Title = styled.h2`
  color: ${hex.ice};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

export const Versus = styled.span`
  color: ${hex.haze};
  font-size: 12px;
  font-weight: ${fonts.weight.regular};
  margin: 0 4px;
`;
