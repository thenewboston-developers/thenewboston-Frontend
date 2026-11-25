import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UUserSearchInput from 'components/UserSearchInput';
import {fonts} from 'styles';

import {Pit} from '../Emblems/Styles';
import {amberButton, carved, engravedBoard, eyebrow, focusRing, ghostButton, label, mancala, woodPanel} from '../theme';

export {Error as Alert, AuthButtons, Badge, Container, Navigation, Status, TextLink} from '../Styles';

export type MatchTone = 'closed' | 'incoming' | 'turn' | 'watch' | 'waiting';

// A jade pit rim, like a playable pit on the match board
const PLAYABLE_PIT = css`
  border-color: #a2ead2c2;
  box-shadow:
    inset 0 5px 10px #0d0603b3,
    0 0 0 1px #a2ead266,
    0 0 16px #92e9c440;
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 #7fe6d066; }
  50% { box-shadow: 0 0 0 6px #7fe6d000; }
`;

// Radios stay in the tab order and announce their own state; the card next to them shows it
const hiddenInput = css`
  height: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: 1px;
`;

const TONE_STYLES: Record<MatchTone, ReturnType<typeof css>> = {
  closed: css`
    border-color: ${mancala.line};
    color: ${mancala.sand};
  `,
  incoming: css`
    background: linear-gradient(180deg, #b8f7e8, #5fd3bd);
    border-color: transparent;
    color: ${mancala.jadeInk};
  `,
  turn: css`
    background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber});
    border-color: transparent;
    color: ${mancala.ink};
  `,
  waiting: css`
    border-color: ${mancala.line};
    border-style: dashed;
    color: ${mancala.dust};
  `,
  watch: css`
    border-color: ${mancala.lineBright};
    color: ${mancala.cream};
  `,
};

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const Choice = styled.label`
  cursor: pointer;
  display: block;
  min-width: 0;
  position: relative;

  input {
    ${hiddenInput};
  }
`;

// A difficulty, drawn as a pit holding more stones the harder the computer plays
export const ChoiceCard = styled.span`
  align-items: center;
  background: linear-gradient(180deg, #2412091a, #24120959);
  border: 1px solid ${mancala.line};
  border-radius: 22px;
  box-shadow: inset 0 2px 6px #12080359;
  color: ${mancala.cream};
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 100%;
  padding: 14px 8px 12px;
  position: relative;
  text-align: center;
  transition:
    background 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;

  strong {
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
    margin-top: 8px;
  }

  small {
    color: ${mancala.dust};
    font-size: 12px;
    line-height: 1.35;
  }

  label:hover > & {
    border-color: ${mancala.lineBright};
  }

  input:checked + & {
    background: linear-gradient(180deg, #7fe6d01f, #24120959);
    border-color: ${mancala.jade};
    box-shadow:
      inset 0 0 0 1px ${mancala.jade},
      0 0 22px #7fe6d02e;
  }

  input:checked + & small {
    color: ${mancala.sand};
  }

  input:checked + & ${Pit} {
    ${PLAYABLE_PIT};
  }

  input:focus-visible + & {
    ${focusRing};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ChoiceGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const Count = styled.span`
  ${carved};
  border-radius: 999px;
  color: ${mancala.amberLight};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  min-width: 26px;
  padding: 6px 9px;
  text-align: center;
`;

export const Detail = styled.p`
  color: ${mancala.sand};
  font-size: 14px;
  line-height: 1.65;
  margin: 0;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;

  strong {
    color: ${mancala.cream};
    display: block;
    font-size: 15px;
    margin-bottom: 4px;
  }

  p {
    color: ${mancala.sand};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }
`;

export const Eyebrow = styled.p`
  ${eyebrow};
  margin: 0 0 4px;
`;

export const Field = styled.label`
  ${label};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  min-width: 0;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 22px;
`;

export const GuestBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  ${carved};
  border-radius: 16px;
  color: ${mancala.cream};
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  height: 48px;
  letter-spacing: normal;
  min-width: 0;
  padding: 0 16px;
  text-transform: none;
  width: 100%;

  &:focus-visible {
    border-color: ${mancala.jade};
    outline: 2px solid ${mancala.jade};
    outline-offset: 2px;
  }
`;

export const Legend = styled.legend`
  ${label};
  margin-bottom: 10px;
  padding: 0;
`;

export const LiveDot = styled.span`
  background: ${mancala.jade};
  border-radius: 50%;
  flex: 0 0 auto;
  height: 9px;
  width: 9px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

export const MatchAction = styled.span<{$tone: MatchTone}>`
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  grid-area: action;
  padding: 8px 14px;
  white-space: nowrap;
  ${({$tone}) => TONE_STYLES[$tone]};

  @media (max-width: 560px) {
    justify-self: start;
  }
