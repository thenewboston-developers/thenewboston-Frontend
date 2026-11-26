import styled from 'styled-components';

import {easing, palette, shadows} from '../theme';

export * from '../Styles';

export const Disclosure = styled.details`
  border-top: 1px solid ${palette.lineSoft};
  margin-top: 14px;
  padding-top: 12px;

  summary {
    color: ${palette.moss};
    cursor: pointer;
    font-size: 13px;
    font-weight: 650;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    content: '+';
    display: inline-block;
    font-weight: 700;
    margin-right: 8px;
    transition: rotate 0.2s ease;
  }

  &[open] summary::before {
    rotate: 45deg;
  }

  summary:focus-visible {
    border-radius: 6px;
    box-shadow: ${shadows.focus};
    outline: none;
  }
`;

export const Force = styled.div<{$tone: 'ember' | 'gold' | 'sky'}>`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 12px 14px;

  span {
    align-items: center;
    color: #a9bfb1;
    display: flex;
    font-size: 10.5px;
    font-weight: 700;
    gap: 6px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  svg {
    color: ${({$tone}) => ({ember: '#f08a70', gold: palette.goldBright, sky: '#8fc7e6'})[$tone]};
  }

  strong {
    color: ${palette.white};
    display: block;
    font-feature-settings: 'tnum';
    font-size: 26px;
    font-weight: 750;
    letter-spacing: -0.03em;
    margin-top: 2px;
  }
`;

export const Forces = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin: 4px 0 16px;
`;

export const Reference = styled.span`
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: ${palette.white};
  display: inline-flex;
  font-size: 12.5px;
  font-weight: 650;
  gap: 8px;
  padding: 5px 12px 5px 7px;

  small {
    color: #a9bfb1;
    display: block;
    font-size: 11px;
    font-weight: 500;
  }
`;

export const Unit = styled.article<{$focused: boolean}>`
  background: ${palette.white};
  border: 1px solid ${({$focused}) => ($focused ? palette.ember : palette.line)};
  border-radius: 16px;
  box-shadow: ${({$focused}) => ($focused ? `0 0 0 1px ${palette.ember}, ${shadows.lifted}` : shadows.card)};
  min-width: 0;
  padding: 18px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ${easing.out};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const UnitHead = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 6px;

  > span:first-child {
    align-items: center;
    background: #faf7ee;
    border: 1px solid ${palette.line};
    border-radius: 14px;
    display: inline-flex;
    flex-shrink: 0;
    height: 60px;
    justify-content: center;
    width: 60px;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  h2 {
    font-size: 17px;
    margin: 0 0 4px;
  }
`;
