import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

const ACCENT = '#f6c667';
const INK = '#4a2f1b';
const WOOD = '#7a4a25';

const pulse = keyframes`
  0% {
    box-shadow:
      inset 0 4px 9px #1c0f0699,
      0 0 0 0 ${ACCENT};
  }

  100% {
    box-shadow:
      inset 0 4px 9px #1c0f0699,
      0 0 0 5px ${ACCENT};
  }
`;

const hollow = css`
  background: radial-gradient(circle at 50% 30%, #55331b, #3a2111 75%);
  box-shadow:
    inset 0 4px 9px #1c0f0699,
    inset 0 -2px 3px #ffffff14;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: #f3e6d2;
  border-radius: 999px;
  color: #75441c;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
`;

export const Board = styled.div`
  background: linear-gradient(160deg, #a8703f 0%, #8a5830 45%, #74461f 100%);
  border-radius: clamp(22px, 5vw, 56px);
  box-shadow:
    inset 0 2px 0 #ffffff33,
    inset 0 -6px 12px #3a211155,
    0 14px 30px #4a2f1b33;
  display: grid;
  gap: clamp(6px, 1.5vw, 18px);
  grid-template-columns: minmax(0, 1fr) minmax(0, 6.8fr) minmax(0, 1fr);
  padding: clamp(10px, 2.2vw, 26px);
  user-select: none;
`;

export const BoardCaption = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.6;
  margin: 12px 4px 0;
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return '#f8f1e6';
    return $danger ? '#9e3434' : WOOD;
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#e3d3bb' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? '#6b3f1c' : '#ffffff')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;
  transition:
    background 150ms,
    opacity 150ms;

  &:hover:not(:disabled) {
    filter: brightness(0.93);
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 3px solid #c98a2b;
    outline-offset: 3px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1500px;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const Count = styled.span`
  color: #fdf3e1;
  font-size: clamp(11px, 1.6vw, 15px);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 1px #3a211199;
`;

export const Detail = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const Empty = styled.div`
  background: #fbf7f0;
  border: 1px dashed #e0d0b8;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.7;
  padding: 24px;
`;

export const Error = styled.div`
  background: #fff0ec;
  border: 1px solid #eac8bb;
  border-radius: 12px;
  color: #813e2c;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  color: #94683c;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Field = styled.label`
  color: #5b3d24;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
`;

export const FieldGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GuestActions = styled.div`
  margin: 24px 0 8px;
`;

export const Hollow = styled.span<{$marked: boolean; $playable: boolean; $source: boolean}>`
  ${hollow};
  aspect-ratio: 1;
  border-radius: 50%;
  display: block;
  outline: ${({$source}) => ($source ? '2px dashed #fdf3e1cc' : '2px solid transparent')};
  outline-offset: 2px;
  position: relative;
  transition: box-shadow 150ms;
  width: 100%;

  ${({$playable}) =>
    $playable &&
    css`
      box-shadow:
        inset 0 4px 9px #1c0f0699,
        0 0 0 2px ${ACCENT}aa;
    `}

  ${({$marked}) =>
    $marked &&
    css`
      box-shadow:
        inset 0 4px 9px #1c0f0699,
        0 0 0 4px ${ACCENT};

      @media (prefers-reduced-motion: no-preference) {
        animation: ${pulse} 420ms ease-out;
      }
    `}
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #dccbb2;
  border-radius: 10px;
  color: ${colors.primary};
  font-family: inherit;
  font-size: 15px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid #b07a3a;
    outline-offset: 2px;
  }
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;

export const Log = styled.ol`
  color: ${colors.secondary};
  display: grid;
  font-size: 13px;
  gap: 8px;
  line-height: 1.5;
  list-style: none;
  margin: 0;
  padding: 0;

  li:first-child {
    color: ${INK};
    font-weight: 600;
  }
`;

export const MatchGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 300px;
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 18px 20px;

  &:hover {
    border-color: #c39a68;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #c98a2b;
    outline-offset: 2px;
  }
