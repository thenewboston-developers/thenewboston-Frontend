import styled from 'styled-components';

import {easing, palette, shadows} from '../theme';

export * from '../Styles';

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
