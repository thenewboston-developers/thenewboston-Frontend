import styled from 'styled-components';

import {easing, fonts, palette, pop, shadows} from '../theme';

export * from '../Styles';

export const EmblemOption = styled.button<{$selected: boolean}>`
  align-items: center;
  background: ${({$selected}) => ($selected ? '#f2f8ef' : palette.white)};
  border: 1px solid ${({$selected}) => ($selected ? palette.moss : palette.line)};
  border-radius: 10px;
  box-shadow: ${({$selected}) => ($selected ? `0 0 0 1px ${palette.moss}` : 'none')};
  cursor: pointer;
  display: inline-flex;
  font-size: 19px;
  height: 38px;
  justify-content: center;
  line-height: 1;
  padding: 0;
  transition:
    border-color 0.15s ease,
    transform 0.15s ${easing.spring};

  &:hover:enabled {
    transform: translateY(-2px) scale(1.06);
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const EmblemOptions = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
`;

export const Ghosts = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 6px;

  > span {
    animation: ${pop} 0.6s ${easing.spring} both;
  }

  > span:nth-child(1) {
    opacity: 0.55;
    rotate: -8deg;
  }

  > span:nth-child(2) {
    animation-delay: 0.08s;
    translate: 0 -8px;
  }

  > span:nth-child(3) {
    animation-delay: 0.16s;
    opacity: 0.55;
    rotate: 8deg;
  }

  @media (prefers-reduced-motion: reduce) {
    > span {
      animation: none;
    }
  }
`;

export const Preview = styled.div<{$color: string}>`
  align-items: center;
  background:
    linear-gradient(110deg, ${({$color}) => $color}d9 0%, ${({$color}) => $color}40 36%, transparent 68%),
    linear-gradient(160deg, ${palette.forest} 0%, ${palette.ink} 100%);
  border-radius: 14px;
  color: ${palette.white};
  display: flex;
  gap: 16px;
  margin-top: 14px;
  min-height: 108px;
  overflow: hidden;
  padding: 16px 18px;
  position: relative;
  transition: background 0.3s ease;

  > div {
    min-width: 0;
  }

  small {
    color: ${palette.goldBright};
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  strong {
    display: block;
    font-family: ${fonts.display};
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    overflow-wrap: anywhere;
  }

  em {
    color: rgba(255, 255, 255, 0.74);
    display: block;
    font-size: 13px;
    margin-top: 5px;
    overflow-wrap: anywhere;
  }
`;

export const Slot = styled.span`
  border: 1.5px dashed #d2c9b1;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  height: 28px;
  margin-left: -6px;
  width: 28px;
`;

export const Slots = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding-left: 6px;
  row-gap: 4px;

  > span:not(${Slot}) {
    margin-left: -6px;
  }
`;

export const Step = styled.li`
  align-items: flex-start;
  display: flex;
  gap: 12px;

  > span {
    align-items: center;
    background: ${palette.goldWash};
    border: 1px solid #efdcae;
    border-radius: 12px;
    display: inline-flex;
    flex-shrink: 0;
    height: 44px;
    justify-content: center;
    width: 44px;
  }

  strong {
    display: block;
    font-size: 14px;
    margin-bottom: 2px;
  }

  small {
    color: ${palette.muted};
    display: block;
    font-size: 12.5px;
    line-height: 1.5;
  }
`;

export const Steps = styled.ol`
  display: grid;
  gap: 14px;
  list-style: none;
  margin: 14px 0 16px;
  padding: 0;
`;

export const Swatch = styled.button<{$color: string; $selected: boolean}>`
  background: ${({$color}) => $color};
  border: 2px solid ${palette.white};
  border-radius: 50%;
  box-shadow: 0 0 0 ${({$selected}) => ($selected ? `2px ${palette.text}` : `1px ${palette.line}`)};
  cursor: pointer;
  height: 26px;
  padding: 0;
  transition: transform 0.15s ${easing.spring};
  width: 26px;

  &:hover:enabled {
    transform: scale(1.14);
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const Swatches = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  input[type='color'] {
    background: ${palette.white};
    border: 1px solid ${palette.line};
    border-radius: 8px;
    cursor: pointer;
    height: 30px;
    padding: 2px;
    width: 40px;
  }
`;

export const TribeCard = styled.article<{$color: string; $own?: boolean}>`
  background: ${palette.white};
  border: 1px solid ${({$own}) => ($own ? palette.gold : palette.line)};
  border-radius: 16px;
  box-shadow: ${({$own}) => ($own ? shadows.glow : shadows.card)};
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
  padding: 18px;
  position: relative;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ${easing.out};

  &::before {
    background: linear-gradient(90deg, ${({$color}) => $color}, ${({$color}) => $color}88);
    content: '';
    height: 5px;
    inset: 0 0 auto;
    position: absolute;
  }

  &:hover {
    box-shadow: ${({$own}) => ($own ? shadows.glow : shadows.lifted)};
    transform: translateY(-2px);
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.015em;
    margin: 0;
    overflow-wrap: anywhere;
  }

  p {
    color: ${palette.muted};
    font-size: 13px;
    line-height: 1.55;
    margin: 0;
    overflow-wrap: anywhere;
  }

  em {
    color: ${palette.goldDeep};
    display: block;
    font-size: 12.5px;
    margin-top: 2px;
    overflow-wrap: anywhere;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const TribeFooter = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-top: auto;
`;

export const TribeHead = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-top: 4px;

  > div {
    flex: 1;
    min-width: 0;
  }
`;

export const TribeStats = styled.div`
  color: ${palette.muted};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  font-weight: 600;
  gap: 6px 12px;

  span {
    align-items: center;
    display: inline-flex;
    gap: 5px;
  }
`;
