import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UUserSearchInput from 'components/UserSearchInput';
import {fonts} from 'styles';

import {naval, navalConsole, navalMono, readout} from '../theme';

export {
  AuthButtons,
  Badge,
  Calm,
  CalmCopy,
  Container,
  Error,
  GhostButton,
  LaunchButton,
  Navigation,
  TextLink,
} from '../Styles';

export type MatchTone = 'active' | 'closed' | 'incoming' | 'lost' | 'waiting' | 'won';

const TONES: Record<MatchTone, string> = {
  active: naval.sonar,
  closed: naval.fog,
  incoming: naval.amber,
  lost: naval.flare,
  waiting: naval.fog,
  won: naval.kelp,
};

const beaconPulse = keyframes`
  0% { box-shadow: 0 0 0 0 #ffad6a8c; }
  100% { box-shadow: 0 0 0 12px #ffad6a00; }
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
  background: #061323b3;
  border: 1px solid ${naval.steel};
  border-radius: 12px;
  color: ${naval.ice};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: ${naval.steelBright};
  }

  &:focus {
    border-color: ${naval.amber};
    box-shadow: 0 0 0 3px #ffad6a2e;
    outline: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const Beacon = styled.span<{$tone: MatchTone}>`
  background: ${({$tone}) => TONES[$tone]};
  border-radius: 50%;
  box-shadow: 0 0 10px ${({$tone}) => `${TONES[$tone]}99`};
  flex-shrink: 0;
  height: 10px;
  width: 10px;

  ${({$tone}) =>
    $tone === 'incoming' &&
    css`
      animation: ${beaconPulse} 1.8s ease-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

export const Choice = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};
`;

export const ChoiceCard = styled.span`
  --threat: #5d89a5;
  align-content: start;
  background: #081a2dcc;
  border: 1px solid ${naval.steel};
  border-radius: 12px;
  display: grid;
  gap: 4px;
  grid-template-areas:
    'bars'
    'name'
    'note';
  padding: 14px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  strong {
    color: ${naval.ice};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
    grid-area: name;
    margin-top: 8px;
  }

  small {
    color: ${naval.mist};
    font-size: 12px;
    grid-area: note;
    line-height: 1.45;
    text-wrap: balance;
  }

  label:hover > & {
    border-color: ${naval.steelBright};
  }

  input:checked + & {
    --threat: ${naval.sonar};
    background: linear-gradient(180deg, #64d2ec1f, #64d2ec08);
    border-color: ${naval.sonar};
    box-shadow:
      inset 0 0 0 1px ${naval.sonar},
      0 0 24px #64d2ec1f;
  }

  input:focus-visible + & {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 3px;
  }

  @container lobby-form (max-width: 380px) {
    align-items: center;
    column-gap: 14px;
    grid-template-areas:
      'bars name'
      'bars note';
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

export const Console = styled.section`
  ${navalConsole};
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

export const ConsoleHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Count = styled.span`
  ${readout};
  background: #ffad6a1f;
  border: 1px solid #ffad6a59;
  border-radius: 999px;
  color: ${naval.amberLight};
  padding: 4px 10px;
`;

export const Deck = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Dispatch = styled.p`
  background: linear-gradient(90deg, #ffad6a17, transparent 85%);
  border-left: 2px solid ${naval.amber};
  border-radius: 0 10px 10px 0;
  color: ${naval.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
  padding: 12px 14px;
`;

export const Eyebrow = styled.p`
  ${readout};
  color: ${naval.amberLight};
  margin: 0 0 6px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  ${readout};
  color: ${naval.mist};
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

export const Horizon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const Lead = styled.p`
  color: ${naval.mist};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  text-wrap: pretty;
`;

export const Legend = styled.legend`
  ${readout};
  color: ${naval.mist};
  margin-bottom: 10px;
  padding: 0;
`;

export const Log = styled.section`
  ${navalConsole};
  margin-top: 24px;
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
  color: ${naval.ice};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const MatchAction = styled.span<{$tone: MatchTone}>`
  ${readout};
  border: 1px solid ${({$tone}) => `${TONES[$tone]}66`};
  border-radius: 999px;
  color: ${({$tone}) => ($tone === 'incoming' ? naval.amberLight : naval.ice)};
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
  background: #0613238c;
  border: 1px solid #1f3d56b3;
  border-radius: 12px;
  color: ${naval.ice};
  display: grid;
  gap: 10px 16px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 14px 16px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${naval.sonarSoft};
    border-color: ${naval.steelBright};
    color: ${naval.ice};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${naval.amberLight};
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
  color: ${naval.mist};
  font-size: 12px;
  line-height: 1.6;
  margin: 4px 0 0;
`;

export const MemberSearch = styled(UUserSearchInput)`
  > div:first-child {
    ${readout};
    color: ${naval.mist};
    margin-bottom: 10px;
  }

  input {
    ${fieldControl};
    font-size: 15px;
    height: 48px;
    padding-left: 16px;
  }

  input::placeholder {
    color: ${naval.fog};
  }

  button {
    color: ${naval.mist};
  }

  button:hover {
    color: ${naval.ice};
  }
`;

export const Opponents = styled.strong`
  display: block;
  font-size: 15px;
  overflow-wrap: break-word;

  span {
    color: ${naval.fog};
    font-family: ${navalMono};
    font-size: 12px;
    font-weight: ${fonts.weight.regular};
    margin: 0 4px;
  }
`;

export const Segment = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};

  span {
    ${readout};
    align-items: center;
    border-radius: 9px;
    color: ${naval.mist};
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
    color: ${naval.ice};
  }

  input:checked + span {
    background: linear-gradient(180deg, #64d2ec29, #64d2ec0f);
    box-shadow: inset 0 0 0 1px ${naval.sonar};
    color: ${naval.ice};
  }

  input:focus-visible + span {
    outline: 2px solid ${naval.amberLight};
    outline-offset: 2px;
  }
`;

export const Segmented = styled.div`
  background: #06132399;
  border: 1px solid ${naval.steel};
  border-radius: 12px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 4px;
`;

export const StakeControl = styled.span`
  display: flex;
  position: relative;
`;

export const StakeInput = styled.input`
  ${fieldControl};
  -moz-appearance: textfield;
  font-family: ${navalMono};
  font-size: 16px;
  font-variant-numeric: tabular-nums;
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
  ${readout};
  color: ${naval.amberLight};
  pointer-events: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

export const Status = styled.div`
  align-items: center;
  background: ${naval.deep};
  border: 1px solid ${naval.steel};
  border-radius: 14px;
  color: ${naval.mist};
  display: flex;
  font-size: 14px;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 20px;
`;

export const ThreatBars = styled.span<{$level: number}>`
  align-items: flex-end;
  display: flex;
  gap: 3px;
  grid-area: bars;
  height: 14px;

  i {
    background: ${naval.steelBright};
    border-radius: 1px;
    display: block;
    width: 4px;
  }

  i:nth-child(1) {
    height: 6px;
  }

  i:nth-child(2) {
    height: 10px;
  }

  i:nth-child(3) {
    height: 14px;
  }

  i:nth-child(-n + ${({$level}) => $level}) {
    background: var(--threat);
    box-shadow: 0 0 6px var(--threat);
  }
`;

export const Title = styled.h2`
  color: ${naval.ice};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;
