import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import UUserSearchInput from 'components/UserSearchInput';
import {fonts} from 'styles';

import URules from '../Rules';
import {BLACK_DISK, boardPanel, caption, disk, reversi, SPLIT_DISK, WHITE_DISK} from '../theme';

export {Container, Navigation} from '../Styles';

// The selected radio card uses the same mint outline as the board controls.
const choiceCard = css`
  background: ${reversi.ink}cc;
  border: 1px solid ${reversi.edge};
  border-radius: 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  label:hover > & {
    border-color: ${reversi.edgeBright};
  }

  input:checked + & {
    background: linear-gradient(180deg, ${reversi.mint}1f, ${reversi.mint}08);
    border-color: ${reversi.mint};
    box-shadow:
      inset 0 0 0 1px ${reversi.mint},
      0 0 24px ${reversi.mint}1f;
  }

  input:focus-visible + & {
    outline: 2px solid ${reversi.mintLight};
    outline-offset: 3px;
  }
`;

const fieldControl = css`
  background: ${reversi.night}b3;
  border: 1px solid ${reversi.edge};
  border-radius: 12px;
  color: ${reversi.text};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: ${reversi.edgeBright};
  }

  &:focus {
    border-color: ${reversi.mint};
    box-shadow: 0 0 0 3px ${reversi.mint}2e;
    outline: none;
  }
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

const livePulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${reversi.mint}8c; }
  100% { box-shadow: 0 0 0 10px ${reversi.mint}00; }
`;

// The faint inner rim keeps black disks readable on the dark board and disappears on ivory ones
const smallDisk = css`
  border-radius: 50%;
  box-shadow:
    0 1px 2px #00000080,
    inset 0 -1px 2px #00000033,
    inset 0 0 0 1px #ffffff2e;
  flex-shrink: 0;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const Alert = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #3b1a1f, #1c211a);
  border: 1px solid #ff9b8f59;
  border-radius: 14px;
  color: #ffdcd6;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 0 0 20px;
  padding: 14px 18px;
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: ${reversi.edgeBright};
    color: ${reversi.text};
  }

  button:first-child:hover {
    background: #ffffff14;
  }
`;

export const Badge = styled.span`
  align-items: center;
  background: ${reversi.panel};
  border: 1px solid ${reversi.edge};
  border-radius: 999px;
  color: ${reversi.text};
  display: inline-flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  padding: 6px 12px 6px 7px;
`;

export const BadgeDisk = styled.span`
  ${smallDisk};
  background: ${SPLIT_DISK};
  height: 16px;
  width: 16px;
`;

// A pending challenge has no disk count yet: the tile shows a disk waiting to be flipped
export const ChallengeTile = styled.span`
  align-items: center;
  background: ${reversi.night}b3;
  border: 1px solid ${reversi.edge};
  border-radius: 12px;
  display: flex;
  height: 46px;
  justify-content: center;
  width: 64px;

  &::before {
    ${smallDisk};
    background: ${SPLIT_DISK};
    content: '';
    height: 24px;
    width: 24px;
  }
`;

export const Choice = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};
`;

export const ChoiceGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @container lobby-form (max-width: 400px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ChoiceText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  strong {
    color: ${reversi.text};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
  }

  small {
    color: ${reversi.mist};
    font-size: 12px;
    line-height: 1.45;
  }
`;

export const ColorCard = styled.span`
  ${choiceCard};
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;

  @container lobby-form (max-width: 400px) {
    align-items: center;
    flex-direction: row;
    gap: 14px;
    padding: 12px 14px;
  }
`;

export const ColorDisk = styled.span<{$side: 'black' | 'random' | 'white'}>`
  ${smallDisk};
  background: ${({$side}) => disk($side)};
  height: 26px;
  transition: box-shadow 0.15s ease;
  width: 26px;

  input:checked + * > & {
    box-shadow:
      inset 0 0 0 1px #ffffff2e,
      0 0 0 2px ${reversi.panel},
      0 0 0 3.5px ${reversi.mint},
      0 0 14px ${reversi.mint}59;
  }
`;

export const Count = styled.span`
  ${caption};
  background: ${reversi.mint}14;
  border: 1px solid ${reversi.mint}47;
  border-radius: 999px;
  color: ${reversi.mintLight};
  font-size: 10px;
  padding: 3px 10px;
`;

export const DifficultyCard = styled.span`
  ${choiceCard};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;

  @container lobby-form (max-width: 400px) {
    align-items: center;
    flex-direction: row;
    gap: 14px;
    padding: 12px 14px;
  }
`;

