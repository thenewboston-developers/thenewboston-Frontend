import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import UUserSearchInput from 'components/UserSearchInput';
import * as UserSearch from 'components/UserSearchInput/Styles';
import {fonts} from 'styles';

import URules from '../Rules';
import {board, boardPanel, label} from '../theme';

export {Container, Navigation} from '../Styles';

export type MatchTone = 'active' | 'closed' | 'incoming' | 'lost' | 'turn' | 'waiting' | 'won';

const TONES: Record<MatchTone, {accent: string; chip: string; chipText: string; edge: string}> = {
  active: {accent: board.ivory, chip: 'transparent', chipText: board.ivoryLight, edge: '#eeeed266'},
  closed: {accent: board.haze, chip: 'transparent', chipText: board.haze, edge: '#acbea759'},
  incoming: {accent: board.accentLight, chip: board.accent, chipText: board.ink, edge: board.accent},
  lost: {accent: board.haze, chip: 'transparent', chipText: board.haze, edge: '#acbea759'},
  turn: {accent: board.gold, chip: board.gold, chipText: board.ink, edge: board.gold},
  waiting: {accent: board.mist, chip: 'transparent', chipText: board.mist, edge: '#d2ddce59'},
  won: {accent: board.gold, chip: 'transparent', chipText: board.gold, edge: '#f4ce7299'},
};

const fieldControl = css`
  background: #102018cc;
  border: 1px solid ${board.line};
  border-radius: 12px;
  color: ${board.ivoryLight};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: #8ba774;
  }

  &:focus {
    border-color: ${board.gold};
    box-shadow: 0 0 0 3px #f4ce722e;
    outline: none;
  }
`;

