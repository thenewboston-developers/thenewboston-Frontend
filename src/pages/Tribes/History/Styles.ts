import styled, {keyframes} from 'styled-components';

import {easing, fonts, palette} from '../theme';

export * from '../Styles';

const grow = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
`;

export const Attack = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.lineSoft};
  display: grid;
  gap: 8px 14px;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) minmax(120px, 0.9fr);
  padding: 12px 0;

  &:last-child {
    border-bottom: 0;
  }

  > svg {
    color: ${palette.ember};
  }

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);

    > div:last-child {
      grid-column: 1 / -1;
    }
  }
`;

export const Bar = styled.span<{$color: string; $value: number}>`
  background: #ece6d6;
  border-radius: 999px;
  display: block;
  height: 6px;
  margin-top: 5px;
  overflow: hidden;
  width: 100%;

  &::after {
    background: ${({$color}) => $color};
    border-radius: inherit;
    content: '';
    display: block;
    height: 100%;
    transition: width 0.9s ${easing.out};
    width: ${({$value}) => Math.max(0, Math.min(100, $value))}%;
  }
`;

export const Damage = styled.div`
  font-feature-settings: 'tnum';
  font-size: 13px;
  font-weight: 700;

  small {
    color: ${palette.faint};
    font-size: 11.5px;
    font-weight: 600;
    margin-left: 6px;
  }
`;

export const Intro = styled.div`
  margin: 0 auto;
  max-width: 640px;
  padding: 10px 0 4px;
  text-align: center;

  h2 {
    font-family: ${fonts.display};
    font-size: clamp(26px, 3.4vw, 36px);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.12;
    margin-bottom: 10px;
  }

  p {
    justify-content: center;
  }
`;

export const Pedestal = styled.div<{$place: number}>`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 220px;
  min-width: 0;
  order: ${({$place}) => ({1: 2, 2: 1, 3: 3})[$place] ?? $place};
  text-align: center;

  strong {
    color: ${palette.white};
    display: block;
    font-size: 15px;
    margin-top: 8px;
    overflow-wrap: anywhere;
  }

  small {
    color: #a9bfb1;
    display: block;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  > div {
    align-items: flex-start;
    animation: ${grow} 0.9s ${easing.out} both;
    animation-delay: ${({$place}) => (3 - $place) * 0.15}s;
    background: ${({$place}) =>
      ({
        1: `linear-gradient(180deg, ${palette.goldBright}, ${palette.gold})`,
        2: 'linear-gradient(180deg, #dfe6ea, #a9b6be)',
        3: 'linear-gradient(180deg, #d9a273, #a86a32)',
      })[$place]};
    border-radius: 14px 14px 0 0;
    color: #2b1e05;
    display: flex;
    font-family: ${fonts.display};
    font-size: 34px;
    font-weight: 700;
    height: ${({$place}) => ({1: 132, 2: 96, 3: 70})[$place]}px;
    justify-content: center;
    padding-top: 10px;
    transform-origin: 50% 100%;
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    > div {
      animation: none;
    }
  }
`;

export const Podium = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 26px auto 0;
  max-width: 620px;
`;

export const Rank = styled.span<{$rank: number}>`
  align-items: center;
  background: ${({$rank}) => ({1: palette.goldWash, 2: '#eef1f3', 3: '#f6e9dd'})[$rank] ?? '#f1ede2'};
  border: 1px solid ${({$rank}) => ({1: '#efdcae', 2: '#d8dee2', 3: '#e9cfb6'})[$rank] ?? palette.line};
  border-radius: 10px;
  color: ${({$rank}) => ({1: palette.goldDeep, 2: '#55646e', 3: '#8a5a2c'})[$rank] ?? palette.muted};
  display: inline-flex;
  font-size: 13px;
  font-weight: 750;
  height: 30px;
  justify-content: center;
  min-width: 36px;
  padding: 0 8px;
`;

export const Score = styled.strong<{$positive: boolean}>`
  color: ${({$positive}) => ($positive ? '#2a6248' : palette.emberDeep)};
  font-size: 15px;
`;

export const Side = styled.div`
  align-items: center;
  display: flex;
  gap: 9px;
  min-width: 0;

  strong {
    display: block;
    font-size: 13.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    color: ${palette.faint};
    display: block;
    font-size: 11.5px;
  }
`;

export const Tile = styled.div`
  align-items: center;
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 14px;
  display: flex;
  gap: 12px;
  padding: 12px 14px;

  span {
    color: ${palette.muted};
    display: block;
    font-size: 12px;
    font-weight: 600;
  }

  strong {
    font-feature-settings: 'tnum';
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
