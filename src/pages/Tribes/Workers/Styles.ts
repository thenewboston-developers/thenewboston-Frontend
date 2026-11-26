import styled from 'styled-components';

import {easing, palette, shadows} from '../theme';

export * from '../Styles';

export const Detail = styled.div`
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 16px;
  margin-top: 16px;
  padding: 18px;
`;

export const DetailHead = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;

  > span {
    align-items: center;
    background: ${palette.white};
    border: 1px solid ${palette.line};
    border-radius: 16px;
    display: inline-flex;
    flex-shrink: 0;
    height: 72px;
    justify-content: center;
    width: 72px;
  }

  h3 {
    font-size: 18px;
    letter-spacing: -0.02em;
    margin: 0 0 3px;
  }

  p {
    color: ${palette.muted};
    font-size: 13px;
    line-height: 1.5;
    margin: 0;
  }
`;

export const Estimate = styled.div<{$warning?: boolean}>`
  align-items: center;
  background: ${({$warning}) => ($warning ? palette.emberWash : '#eef5ea')};
  border: 1px solid ${({$warning}) => ($warning ? '#f0cabf' : '#d3e4cd')};
  border-radius: 12px;
  color: ${({$warning}) => ($warning ? palette.emberDeep : '#2a5a43')};
  display: flex;
  font-size: 13px;
  font-weight: 600;
  gap: 10px;
  line-height: 1.45;
  padding: 10px 12px;

  svg {
    flex-shrink: 0;
  }

  strong {
    font-weight: 750;
  }
`;

export const Facts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 4px;
`;

export const Ingredient = styled.span<{$short: boolean}>`
  align-items: center;
  background: ${({$short}) => ($short ? palette.emberWash : palette.white)};
  border: 1px solid ${({$short}) => ($short ? '#f0cabf' : palette.line)};
  border-radius: 12px;
  display: inline-flex;
  font-size: 13px;
  font-weight: 650;
  gap: 8px;
  padding: 6px 12px 6px 8px;

  small {
    color: ${({$short}) => ($short ? palette.emberDeep : palette.faint)};
    display: block;
    font-size: 11px;
    font-weight: 600;
  }
`;

export const Ingredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 2px;
`;

export const Job = styled.div`
  border-bottom: 1px solid ${palette.lineSoft};
  padding: 14px 0;

  &:last-of-type {
    border-bottom: 0;
  }
`;

export const JobHead = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  justify-content: space-between;

  strong {
    font-size: 14px;
  }

  small {
    color: ${palette.faint};
    display: block;
    font-size: 12px;
    margin-top: 2px;
  }
`;

export const JobIcon = styled.span<{$working: boolean}>`
  align-items: center;
  background: ${({$working}) => ($working ? palette.goldWash : '#f4efe2')};
  border: 1px solid ${({$working}) => ($working ? '#efdcae' : palette.line)};
  border-radius: 12px;
  display: inline-flex;
  flex-shrink: 0;
  height: 44px;
  justify-content: center;
  width: 44px;
`;

export const Meter = styled.div`
  background: #faf7ee;
  border: 1px solid ${palette.line};
  border-radius: 12px;
  margin-bottom: 6px;
  padding: 10px 12px 8px;

  > div:first-child {
    align-items: baseline;
    color: ${palette.muted};
    display: flex;
    font-size: 12px;
    font-weight: 650;
    justify-content: space-between;
  }

  strong {
    color: ${palette.text};
  }
`;

export const Recipe = styled.button<{$selected: boolean}>`
  align-items: center;
  background: ${({$selected}) => ($selected ? '#f2f8ef' : palette.white)};
  border: 1px solid ${({$selected}) => ($selected ? palette.moss : palette.line)};
  border-radius: 14px;
  box-shadow: ${({$selected}) => ($selected ? `0 0 0 1px ${palette.moss}` : 'none')};
  color: ${palette.text};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font: inherit;
  font-size: 12.5px;
  font-weight: 650;
  gap: 6px;
  line-height: 1.2;
  min-width: 0;
  padding: 12px 6px 10px;
  text-align: center;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.18s ${easing.out};

  small {
    color: ${palette.faint};
    font-size: 11px;
    font-weight: 600;
  }

  &:hover {
    border-color: ${({$selected}) => ($selected ? palette.moss : '#cfc6ae')};
    transform: translateY(-2px);
  }

  &:focus-visible {
    box-shadow: ${shadows.focus};
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Recipes = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  margin-top: 12px;
`;

export const Structure = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;
