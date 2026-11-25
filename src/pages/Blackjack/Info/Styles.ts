import styled from 'styled-components';

import {fonts} from 'styles';

import {plate, room} from '../theme';

export const Count = styled.span`
  ${plate};
  background: ${room.goldSoft};
  border: 1px solid ${room.gold}80;
  border-radius: 999px;
  color: ${room.goldLight};
  font-size: 10px;
  padding: 6px 11px;
  white-space: nowrap;
`;

export const Figures = styled.dl`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 18px 0 0;

  > div {
    background: #030b088c;
    border: 1px solid ${room.rim};
    border-radius: 12px;
    min-width: 0;
    padding: 11px 13px 12px;
  }

  dd {
    color: ${room.ivory};
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    line-height: 1.2;
    margin: 5px 0 0;
    overflow-wrap: anywhere;
  }

  dt {
    ${plate};
    color: ${room.mist};
    font-size: 9.5px;
  }

  small {
    color: ${room.mist};
    font-size: 10.5px;
    font-weight: ${fonts.weight.semiBold};
  }
`;

export const Footnote = styled.p`
  color: ${room.mist};
  font-size: 12.5px;
  line-height: 1.65;
  margin: 14px 0 0;
`;

export const NetFigure = styled.dd<{$net: number}>`
  && {
    color: ${({$net}) => {
      if ($net > 0) return room.mint;
      return $net < 0 ? room.ember : room.ivory;
    }};
  }
`;

export const Payouts = styled.ul`
  list-style: none;
  margin: 14px 0 0;
  padding: 0;

  li {
    align-items: center;
    border-bottom: 1px solid ${room.line};
    display: flex;
    gap: 14px;
    justify-content: space-between;
    padding: 11px 0;
  }

  li:last-child {
    border-bottom: 0;
  }

  li > div {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  span {
    color: ${room.mist};
    font-size: 12.5px;
    line-height: 1.5;
  }

  strong {
    color: ${room.ivory};
    font-size: 14px;
    font-weight: ${fonts.weight.bold};
  }
`;

export const Pays = styled.b`
  color: ${room.goldLight};
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: ${fonts.weight.extraBold};
  white-space: nowrap;
`;

export const SessionHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;
