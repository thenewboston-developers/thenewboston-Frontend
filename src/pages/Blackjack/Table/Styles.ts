import styled from 'styled-components';

import {fonts} from 'styles';

import {focusRing, plate, room, roomPanel} from '../theme';

export const Admin = styled.div`
  margin-top: 24px;
`;

export const Column = styled.div`
  display: grid;
  gap: 24px;
  min-width: 0;
`;

export const Eyebrow = styled.p`
  ${plate};
  color: ${room.gold};
  grid-area: eyebrow;
  margin: 0 0 5px;

  @media (max-width: 600px) {
    font-size: 10px;
    letter-spacing: 0.12em;
  }
`;

export const Header = styled.header`
  align-items: center;
  column-gap: 16px;
  display: grid;
  grid-template-areas:
    'eyebrow tools'
    'title tools';
  grid-template-columns: minmax(0, 1fr) auto;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    grid-template-areas:
      'eyebrow eyebrow'
      'title tools';
  }
`;

export const HeaderTools = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  grid-area: tools;
`;

export const Limits = styled.span`
  background: #030b088c;
  border: 1px solid ${room.rim};
  border-radius: 999px;
  color: ${room.mist};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  padding: 7px 13px;
  white-space: nowrap;

  strong {
    color: ${room.goldLight};
    font-weight: ${fonts.weight.bold};
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Panels = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Status = styled.span<{$open: boolean}>`
  ${plate};
  align-items: center;
  background: #030b088c;
  border: 1px solid ${room.rim};
  border-radius: 999px;
  color: ${({$open}) => ($open ? room.mint : room.mist)};
  display: inline-flex;
  font-size: 10px;
  gap: 8px;
  padding: 8px 13px;
  white-space: nowrap;

  &::before {
    background: ${({$open}) => ($open ? room.mint : room.mist)};
    border-radius: 50%;
    box-shadow: ${({$open}) => ($open ? `0 0 8px ${room.mint}` : 'none')};
    content: '';
    height: 7px;
    width: 7px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

// The table and everything a hand goes through, in one panel
export const Table = styled.section`
  ${roomPanel};
  min-width: 0;
  padding: 14px 22px 20px;
  scroll-margin-top: 16px;

  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 14px 10px 12px;
  }
`;

export const Title = styled.h2`
  color: ${room.ivory};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  grid-area: title;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

export const Toggle = styled.button<{$active: boolean}>`
  ${focusRing};
  align-items: center;
  background: ${({$active}) => ($active ? room.goldSoft : '#030b088c')};
  border: 1px solid ${({$active}) => ($active ? room.gold : room.rim)};
  border-radius: 50%;
  color: ${({$active}) => ($active ? room.goldLight : room.mist)};
  cursor: pointer;
  display: inline-flex;
  height: 36px;
  justify-content: center;
  padding: 0;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  width: 36px;

  &:hover {
    border-color: ${room.goldLight};
    color: ${room.goldLight};
  }
`;
