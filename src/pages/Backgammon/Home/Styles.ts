import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import * as UserSearch from 'components/UserSearchInput/Styles';
import {fonts} from 'styles';

import {DoublingCube as UDoublingCube, HitScene as UHitScene, MiniBoard as UMiniBoard} from '../Emblems';
import * as Emblem from '../Emblems/Styles';
import URules from '../Rules';
import {backgammon, boardPanel, caption, checker, FOREST_CHECKER, IVORY_CHECKER, serif} from '../theme';

export {Container, Navigation, TextLink} from '../Styles';

const brassField = css`
  background: #021f1c99;
  border: 1px solid ${backgammon.brass}66;
  border-radius: 8px;
  color: ${backgammon.ink};
  color-scheme: dark;
  font-family: inherit;
  min-height: 46px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: #8fa79b;
  }

  &:focus {
    border-color: ${backgammon.brassText};
    box-shadow: 0 0 0 3px ${backgammon.brassText}33;
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
  0% { box-shadow: 0 0 0 0 #e8957499; }
  100% { box-shadow: 0 0 0 9px #e8957400; }
`;

const pill = css`
  ${caption};
  align-items: center;
  border-radius: 999px;
  display: inline-flex;
  font-size: 10px;
  gap: 8px;
  white-space: nowrap;
`;

export const Badge = styled.span`
  --die-size: 16px;

  align-items: center;
  background: ${backgammon.feltDeep};
  border: 1px solid ${backgammon.brass}66;
  border-radius: 999px;
  color: ${backgammon.brassBright};
  display: inline-flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  padding: 6px 13px 6px 7px;
`;

export const Choice = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};
`;

export const ChoiceCard = styled.span`
  --die-size: 26px;

  align-items: flex-start;
  background: #ffffff08;
  border: 1px solid ${backgammon.ivory}2e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100%;
  padding: 14px 14px 13px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  label:hover > input:not(:checked) + & {
    border-color: ${backgammon.ivory}66;
  }

  input:checked + & {
    background: linear-gradient(180deg, ${backgammon.brassText}29, ${backgammon.brassText}0d);
    border-color: ${backgammon.brassText};
    box-shadow:
      inset 0 0 0 1px ${backgammon.brassText},
      0 8px 18px #00000033;
  }

  input:focus-visible + & {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 3px;
  }

  @container backgammon-panel (max-width: 440px) {
    align-items: center;
    flex-direction: row;
    gap: 16px;
    padding: 12px 14px;
  }
`;

export const ChoiceGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @container backgammon-panel (max-width: 440px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ChoiceText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  strong {
    color: ${backgammon.ink};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
  }

  small {
    color: ${backgammon.mist};
    font-size: 12px;
    line-height: 1.45;
  }
`;

// The clock choices are checkers: the chosen one turns ivory and lifts off the felt
export const ClockChecker = styled.span`
  ${checker};
  align-items: center;
  aspect-ratio: 1;
  background: radial-gradient(circle at 34% 28%, #1d5446, #0a3029 62%, #06241f);
  box-shadow:
    inset 0 0 0 1px ${backgammon.ivory}47,
    0 3px 0 #021512,
    0 6px 12px #0000004d;
  color: ${backgammon.mist};
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease;
  width: 100%;

  b {
    color: ${backgammon.ink};
    font-size: 17px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    line-height: 1;
  }

  small {
    font-size: 9px;
    font-weight: ${fonts.weight.bold};
    letter-spacing: 0.14em;
    margin-top: 3px;
    text-transform: uppercase;
  }

  label:hover > input:not(:checked) + & {
    box-shadow:
      inset 0 0 0 1px ${backgammon.brassText}b3,
      0 3px 0 #021512,
      0 6px 12px #0000004d;
  }

  input:checked + & {
    background: ${IVORY_CHECKER};
    box-shadow:
      inset 0 0 0 1px #fffaf0,
      0 3px 0 #9c8a5f,
      0 9px 16px #00000059;
    color: #5c5a45;
    transform: translateY(-2px);

    b {
      color: #173b31;
    }
  }

  input:focus-visible + & {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 3px;
  }
`;

export const ClockChoice = styled.label`
  cursor: pointer;
  display: flex;
  min-width: 0;
  position: relative;
  ${hiddenRadio};
`;

// Four checkers in a row that shrink together on narrow boards instead of wrapping
export const Clocks = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 60px));
  padding-top: 2px;

  @container backgammon-panel (max-width: 440px) {
    gap: 10px;
  }
`;

export const Count = styled.span<{$live?: boolean}>`
  ${pill};
  background: #ffffff0a;
  border: 1px solid ${backgammon.brass}59;
  color: ${backgammon.brassBright};
  padding: 5px 12px;

  ${({$live}) =>
    $live &&
    css`
      &::before {
        animation: ${livePulse} 1.8s ease-out infinite;
        background: #e89574;
        border-radius: 50%;
        content: '';
        height: 7px;
        width: 7px;
      }

      @media (prefers-reduced-motion: reduce) {
        &::before {
          animation: none;
        }
      }
    `}
