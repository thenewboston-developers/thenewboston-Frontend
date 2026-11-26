import styled from 'styled-components';

import {breakpoints} from 'styles';

import {palette} from '../theme';

export * from '../Styles';

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 18px 18px;
`;

export const LegendItem = styled.span`
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: ${palette.white};
  display: inline-flex;
  font-size: 12.5px;
  font-weight: 650;
  gap: 8px;
  padding: 6px 12px 6px 8px;

  small {
    color: #a9bfb1;
    display: block;
    font-size: 11px;
    font-weight: 500;
  }
`;

export const MapFrame = styled.div`
  padding: 0 12px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 8px;
  }
`;

export const MapHead = styled.div`
  padding: 20px 22px 14px;

  h2 {
    margin: 0;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px 16px 12px;
  }
`;

export const PlotArt = styled.span<{$color?: string}>`
  align-items: center;
  background: ${({$color}) => ($color ? `${$color}22` : '#eef4e6')};
  border: 1px solid ${({$color}) => ($color ? `${$color}55` : '#d8e4cc')};
  border-radius: 18px;
  display: inline-flex;
  flex-shrink: 0;
  height: 72px;
  justify-content: center;
  width: 72px;
`;

export const PlotHead = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  margin-bottom: 10px;

  h2 {
    margin: 0;
  }
`;

export const Structures = styled.span`
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;

  span {
    align-items: center;
    background: #f4efe2;
    border-radius: 8px;
    display: inline-flex;
    font-size: 12px;
    font-weight: 650;
    gap: 5px;
    padding: 3px 8px 3px 4px;
  }
`;