`;

export const MatchInfo = styled.div`
  grid-area: info;
  min-width: 0;
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: linear-gradient(180deg, #2412091f, #24120952);
  border: 1px solid ${mancala.line};
  border-radius: 20px;
  color: ${mancala.cream};
  display: grid;
  gap: 8px 16px;
  grid-template-areas: 'tile info action';
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 10px 16px 10px 10px;
  transition:
    background 150ms ease,
    border-color 150ms ease;

  > span:first-child {
    grid-area: tile;
  }

  &:hover {
    background: linear-gradient(180deg, #2412093d, #24120980);
    border-color: ${mancala.lineBright};
    color: ${mancala.cream};
    text-decoration: none;
  }

  &:focus-visible {
    ${focusRing};
  }

  @media (max-width: 560px) {
    grid-template-areas:
      'tile info'
      'tile action';
    grid-template-columns: auto minmax(0, 1fr);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MatchMeta = styled.p`
  color: ${mancala.sand};
  font-size: 12px;
  line-height: 1.6;
  margin: 3px 0 0;
`;

export const MatchRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// The search field is carved into the board; its results popover stays the site's light dropdown
export const MemberSearch = styled(UUserSearchInput)`
  > div:first-child {
    ${label};
    margin-bottom: 10px;
  }

  input {
    ${carved};
    border-radius: 16px;
    color: ${mancala.cream};
    font-size: 15px;
    height: 48px;
    padding-left: 16px;
  }

  input::placeholder {
    color: ${mancala.dust};
  }

  input:focus-visible {
    border-color: ${mancala.jade};
    outline: 2px solid ${mancala.jade};
    outline-offset: 2px;
  }

  button {
    color: ${mancala.sand};
  }

  button:hover {
    color: ${mancala.cream};
  }

  > div:last-child {
    color-scheme: light;
  }
`;

export const Panel = styled.section`
  ${engravedBoard};
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
  padding: 28px;
  scroll-margin-top: 24px;

  @media (max-width: 600px) {
    border-radius: 24px;
    padding: 22px 18px;
  }
`;

export const PanelGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 6px;
  position: relative;
  z-index: 1;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const PanelHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const PanelTitle = styled.h2`
  color: ${mancala.cream};
  font-size: 26px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

export const PlayButton = styled.button`
  ${amberButton};
  width: 100%;
`;

export const Players = styled.strong`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
  gap: 4px 8px;
  overflow-wrap: anywhere;
`;

export const Retry = styled.button`
  ${ghostButton};
  min-height: 38px;
  padding: 0 16px;
`;

export const Tray = styled.section`
  ${woodPanel};
  margin-top: 28px;
  padding: 22px 24px 24px;

  @media (max-width: 600px) {
    border-radius: 24px;
    padding: 18px 14px 18px;
  }
`;

export const TrayHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

export const TrayTitle = styled.h2`
  color: ${mancala.cream};
  font-size: 19px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const Trough = styled.div`
  ${carved};
  border-radius: 999px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 5px;
`;

// A time limit in the trough; the chosen one is a jade glass stone resting in it
export const TroughOption = styled.label`
  display: block;
  min-width: 0;
  position: relative;

  input {
    ${hiddenInput};
  }

  span {
    align-items: center;
    border-radius: 999px;
    color: ${mancala.sand};
    cursor: pointer;
    display: flex;
    font-size: 13px;
    font-weight: ${fonts.weight.semiBold};
    justify-content: center;
    min-height: 40px;
    padding: 0 4px;
    transition:
      background 150ms ease,
      color 150ms ease;
    white-space: nowrap;
  }

  &:hover span {
    background: #ffe7c40f;
    color: ${mancala.cream};
  }

  input:checked + span {
    background:
      radial-gradient(ellipse 60% 80% at 30% 15%, #ffffffb3, transparent 60%),
      linear-gradient(180deg, #b8f7e8, #5fd3bd 55%, #34b29c);
    box-shadow:
      inset 0 1px 0 #ffffffcc,
      inset 0 -2px 3px #0f645766,
      0 2px 4px #0a040280;
    color: ${mancala.jadeInk};
    font-weight: ${fonts.weight.bold};
  }

  input:focus-visible + span {
    ${focusRing};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      transition: none;
    }
  }
`;

export const Turn = styled.span<{$yours: boolean}>`
  background: ${({$yours}) => ($yours ? '#f6b14f26' : '#ffe7c40f')};
  border: 1px solid ${({$yours}) => ($yours ? '#f6b14f80' : mancala.line)};
  border-radius: 999px;
  color: ${({$yours}) => ($yours ? mancala.amberLight : mancala.sand)};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  max-width: 100%;
  overflow: hidden;
  padding: 2px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Versus = styled.span`
  color: ${mancala.dust};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;

export const VisuallyHidden = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