`;

export const Detail = styled.p`
  color: ${backgammon.mist};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const Empty = styled.div`
  align-items: center;
  background: #ffffff06;
  border: 1px dashed ${backgammon.ivory}40;
  border-radius: 10px;
  display: flex;
  gap: 24px;
  padding: 20px 22px;

  strong {
    ${serif};
    color: ${backgammon.ink};
    display: block;
    font-size: 22px;
    margin-bottom: 4px;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
  }
`;

export const Error = styled.div`
  align-items: center;
  background: #fbefe8;
  border: 1px solid #e3bfae;
  border-left: 4px solid ${backgammon.coral};
  border-radius: 10px;
  color: #7a3a26;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  ${caption};
  color: ${backgammon.brassText};
  font-size: 10px;
  letter-spacing: 0.18em;
  margin: 0 0 8px;
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
  gap: 20px;
`;

export const GuestActions = styled.div`
  button {
    border-radius: 8px;
    min-height: 44px;
  }

  button:first-child {
    background: transparent;
    border: 1px solid ${backgammon.ivory}80;
    color: ${backgammon.ink};

    &:hover {
      background: #ffffff12;
    }
  }

  button:last-child {
    background: linear-gradient(180deg, #f8e6bd, #e8c98a);
    border: 1px solid #fff0c9;
    box-shadow: 0 2px 0 ${backgammon.brassDeep};
    color: #173b31;

    &:hover {
      background: linear-gradient(180deg, #fff1d1, #efd59f);
    }
  }

  button:focus-visible {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 3px;
  }
`;

export const GuestScene = styled(UHitScene)`
  margin-block: auto;
  padding-top: 6px;

  > svg {
    max-width: 440px;
  }
`;

export const Legend = styled.legend`
  ${caption};
  color: ${backgammon.brassText};
  display: block;
  font-size: 10px;
  letter-spacing: 0.16em;
  margin-bottom: 10px;
  padding: 0;
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;

export const LobbyRules = styled(URules)`
  ${boardPanel({frame: 8, points: false})};
  color: ${backgammon.mist};
  margin-top: 28px;
  padding: 18px 24px;

  summary {
    ${serif};
    align-items: center;
    color: ${backgammon.ink};
    cursor: pointer;
    display: flex;
    font-size: 21px;
    gap: 12px;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      border-bottom: 2px solid ${backgammon.brassText};
      border-right: 2px solid ${backgammon.brassText};
      content: '';
      height: 9px;
      margin: 0 6px 4px auto;
      transform: rotate(45deg);
      transition: transform 0.2s ease;
      width: 9px;
    }

    &:focus-visible {
      border-radius: 4px;
      outline: 2px solid ${backgammon.brassBright};
      outline-offset: 6px;
    }
  }

  &[open] summary::after {
    margin-bottom: -4px;
    transform: rotate(-135deg);
  }

  ol {
    margin: 18px 0 0;
    padding-left: 22px;
  }

  li {
    margin-top: 10px;
  }

  li::marker {
    color: ${backgammon.brassText};
    font-weight: ${fonts.weight.bold};
  }

  strong {
    color: ${backgammon.ink};
  }

  @media (max-width: 600px) {
    border-width: 6px;
    padding: 16px 16px 18px;
  }
`;

export const MatchAction = styled.span<{$highlight?: boolean}>`
  ${pill};
  background: ${({$highlight}) => ($highlight ? backgammon.brassBright : 'transparent')};
  border: 1px solid ${({$highlight}) => ($highlight ? backgammon.brassBright : `${backgammon.brass}80`)};
  color: ${({$highlight}) => ($highlight ? '#173b31' : backgammon.brassBright)};
  padding: 6px 12px;
`;

export const MatchInfo = styled.div`
  min-width: 0;
`;

export const MatchStatus = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  justify-content: flex-end;
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: #ffffff06;
  border: 1px solid ${backgammon.ivory}21;
  border-radius: 10px;
  color: ${backgammon.ink};
  display: grid;
  gap: 16px;
  grid-template-columns: 112px minmax(0, 1fr) auto;
  padding: 12px 16px 12px 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: #ffffff0d;
    border-color: ${backgammon.brassText}80;
    color: ${backgammon.ink};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    gap: 12px 14px;
    grid-template-columns: 84px minmax(0, 1fr);

    ${MatchStatus} {
      grid-column: 1 / -1;
      justify-content: flex-start;
    }
  }
`;

export const MemberSearch = styled.div`
  ${UserSearch.Label} {
    ${caption};
    color: ${backgammon.brassText};
    font-size: 10px;
    letter-spacing: 0.16em;
    margin-bottom: 10px;
  }

  ${UserSearch.Input} {
    ${brassField};
    font-size: 15px;
    height: auto;
  }

  ${UserSearch.ClearButton} {
    color: ${backgammon.mist};

    &:hover {
      color: ${backgammon.ink};
    }
  }

  ${UserSearch.Dropdown} {
    color: #1f2a26;
    color-scheme: light;
  }
`;

