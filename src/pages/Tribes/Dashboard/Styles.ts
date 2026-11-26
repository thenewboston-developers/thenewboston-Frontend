import styled from 'styled-components';

import {fonts, palette} from '../theme';

export * from '../Styles';

export const Briefing = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  margin-bottom: 14px;

  h2 {
    font-family: ${fonts.display};
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0;
  }
`;

export const Move = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  padding: 12px 14px;

  > span {
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    display: inline-flex;
    flex-shrink: 0;
    height: 46px;
    justify-content: center;
    width: 46px;
  }

  > div {
    flex: 1;
    min-width: 180px;
  }

  strong {
    color: ${palette.white};
    display: block;
    font-size: 14.5px;
  }

  small {
    color: #a9bfb1;
    display: block;
    font-size: 12.5px;
    line-height: 1.5;
    margin-top: 1px;
  }
`;

export const Moves = styled.div`
  display: grid;
  gap: 8px;
`;

export const Power = styled.div<{$own: boolean}>`
  align-items: center;
  background: ${({$own}) => ($own ? palette.goldWash : 'transparent')};
  border-bottom: 1px solid ${palette.lineSoft};
  border-radius: ${({$own}) => ($own ? '12px' : 0)};
  display: flex;
  gap: 11px;
  margin: 0 -8px;
  padding: 10px 8px;

  &:last-child {
    border-bottom: 0;
  }

  > div {
    flex: 1;
    min-width: 0;
  }

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

export const PowerStats = styled.span`
  display: flex;
  flex-shrink: 0;
  gap: 6px;
`;
