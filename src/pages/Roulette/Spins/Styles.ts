import styled from 'styled-components';

import {fonts} from 'styles';

import {focusRing, plate, room, roomMono} from '../theme';
import {PocketColor} from '../utils';

const POCKETS: Record<PocketColor, string> = {
  black: `linear-gradient(160deg, #3a4249, ${room.black} 62%)`,
  green: `linear-gradient(160deg, #2bc27c, ${room.greenDeep} 62%)`,
  red: `linear-gradient(160deg, #e64f5f, ${room.redDeep} 62%)`,
};

export const BetLine = styled.li<{$won: boolean}>`
  align-items: baseline;
  border-bottom: 1px solid ${room.line};
  color: ${room.mist};
  display: grid;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  gap: 4px 12px;
  grid-template-columns: minmax(0, 1fr) auto minmax(96px, auto);
  padding: 7px 0;

  &:last-child {
    border-bottom: 0;
  }

  span:first-child {
    color: ${room.ivory};
  }

  strong {
    color: ${({$won}) => ($won ? room.brassLight : room.mist)};
    font-weight: ${({$won}) => ($won ? fonts.weight.bold : fonts.weight.regular)};
    text-align: right;
  }
`;

export const Bets = styled.ul`
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
`;

export const Empty = styled.p`
  border: 1px dashed ${room.line};
  border-radius: 12px;
  color: ${room.mist};
  font-size: 13.5px;
  line-height: 1.6;
  margin: 18px 0 0;
  padding: 18px;
  text-align: center;
`;

export const Failed = styled.p`
  background: linear-gradient(90deg, #4a1a1c, #2a1517);
  border: 1px solid #ff8f7d59;
  border-radius: 10px;
  color: #ffdcd5;
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0 0;
  padding: 10px 12px;
`;

export const Game = styled.span`
  ${plate};
  color: ${room.mist};
  font-size: 10px;
`;

export const Hidden = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Pocket = styled.span<{$color: PocketColor}>`
  align-items: center;
  background: ${({$color}) => POCKETS[$color]};
  border: 1px solid #ffffff2e;
  border-radius: 7px;
  color: #ffffff;
  display: inline-flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  height: 28px;
  justify-content: center;
  min-width: 28px;
  padding: 0 4px;
`;

export const Raw = styled.details`
  margin-top: 14px;

  pre {
    background: #03130e99;
    border: 1px solid ${room.rim};
    border-radius: 10px;
    color: ${room.mist};
    font-family: ${roomMono};
    font-size: 11px;
    line-height: 1.6;
    margin: 10px 0 0;
    max-height: 300px;
    overflow: auto;
    padding: 12px;
    white-space: pre-wrap;
    word-break: break-all;
  }

  summary {
    color: ${room.mist};
    cursor: pointer;
    font-size: 12.5px;
    font-weight: ${fonts.weight.semiBold};
  }
`;

export const Receipt = styled.div`
  background: #03130e73;
  border: 1px solid ${room.rim};
  border-radius: 14px;
  padding: 16px 18px 18px;
`;

export const ReceiptButton = styled.button`
  ${focusRing};
  background: transparent;
  border: 1px solid ${room.line};
  border-radius: 8px;
  color: ${room.brassLight};
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  min-height: 30px;
  padding: 0 11px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${room.brassSoft};
    border-color: ${room.brass};
  }
`;

export const ReceiptCell = styled.td`
  && {
    border-bottom: 0;
    padding: 4px 0 14px;
    text-align: left;
  }
`;

export const ReceiptNote = styled.p`
  color: ${room.mist};
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const ReceiptTitle = styled.h3`
  color: ${room.ivory};
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  margin: 0;
`;

export const Returned = styled.td<{$won: boolean}>`
  && {
    color: ${({$won}) => ($won ? room.brassLight : room.mist)};
    font-weight: ${({$won}) => ($won ? fonts.weight.bold : fonts.weight.regular)};
  }
`;

export const Row = styled.tr<{$open: boolean}>`
  td {
    border-bottom-color: ${({$open}) => ($open ? 'transparent' : room.line)};
  }
`;

export const Seeds = styled.dl`
  display: grid;
  gap: 10px;
  margin: 14px 0;

  dd {
    color: ${room.ivory};
    font-family: ${roomMono};
    font-size: 11.5px;
    line-height: 1.5;
    margin: 2px 0 0;
    word-break: break-all;
  }

  dt {
    ${plate};
    color: ${room.mist};
    font-size: 9.5px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13.5px;
  font-variant-numeric: tabular-nums;
  margin-top: 14px;
  width: 100%;

  td,
  th {
    border-bottom: 1px solid ${room.line};
    padding: 10px 8px 10px 0;
    text-align: left;
  }

  td:last-child,
  th:last-child {
    padding-right: 0;
    text-align: right;
  }

  th {
    ${plate};
    color: ${room.mist};
    font-size: 9.5px;
    padding-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 12.5px;
  }
`;

export const Verified = styled.p`
  background: #17935a26;
  border: 1px solid #7fe3b059;
  border-radius: 10px;
  color: ${room.mint};
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0 0;
  padding: 10px 12px;
`;

export const VerifyButton = styled.button`
  ${focusRing};
  background: ${room.brassSoft};
  border: 1px solid ${room.brass};
  border-radius: 10px;
  color: ${room.brassLight};
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.bold};
  min-height: 38px;
  padding: 0 16px;

  &:hover:not(:disabled) {
    background: ${room.brass}40;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;