`;

export const MatchTitle = styled.h1`
  color: ${INK};
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.035em;
  margin-bottom: 10px;
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 20px;
  min-width: 0;
  padding: 24px;
  scroll-margin-top: 24px;
`;

export const PanelGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const pit = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.8vw, 8px);
  min-width: 0;
`;

export const Pit = styled.div`
  ${pit};
`;

export const PitButton = styled.button`
  ${pit};
  background: none;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  font: inherit;
  padding: 0;

  &:disabled {
    cursor: default;
  }

  &[aria-busy='true'] {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 3px;
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    transition: transform 150ms;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
    }
  }
`;

export const Player = styled.div<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? '#fbf0dc' : '#fdfaf5')};
  border: 1px solid ${({$active}) => ($active ? '#d9a860' : '#eee3d2')};
  border-radius: 14px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 14px;
`;

export const PlayerIdentity = styled.div`
  min-width: 0;
`;

export const PlayerName = styled.strong`
  display: block;
  font-size: 14px;
  overflow-wrap: anywhere;
`;

export const Result = styled.div`
  background: #fbf0dc;
  border: 1px solid #e2c592;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
  padding: 22px;
`;

export const Row = styled.div`
  display: grid;
  gap: clamp(4px, 1vw, 12px);
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

export const Rows = styled.div`
  display: grid;
  gap: clamp(8px, 1.6vw, 18px);
  grid-template-rows: 1fr 1fr;
`;

export const Rules = styled.details`
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: #6b3f1c;
    cursor: pointer;
    font-weight: 600;
  }

  li {
    margin-top: 8px;
  }
`;

export const Score = styled.div`
  color: #6b3f1c;
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  white-space: nowrap;
`;

export const Section = styled.section`
  margin-top: 32px;
`;

export const Select = styled.select`
  background: #ffffff;
  border: 1px solid #dccbb2;
  border-radius: 10px;
  color: ${colors.primary};
  font-family: inherit;
  font-size: 14px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid #b07a3a;
    outline-offset: 2px;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1180px) and (min-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Small = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #f0e6d6;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  line-height: 1.5;
  padding: 12px 0;

  &:last-child {
    border: 0;
  }
`;

export const Status = styled.div`
  align-items: center;
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 16px 0;
  min-height: 80px;
  padding: 18px 20px;
`;

export const Stone = styled.span<{$color: string; $store: boolean}>`
  aspect-ratio: 1;
  background:
    radial-gradient(circle at 32% 28%, #ffffffc4 0 9%, transparent 36%),
    radial-gradient(circle at 62% 72%, #00000047, transparent 62%), ${({$color}) => $color};
  border-radius: 50%;
  box-shadow: 0 1px 2px #1c0f0680;
  position: absolute;
  transform: translate(-50%, -50%);
  width: ${({$store}) => ($store ? '25%' : '21%')};
`;

export const Store = styled.div<{$marked: boolean}>`
  ${hollow};
  border-radius: 999px;
  min-width: 0;
  position: relative;

  ${({$marked}) =>
    $marked &&
    css`
      box-shadow:
        inset 0 4px 9px #1c0f0699,
        0 0 0 4px ${ACCENT};

      @media (prefers-reduced-motion: no-preference) {
        animation: ${pulse} 420ms ease-out;
      }
    `}
`;

export const StoreCount = styled(Count)`
  left: 50%;
  position: absolute;
  top: clamp(8px, 1.6vw, 16px);
  transform: translateX(-50%);
`;

export const TextLink = styled(Link)`
  color: #7a4a25;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.span`
  color: #6d543d;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const TitleSmall = styled.h2`
  color: ${INK};
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;

export const TurnBanner = styled.div<{$yours: boolean}>`
  align-items: center;
  background: ${({$yours}) => ($yours ? '#fbf0dc' : '#ffffff')};
  border: 1px solid ${({$yours}) => ($yours ? '#d9a860' : '#ecdfcb')};
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin: 16px 0;
  min-height: 72px;
  padding: 16px 20px;
`;