export const Panel = styled.section`
  ${boardPanel()};
  container: backgammon-panel / inline-size;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  padding: 24px 26px 26px;
  scroll-margin-top: 24px;

  @media (max-width: 600px) {
    border-width: 8px;
    padding: 20px 16px 22px;
  }
`;

export const PanelCube = styled(UDoublingCube)`
  --cube-size: 70px;

  margin: -6px 2px -8px 0;
  transform: rotate(-7deg);
`;

export const PanelGrid = styled.div`
  align-items: stretch;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PanelHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  min-height: 70px;

  @container backgammon-panel (max-width: 440px) {
    ${Emblem.DicePair} {
      --die-size: 34px;

      height: 58px;
      width: 76px;
    }

    ${PanelCube} {
      --cube-size: 58px;
    }
  }
`;

export const PanelTitle = styled.h2`
  ${serif};
  color: ${backgammon.ink};
  font-size: clamp(26px, 2.4vw, 32px);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
`;

export const PlayButton = styled.button`
  align-items: center;
  background: linear-gradient(180deg, #f8e6bd, #e8c98a);
  border: 1px solid #fff0c9;
  border-radius: 8px;
  box-shadow:
    0 3px 0 ${backgammon.brassDeep},
    0 10px 20px #0000004d;
  color: #173b31;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  margin-top: auto;
  min-height: 50px;
  padding: 0 20px;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: linear-gradient(180deg, #fff1d1, #efd59f);
  }

  &:active:not(:disabled) {
    box-shadow:
      0 1px 0 ${backgammon.brassDeep},
      0 4px 10px #0000004d;
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 4px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const PlayerName = styled.strong`
  align-items: center;
  color: ${backgammon.ink};
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
  gap: 4px 8px;
  overflow-wrap: anywhere;
`;

export const RetryButton = styled.button`
  background: #ffffff;
  border: 1px solid #d9a993;
  border-radius: 999px;
  color: #7a3a26;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  min-height: 34px;
  padding: 0 14px;

  &:hover {
    background: #fff6f1;
  }

  &:focus-visible {
    outline: 2px solid ${backgammon.coral};
    outline-offset: 2px;
  }
`;

export const Section = styled.section`
  ${boardPanel({frame: 8, points: false})};
  margin-top: 28px;
  padding: 22px 24px 24px;

  @media (max-width: 600px) {
    border-width: 6px;
    padding: 18px 14px 20px;
  }
`;

export const SectionHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${backgammon.brass}33;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

export const Side = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 7px;
  min-width: 0;
`;

export const SideChecker = styled.span<{$side: 'black' | 'white'}>`
  ${checker};
  background: ${({$side}) => ($side === 'white' ? IVORY_CHECKER : FOREST_CHECKER)};
  box-shadow: inset 0 0 0 1px ${({$side}) => ($side === 'white' ? '#bfae86' : '#8fb0a1')};
  color: ${({$side}) => ($side === 'white' ? '#9c8a5f' : '#9fc0b1')};
  height: 16px;
  width: 16px;
`;

export const Small = styled.p`
  color: ${backgammon.mist};
  font-size: 12.5px;
  line-height: 1.5;
  margin: 5px 0 0;
`;

export const StakeControl = styled.span`
  display: block;
  position: relative;

  input {
    ${brassField};
    appearance: textfield;
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.semiBold};
    padding: 10px 58px 10px 14px;
    width: 100%;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  span {
    ${caption};
    color: ${backgammon.brassText};
    pointer-events: none;
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const StakeField = styled.label`
  display: flex;
  flex-direction: column;
`;

export const Status = styled.div`
  ${boardPanel({frame: 6, points: false})};
  align-items: center;
  color: ${backgammon.mist};
  display: flex;
  font-size: 14px;
  gap: 14px;
  margin-top: 24px;
  padding: 14px 18px;
`;

export const Thumbnail = styled(UMiniBoard)`
  filter: drop-shadow(0 4px 8px #00000066);
`;

export const TitleSmall = styled.h2`
  ${serif};
  color: ${backgammon.ink};
  font-size: 26px;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
`;

export const Turn = styled.span<{$yours: boolean}>`
  ${pill};
  background: ${({$yours}) => ($yours ? `${backgammon.coral}33` : 'transparent')};
  border: 1px solid ${({$yours}) => ($yours ? '#e89574' : `${backgammon.ivory}40`)};
  color: ${({$yours}) => ($yours ? '#ffd9c8' : backgammon.mist)};
  padding: 5px 10px;
`;

export const Versus = styled.span`
  ${serif};
  color: ${backgammon.mist};
  font-size: 13px;
  font-style: italic;
`;
