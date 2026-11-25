import styled from 'styled-components';

import {fonts} from 'styles';

import {focusRing, plate, table, tableMono} from '../theme';

export const Empty = styled.p`
  border: 1px dashed ${table.line};
  border-radius: 12px;
  color: ${table.mist};
  font-size: 13.5px;
  margin: 18px 0 0;
  padding: 22px 16px;
  text-align: center;
`;

export const Failed = styled.p`
  background: #c6323f26;
  border: 1px solid #ff9d8f66;
  border-radius: 9px;
  color: #ffd2cb;
  font-size: 13px;
  line-height: 1.55;
  margin: 12px 0 0;
  padding: 9px 12px;
`;

export const Hidden = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const MiniCard = styled.span<{$red: boolean}>`
  background: ${table.ivory};
  border-radius: 4px;
  color: ${({$red}) => ($red ? table.red : table.spade)};
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 12.5px;
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  padding: 4px 4px 3px;
  white-space: nowrap;
`;

export const MiniCards = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

export const Raw = styled.details`
  margin-top: 14px;

  pre {
    background: #050e24b3;
    border: 1px solid ${table.rim};
    border-radius: 10px;
    color: ${table.mist};
    font-family: ${tableMono};
    font-size: 11.5px;
    line-height: 1.55;
    margin: 10px 0 0;
    max-height: 320px;
    overflow: auto;
    padding: 12px 14px;
  }

  summary {
    color: ${table.goldLight};
    cursor: pointer;
    font-size: 13px;
    font-weight: ${fonts.weight.semiBold};
  }

  summary:focus-visible {
    outline: 2px solid ${table.goldLight};
    outline-offset: 4px;
  }
`;

export const Receipt = styled.div`
  background: #050e2466;
  border: 1px solid ${table.rim};
  border-radius: 12px;
  padding: 16px 18px 18px;
`;

export const ReceiptButton = styled.button`
  ${focusRing};
  background: transparent;
  border: 1px solid ${table.line};
  border-radius: 8px;
  color: ${table.goldLight};
  cursor: pointer;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: ${fonts.weight.semiBold};
  min-height: 32px;
  padding: 0 11px;

  &:hover {
    background: #ffffff14;
    border-color: ${table.gold};
  }
`;

export const ReceiptCell = styled.td`
  && {
    border-bottom: 0;
    padding: 4px 0 14px;
  }
`;

export const ReceiptNote = styled.p`
  color: ${table.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 8px 0 0;
`;

export const ReceiptTitle = styled.h3`
  color: ${table.ivory};
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  margin: 0;
`;

export const Returned = styled.td<{$won: boolean}>`
  && {
    color: ${({$won}) => ($won ? table.win : table.mist)};
    font-weight: ${fonts.weight.bold};
  }
`;

export const Riding = styled.span`
  color: ${table.mist};
  display: block;
  font-size: 11.5px;
  margin-top: 2px;
`;

export const Row = styled.tr<{$open: boolean}>`
  td {
    background: ${({$open}) => ($open ? '#ffffff0a' : 'transparent')};
  }
`;

export const Scroll = styled.div`
  margin-top: 16px;
  overflow-x: auto;
`;

export const Seeds = styled.dl`
  display: grid;
  gap: 10px;
  margin: 14px 0;

  dd {
    color: ${table.ivory};
    font-family: ${tableMono};
    font-size: 11.5px;
    line-height: 1.5;
    margin: 3px 0 0;
    overflow-wrap: anywhere;
  }

  dt {
    ${plate};
    color: ${table.mist};
    font-size: 9.5px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13.5px;
  min-width: 460px;
  width: 100%;

  td,
  th {
    border-bottom: 1px solid ${table.line};
    padding: 10px 10px 10px 0;
    text-align: left;
    vertical-align: middle;
  }

  td {
    color: ${table.ivory};
    font-variant-numeric: tabular-nums;
  }

  td:last-child,
  th:last-child {
    padding-right: 0;
    text-align: right;
  }

  th {
    ${plate};
    color: ${table.mist};
    font-size: 9.5px;
  }
`;

export const Verified = styled.p`
  background: #7fe3b01f;
  border: 1px solid ${table.win}80;
  border-radius: 9px;
  color: ${table.win};
  font-size: 13px;
  line-height: 1.55;
  margin: 12px 0 0;
  padding: 9px 12px;
`;

export const VerifyButton = styled.button`
  ${focusRing};
  background: linear-gradient(180deg, ${table.goldLight}, ${table.gold});
  border: 1px solid ${table.goldLight};
  border-radius: 9px;
  color: ${table.ink};
  cursor: pointer;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: ${fonts.weight.bold};
  min-height: 38px;
  padding: 0 16px;

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;