const goldFocus = css`
  outline: 2px solid ${board.gold};
  outline-offset: 3px;
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

const ivoryTile = css`
  background: linear-gradient(180deg, ${board.ivoryLight}, ${board.ivory});
  color: ${board.ink};
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 #b8d58c99;
  }

  100% {
    box-shadow: 0 0 0 10px #b8d58c00;
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
  background: #fff1f3;
  border: 1px solid #f3b6c0;
  border-radius: 14px;
  color: #8a1028;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px 16px;
  justify-content: space-between;
  line-height: 1.6;
  margin: 24px 0;
  padding: 14px 18px;
`;

export const AuthButtons = styled(UAuthButtons)`
  button {
    height: 44px;
    padding: 0 20px;
  }

  button:first-child {
    background: transparent;
    border-color: #8ba774;
    color: ${board.ivoryLight};
  }

  button:first-child:hover {
    background: #ffffff14;
  }

  button:last-child {
    background: ${board.accent};
    box-shadow: 0 3px 0 ${board.accentDark};
    color: ${board.ink};
  }

  button:last-child:hover {
    background: #cbe4a5;
  }

  button:focus-visible {
    ${goldFocus};
  }
`;

export const Badge = styled.span`
  align-items: center;
  background: #edf2e5;
  border: 1px solid #cad5bd;
  border-radius: 999px;
  color: #294631;
  display: inline-flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  padding: 6px 12px 6px 8px;

  &::before {
    background: ${board.accent};
    border: 2px solid #91a687;
    border-radius: 50%;
    box-shadow: 0 2px 0 ${board.accentDark};
    content: '';
    height: 12px;
    width: 12px;
  }
`;

export const Boards = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Calm = styled.div`
  ${boardPanel};
  align-items: center;
  display: flex;
  gap: 20px;
  margin-top: 30px;
  padding: 24px 28px;

  @media (max-width: 600px) {
    padding: 22px 20px;
  }
`;

export const CalmCopy = styled.div`
  strong {
    color: ${board.ivoryLight};
    display: block;
    font-size: 16px;
    margin-bottom: 4px;
  }

  p {
    color: ${board.mist};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
`;

export const Choice = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};
`;

// Difficulty pips are checkers: ivory on the dark cards, charcoal once the card is chosen
export const ChoiceCard = styled.span`
  --pip-edge: #b3946a;
  --pip-empty: #637c5e;
  --pip-ring: #e2c9a1;
  --pip-rim: #fffaf0;
  --pip-top: ${board.ivory};
  align-content: start;
  background: #10201880;
  border: 1px solid ${board.line};
  border-radius: 14px;
  display: grid;
  gap: 4px;
  grid-template-areas:
    'pips'
    'name'
    'note';
  padding: 14px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  strong {
    color: ${board.ivoryLight};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
    grid-area: name;
    margin-top: 10px;
  }

  small {
    color: ${board.mist};
    font-size: 12px;
    grid-area: note;
    line-height: 1.45;
    text-wrap: balance;
  }

  label:hover > & {
    border-color: #8ba774;
  }

  input:checked + & {
    --pip-edge: ${board.edge};
    --pip-empty: #c7ad83;
    --pip-ring: #65765a;
    --pip-rim: #91a687;
    --pip-top: ${board.pieceDark};
    ${ivoryTile};
    border-color: ${board.ivoryLight};
    box-shadow:
      0 4px 0 #b3946a,
      0 12px 24px #10201866;

    strong {
      color: ${board.ink};
    }

    small {
      color: #52644e;
    }
  }

  input:focus-visible + & {
    ${goldFocus};
  }

  @container lobby-form (max-width: 380px) {
    align-items: center;
    column-gap: 14px;
    grid-template-areas:
      'pips name'
      'pips note';
    grid-template-columns: auto minmax(0, 1fr);

    strong {
      margin-top: 0;
    }
  }
`;

export const ChoiceGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @container lobby-form (max-width: 380px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Count = styled.span`
  ${label};
  background: #f4ce721f;
  border: 1px solid #f4ce7259;
  border-radius: 999px;
  color: ${board.gold};
  letter-spacing: 0.06em;
  padding: 4px 10px;
`;

export const Eyebrow = styled.p`
  ${label};
  color: ${board.gold};
  margin: 0 0 6px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  ${label};
  color: ${board.mist};
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
  ${label};
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: inherit;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #8a102814;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`;

export const Lead = styled.p`
  color: ${board.mist};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  text-wrap: pretty;
`;

export const Legend = styled.legend`
  ${label};
  color: ${board.mist};
  margin-bottom: 10px;
  padding: 0;
`;

export const Log = styled.section`
  ${boardPanel};
  margin-top: 30px;
  padding: 24px 28px;

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
  color: ${board.ivoryLight};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const MatchAction = styled.span<{$tone: MatchTone}>`
  ${label};
  background: ${({$tone}) => TONES[$tone].chip};
  border: 1px solid ${({$tone}) => TONES[$tone].edge};
  border-radius: 999px;
  color: ${({$tone}) => TONES[$tone].chipText};
  flex-shrink: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  padding: 8px 12px;
  white-space: nowrap;

  ${({$tone}) =>
    $tone === 'incoming' &&
    css`
      animation: ${pulse} 1.8s ease-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

export const MatchInfo = styled.div`
  min-width: 0;
`;

export const MatchLink = styled(Link)<{$tone: MatchTone}>`
  align-items: center;
  background: #1020188c;
  border: 1px solid #49644cb3;
  border-radius: 14px;
  box-shadow: ${({$tone}) =>
    $tone === 'incoming' || $tone === 'turn' ? `inset 3px 0 0 ${TONES[$tone].accent}` : 'none'};
  color: ${board.ivoryLight};
  display: grid;
  gap: 10px 16px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 12px 16px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: #76965638;
    border-color: #8ba774;
    color: ${board.ivoryLight};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${board.gold};
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
  color: ${board.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 4px 0 0;
`;

export const MemberSearch = styled(UUserSearchInput)`
  > div:first-child {
    ${label};
    color: ${board.mist};
    margin-bottom: 10px;
  }

  input {
    ${fieldControl};
    font-size: 15px;
    height: 48px;
    padding-left: 16px;
  }

  input::placeholder {
    color: ${board.haze};
  }

  button {
    color: ${board.mist};
  }

  button:hover {
    color: ${board.ivoryLight};
  }

  /* The results stay the shared light popover */
  ${UserSearch.Dropdown} {
    color-scheme: light;
  }
`;

export const Opponents = styled.strong`
  display: block;
  font-size: 15px;
  overflow-wrap: break-word;

  span {
    color: ${board.haze};
    font-size: 12px;
    font-weight: ${fonts.weight.regular};
    margin: 0 4px;
  }
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

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Pips = styled.span<{$level: number}>`
  align-items: center;
  display: flex;
  gap: 5px;
  grid-area: pips;
  height: 17px;

  i {
    border: 1.5px dashed var(--pip-empty);
    border-radius: 50%;
    display: block;
    height: 14px;
    width: 14px;
  }

  i:nth-child(-n + ${({$level}) => $level}) {
    background: radial-gradient(circle, var(--pip-top) 0 30%, var(--pip-ring) 31% 45%, var(--pip-top) 46%);
    border: 1.5px solid var(--pip-rim);
    box-shadow: 0 2px 0 var(--pip-edge);
  }
`;

export const PlayButton = styled.button`
  align-items: center;
  background: linear-gradient(180deg, #c8e1a4, #b8d58c);
  border: 1px solid #91a687;
  border-radius: 12px;
  box-shadow:
    0 4px 0 ${board.accentDark},
    0 14px 26px #b8d58c30;
  color: ${board.ink};
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  transition:
    box-shadow 0.12s ease,
    filter 0.12s ease,
    transform 0.12s ease;
  width: 100%;

  &:hover:not(:disabled) {
    filter: brightness(1.06);
  }

  &:active:not(:disabled) {
    box-shadow:
      0 1px 0 ${board.accentDark},
      0 6px 14px #b8d58c26;
    transform: translateY(3px);
  }

  &:focus-visible {
    ${goldFocus};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

// The rule numbers are ivory checkers and the summary carries a charcoal one
export const Rules = styled(URules)`
  ${boardPanel};
  color: ${board.mist};
  line-height: 1.7;
  margin-top: 30px;
  padding: 20px 28px;

  summary {
    align-items: center;
    color: ${board.ivoryLight};
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: ${fonts.weight.bold};
    gap: 14px;
    list-style: none;
    min-height: 32px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    background: radial-gradient(circle, ${board.pieceDark} 0 30%, #65765a 31% 46%, ${board.pieceDark} 47%);
    border: 2px solid #91a687;
    border-radius: 50%;
    box-shadow: 0 3px 0 ${board.accentDark};
    content: '';
    flex-shrink: 0;
    height: 22px;
    width: 22px;
  }

  summary::after {
    border-bottom: 2px solid ${board.gold};
    border-right: 2px solid ${board.gold};
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
    outline: 2px solid ${board.gold};
    outline-offset: 4px;
  }

  ol {
    counter-reset: move;
    display: grid;
    gap: 14px;
    list-style: none;
    margin: 20px 0 8px;
    padding: 0;
  }

  li {
    counter-increment: move;
    display: grid;
    gap: 14px;
    grid-template-columns: 28px minmax(0, 1fr);
    margin: 0;
  }

  li::before {
    align-items: center;
    background: radial-gradient(circle, ${board.ivory} 0 52%, #e2c9a1 53% 62%, ${board.ivory} 63%);
    border: 1.5px solid #fffaf0;
    border-radius: 50%;
    box-shadow: 0 3px 0 #b3946a;
    color: ${board.ink};
    content: counter(move);
    display: flex;
    font-size: 11px;
    font-weight: ${fonts.weight.extraBold};
    height: 26px;
    justify-content: center;
    margin-top: 1px;
    width: 26px;
  }

  @media (max-width: 600px) {
    padding: 18px 20px;
  }
`;

export const SceneFrame = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 4px;
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
    color: ${board.mist};
    display: flex;
    font-size: 13px;
    font-weight: ${fonts.weight.bold};
    justify-content: center;
    min-height: 40px;
    transition:
      background 0.15s ease,
      color 0.15s ease;
    white-space: nowrap;
    width: 100%;
  }

  &:hover span {
    background: #ffffff0f;
    color: ${board.ivoryLight};
  }

  input:checked + span {
    ${ivoryTile};
    box-shadow: 0 2px 0 #b3946a;
  }

  input:focus-visible + span {
    outline: 2px solid ${board.gold};
    outline-offset: 2px;
  }
`;

export const Segmented = styled.div`
  background: #102018b3;
  border: 1px solid ${board.line};
  border-radius: 12px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 4px 4px 6px;
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
  color: ${board.gold};
  pointer-events: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

export const Status = styled.div`
  align-items: center;
  background: ${board.forest};
  border: 1px solid ${board.line};
  border-radius: 14px;
  box-shadow: 0 4px 0 ${board.edge};
  color: ${board.mist};
  display: flex;
  font-size: 14px;
  gap: 12px;
  margin-top: 30px;
  padding: 14px 18px;
`;

export const StatusText = styled.span<{$tone: MatchTone}>`
  color: ${({$tone}) =>
    $tone === 'incoming' || $tone === 'turn' || $tone === 'won' ? TONES[$tone].accent : 'inherit'};
  font-weight: ${fonts.weight.semiBold};
`;

export const Terms = styled.p`
  background: linear-gradient(90deg, #f4ce7217, transparent 85%);
  border-left: 2px solid ${board.gold};
  border-radius: 0 10px 10px 0;
  color: ${board.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
  padding: 12px 14px;
`;

export const TextLink = styled(Link)`
  color: #36572c;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Title = styled.h2`
  color: ${board.ivoryLight};
  font-size: 24px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;
