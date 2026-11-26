import styled from 'styled-components';

import {fonts, palette} from '../theme';

export * from '../Styles';

export const Balance = styled.h2<{$light?: boolean}>`
  align-items: baseline;
  color: ${({$light}) => ($light ? palette.white : palette.text)} !important;
  display: flex;
  font-family: ${fonts.ui};
  font-feature-settings: 'tnum';
  font-size: 34px !important;
  font-weight: 750 !important;
  gap: 8px;
  letter-spacing: -0.035em !important;
  margin: 2px 0 8px !important;

  small {
    color: ${({$light}) => ($light ? palette.goldBright : palette.goldDeep)};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`;

export const Forms = styled.div`
  display: grid;
  gap: 4px 14px;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
`;

export const Good = styled.div<{$empty: boolean}>`
  align-items: center;
  background: ${({$empty}) => ($empty ? '#faf7ee' : palette.white)};
  border: 1px solid ${palette.line};
  border-radius: 14px;
  display: flex;
  gap: 12px;
  min-width: 0;
  padding: 11px 12px;

  > svg {
    filter: ${({$empty}) => ($empty ? 'grayscale(0.7)' : 'none')};
    opacity: ${({$empty}) => ($empty ? 0.6 : 1)};
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  strong {
    color: ${({$empty}) => ($empty ? palette.muted : palette.text)};
    display: block;
    font-size: 13.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const GoodCounts = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 3px;

  span {
    color: ${palette.faint};
    font-size: 11px;
    font-weight: 600;
  }

  b {
    color: ${palette.text};
    font-feature-settings: 'tnum';
    font-size: 13.5px;
    font-weight: 750;
    margin-right: 4px;
  }
`;

export const Goods = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(min(190px, 100%), 1fr));
  margin-bottom: 16px;
`;

export const GroupTitle = styled.h3`
  color: ${palette.faint} !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.1em !important;
  margin: 4px 0 8px !important;
  text-transform: uppercase;
`;

export const Purse = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;

  > span {
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    display: inline-flex;
    flex-shrink: 0;
    height: 68px;
    justify-content: center;
    width: 68px;
  }

  > div {
    min-width: 0;
  }
`;