export const Empty = styled.div`
  align-items: center;
  background: ${reversi.night}80;
  border: 1px dashed ${reversi.edgeBright};
  border-radius: 14px;
  display: flex;
  gap: 18px;
  padding: 18px 20px;

  p {
    color: ${reversi.mist};
    font-size: 14px;
    line-height: 1.65;
    margin: 0;
  }
`;

export const Eyebrow = styled.p`
  ${caption};
  color: ${reversi.mint};
  margin: 0 0 4px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  ${caption};
  color: ${reversi.mist};
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const Form = styled.form`
  container: lobby-form / inline-size;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 22px;
`;

export const GhostButton = styled.button`
  ${caption};
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
    outline: 2px solid ${reversi.mintLight};
    outline-offset: 3px;
  }
`;

export const Lead = styled.p`
  color: ${reversi.mist};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  text-wrap: pretty;
`;

export const Legend = styled.legend`
  ${caption};
  color: ${reversi.mist};
  margin-bottom: 10px;
  padding: 0;
`;

export const LiveDot = styled.span<{$live: boolean}>`
  background: ${({$live}) => ($live ? reversi.mint : reversi.edgeBright)};
  border-radius: 50%;
  flex-shrink: 0;
  height: 9px;
  width: 9px;

  ${({$live}) =>
    $live &&
    css`
      animation: ${livePulse} 1.8s ease-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

export const Log = styled.section`
  ${boardPanel};
  margin-top: 24px;
  padding: 24px 28px 28px;

  @media (max-width: 600px) {
    padding: 22px 16px;
  }
`;

export const LogHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LogTitle = styled.h2`
  color: ${reversi.text};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const MatchAction = styled.span<{$incoming: boolean}>`
  ${caption};
  background: ${({$incoming}) => ($incoming ? reversi.mint : 'transparent')};
  border: 1px solid ${({$incoming}) => ($incoming ? reversi.mint : `${reversi.mint}4d`)};
  border-radius: 999px;
  color: ${({$incoming}) => ($incoming ? reversi.ink : reversi.text)};
  flex-shrink: 0;
  font-size: 10px;
  padding: 8px 12px;
  white-space: nowrap;
`;

export const MatchInfo = styled.div`
  min-width: 0;
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: ${reversi.night}8c;
  border: 1px solid ${reversi.edge}b3;
  border-radius: 14px;
  color: ${reversi.text};
  display: grid;
  gap: 10px 16px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 12px 16px 12px 12px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${reversi.mintSoft};
    border-color: ${reversi.edgeBright};
    color: ${reversi.text};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${reversi.mintLight};
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

export const MatchMeta = styled.p`
  color: ${reversi.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 4px 0 0;
`;

export const MemberSearch = styled(UUserSearchInput)`
  > div:first-child {
    ${caption};
    color: ${reversi.mist};
    margin-bottom: 10px;
  }

  input {
    ${fieldControl};
    font-size: 15px;
    height: 48px;
    padding-left: 16px;
  }

  input::placeholder {
    color: ${reversi.fog};
  }

  button {
    color: ${reversi.mist};
  }

  button:hover {
    color: ${reversi.text};
  }
`;

export const Opponents = styled.strong`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
  gap: 2px 8px;
`;

export const Panel = styled.section`
  ${boardPanel};
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 28px;
  scroll-margin-top: 24px;

  /* Above the sections that follow, so the member search results can open over them */
  z-index: 1;

  @media (max-width: 600px) {
    padding: 22px 20px;
  }
`;

export const PanelGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

// Three disk pips: the harder the computer, the more of them are ivory
export const Pips = styled.span<{$level: number}>`
  display: flex;
  flex-shrink: 0;
  gap: 4px;

  i {
    border: 1px solid ${reversi.edgeBright};
    border-radius: 50%;
    display: block;
    height: 12px;
    width: 12px;
  }

  i:nth-child(-n + ${({$level}) => $level}) {
    background: ${WHITE_DISK};
    border-color: transparent;
    box-shadow: 0 1px 2px #00000080;
  }

  input:checked + * > & i:nth-child(-n + ${({$level}) => $level}) {
    box-shadow:
      0 1px 2px #00000080,
      0 0 8px ${reversi.mint}8c;
  }
`;

export const PlayButton = styled.button`
  align-items: center;
  background: ${reversi.mint};
  border: 1px solid ${reversi.mintLight};
  border-radius: 12px;
  box-shadow:
    0 12px 28px ${reversi.felt}26,
    inset 0 1px 0 #ffffff80;
  color: ${reversi.ink};
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 10px;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${reversi.mintLight};
    box-shadow:
      0 16px 34px ${reversi.felt}3d,
      inset 0 1px 0 #ffffff80;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${reversi.mint};
    outline-offset: 4px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

export const Rules = styled(URules)`
  ${boardPanel};
  color: ${reversi.mist};
  margin-top: 24px;
  padding: 20px 28px;

  summary {
    align-items: center;
    color: ${reversi.text};
    display: flex;
    gap: 14px;
    list-style: none;
    min-height: 32px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    ${smallDisk};
    background: ${SPLIT_DISK};
    content: '';
    height: 22px;
    width: 22px;
  }

  summary::after {
    border-bottom: 2px solid ${reversi.mint};
    border-right: 2px solid ${reversi.mint};
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
    outline: 2px solid ${reversi.mintLight};
    outline-offset: 4px;
  }

  strong {
    color: ${reversi.text};
  }

  ol {
    counter-reset: order;
    display: grid;
    gap: 14px;
    list-style: none;
    margin: 20px 0 8px;
    padding: 0;
  }

  /* The steps are numbered on disks that alternate black and ivory, like a row of disks on the board */
  li {
    counter-increment: order;
    display: grid;
    gap: 14px;
    grid-template-columns: 28px minmax(0, 1fr);
    margin: 0;
  }

  li::before {
    ${smallDisk};
    align-items: center;
    background: ${BLACK_DISK};
    color: ${reversi.ivory};
    content: counter(order);
    display: flex;
    font-size: 12px;
    font-weight: ${fonts.weight.bold};
    height: 26px;
    justify-content: center;
    margin-top: 1px;
    width: 26px;
  }

  li:nth-child(even)::before {
    background: ${WHITE_DISK};
    color: #202522;
  }

  @media (max-width: 600px) {
    padding: 18px 20px;
  }
`;

// The disk count of a started match: black's disks on the dark half, white's on the ivory half
export const ScoreTile = styled.span`
  border: 1px solid ${reversi.edge};
  border-radius: 12px;
  box-shadow: 0 6px 14px #00000040;
  display: grid;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  grid-template-columns: 1fr 1fr;
  height: 46px;
  overflow: hidden;
  width: 64px;

  b {
    align-items: center;
    display: flex;
    font-weight: ${fonts.weight.bold};
    justify-content: center;
  }

  b:first-child {
    background: ${BLACK_DISK};
    color: ${reversi.ivory};
  }

  b:last-child {
    background: ${WHITE_DISK};
    color: #202522;
  }
`;

export const Segment = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};

  span {
    align-items: center;
    border-radius: 9px;
    color: ${reversi.mist};
    display: flex;
    font-size: 13px;
    font-weight: ${fonts.weight.semiBold};
    justify-content: center;
    min-height: 40px;
    transition:
      background 0.15s ease,
      color 0.15s ease;
    white-space: nowrap;
    width: 100%;
  }

  &:hover span {
    background: #ffffff0d;
    color: ${reversi.text};
  }

  input:checked + span {
    background: linear-gradient(180deg, ${reversi.mint}29, ${reversi.mint}0f);
    box-shadow: inset 0 0 0 1px ${reversi.mint};
    color: ${reversi.text};
  }

  input:focus-visible + span {
    outline: 2px solid ${reversi.mintLight};
    outline-offset: 2px;
  }
`;

export const Segmented = styled.div`
  background: ${reversi.night}99;
  border: 1px solid ${reversi.edge};
  border-radius: 12px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 4px;
`;

// Each player's disk stays next to their name when the names wrap
export const Side = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 6px;
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const SideDisk = styled.span<{$side: 'black' | 'white'}>`
  ${smallDisk};
  background: ${({$side}) => disk($side)};
  height: 12px;
  width: 12px;
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
  ${caption};
  color: ${reversi.gold};
  pointer-events: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

export const Status = styled.div`
  align-items: center;
  background: ${reversi.panel};
  border: 1px solid ${reversi.edge};
  border-radius: 14px;
  color: ${reversi.mist};
  display: flex;
  font-size: 14px;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 20px;
`;

export const Terms = styled.p`
  background: linear-gradient(90deg, ${reversi.gold}14, transparent 85%);
  border-left: 2px solid ${reversi.gold};
  border-radius: 0 10px 10px 0;
  color: ${reversi.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
  padding: 12px 14px;
`;

export const TextLink = styled(Link)`
  color: ${reversi.feltDark};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};

  &:hover {
    color: ${reversi.ink};
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid ${reversi.feltDark};
    outline-offset: 4px;
  }
`;

export const Title = styled.h2`
  color: ${reversi.text};
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
  color: ${reversi.fog};
  font-size: 12px;
  font-weight: ${fonts.weight.regular};
`;

export const VisuallyHidden = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
