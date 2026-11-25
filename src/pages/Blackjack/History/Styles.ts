import styled from 'styled-components';

import {fonts} from 'styles';

import {focusRing, plate, room, roomMono} from '../theme';

type OutcomeTone = 'blackjack' | 'loss' | 'push' | 'win';

const tones: Record<OutcomeTone, {background: string; border: string; color: string}> = {
  blackjack: {background: `${room.gold}24`, border: `${room.gold}99`, color: room.goldLight},
  loss: {background: '#dc3d471f', border: '#dc3d4766', color: room.ember},
  push: {background: '#ffffff0d', border: room.line, color: room.ivory},
  win: {background: '#21ad6624', border: '#21ad6680', color: room.mint},
};

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

export const Figures = styled.dl`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 14px 0 0;

  dd {
    color: ${room.ivory};
    font-size: 17px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    margin: 4px 0 0;
  }

  dt {
    ${plate};
    color: ${room.mist};
    font-size: 9.5px;
  }
`;

export const HandLine = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
  min-width: 0;

  > span:nth-child(2) {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 3px;
  }
`;

export const Hands = styled.div`
  display: grid;
  gap: 5px;
  min-width: 0;
`;

export const HandTotal = styled.span`
  color: ${room.ivory};
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
`;

// A card in the history: its rank and suit on a small ivory tile
export const MiniCard = styled.span<{$red: boolean}>`
  background: ${room.cardFace};
  border-radius: 4px;
  box-shadow: 0 1px 0 #00000059;
  color: ${({$red}) => ($red ? room.cardRed : room.cardInk)};
  font-size: 12px;
  font-variant-emoji: text;
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  min-width: 26px;
  padding: 4px 4px 3px;
  text-align: center;
`;

export const Money = styled.div`
  color: ${room.mist};
  display: grid;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  gap: 2px;
  text-align: right;
  white-space: nowrap;
`;

export const Net = styled.strong<{$tone: OutcomeTone}>`
  color: ${({$tone}) => tones[$tone].color};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;

export const Outcome = styled.span<{$tone: OutcomeTone}>`
  ${plate};
  background: ${({$tone}) => tones[$tone].background};
  border: 1px solid ${({$tone}) => tones[$tone].border};
  border-radius: 999px;
  color: ${({$tone}) => tones[$tone].color};
  font-size: 9.5px;
  justify-self: start;
  padding: 6px 10px;
  white-space: nowrap;
`;

export const Owner = styled.span`
  ${plate};
  color: ${room.mist};
  font-size: 9px;
  min-width: 44px;
`;

export const Raw = styled.details`
  margin-top: 14px;

  pre {
    background: #030b0899;
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
  background: #030b0873;
  border: 1px solid ${room.rim};
  border-radius: 14px;
  margin-top: 12px;
  padding: 16px 18px 18px;
`;

export const ReceiptButton = styled.button`
  ${focusRing};
  background: transparent;
  border: 1px solid ${room.line};
  border-radius: 8px;
  color: ${room.goldLight};
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  min-height: 34px;
  padding: 0 12px;

  &:hover {
    border-color: ${room.gold};
  }
`;

export const ReceiptNote = styled.p`
  color: ${room.mist};
  font-size: 12.5px;
  line-height: 1.65;
  margin: 6px 0 0;
`;

export const ReceiptTitle = styled.h3`
  color: ${room.ivory};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin: 0;
`;

export const Row = styled.li<{$open: boolean}>`
  border-bottom: 1px solid ${room.line};
  padding: 12px 0 ${({$open}) => ($open ? '16px' : '12px')};

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

export const Rows = styled.ul`
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
`;

export const Seeds = styled.dl`
  display: grid;
  gap: 10px;
  margin: 14px 0 0;

  dd {
    color: ${room.ivory};
    font-family: ${roomMono};
    font-size: 11.5px;
    line-height: 1.5;
    margin: 3px 0 0;
    overflow-wrap: anywhere;
  }

  dt {
    ${plate};
    color: ${room.mist};
    font-size: 9.5px;
  }
`;

export const Summary = styled.div`
  align-items: center;
  display: grid;
  gap: 10px 16px;
  grid-template-columns: 112px minmax(0, 1fr) auto auto;

  @media (max-width: 620px) {
    grid-template-areas:
      'outcome money'
      'hands hands'
      'receipt receipt';
    grid-template-columns: minmax(0, 1fr) auto;

    > :nth-child(1) {
      grid-area: outcome;
    }

    > :nth-child(2) {
      grid-area: hands;
    }

    > :nth-child(3) {
      grid-area: money;
    }

    > :nth-child(4) {
      grid-area: receipt;
      justify-self: start;
    }
  }
`;

export const Verified = styled.p`
  background: #21ad661f;
  border: 1px solid #21ad6666;
  border-radius: 10px;
  color: ${room.mint};
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0 0;
  padding: 10px 12px;
`;

export const VerifyButton = styled.button`
  ${focusRing};
  background: ${room.goldSoft};
  border: 1px solid ${room.gold};
  border-radius: 10px;
  color: ${room.goldLight};
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: ${fonts.weight.bold};
  margin-top: 16px;
  min-height: 42px;
  padding: 0 18px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background: ${room.gold}33;
  }
`;
