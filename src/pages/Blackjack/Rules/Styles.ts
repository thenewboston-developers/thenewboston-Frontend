import styled from 'styled-components';

import {fonts} from 'styles';

import {plate, room, roomPanel} from '../theme';

export const Footnote = styled.p`
  color: ${room.mist};
  font-size: 12.5px;
  margin: 12px 0 4px;
`;

export const Rules = styled.details`
  ${roomPanel};
  color: ${room.mist};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 28px;
  scroll-margin-top: 20px;

  ol {
    font-size: 14px;
    margin: 16px 0 18px;
    max-width: 860px;
    padding-left: 20px;
  }

  summary {
    align-items: center;
    color: ${room.ivory};
    cursor: pointer;
    display: flex;
    font-weight: ${fonts.weight.semiBold};
    gap: 14px;
    list-style: none;
    min-height: 32px;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::before {
    background: radial-gradient(circle, ${room.goldLight} 0 2px, transparent 3px);
    border: 1px solid ${room.gold}99;
    border-radius: 50%;
    content: '';
    flex: 0 0 auto;
    height: 22px;
    width: 22px;
  }

  summary::after {
    border-bottom: 2px solid ${room.ivory};
    border-right: 2px solid ${room.ivory};
    content: '';
    height: 8px;
    margin-left: auto;
    transform: rotate(45deg) translateY(-3px);
    transition: transform 0.2s ease;
    width: 8px;
  }

  summary:focus-visible {
    outline: 2px solid ${room.goldLight};
    outline-offset: 6px;
  }

  &[open] summary::after {
    transform: rotate(-135deg) translateY(-3px);
  }

  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 18px;
  }
`;

export const Values = styled.table`
  border-collapse: collapse;
  font-size: 13.5px;
  margin-top: 6px;
  max-width: 720px;
  width: 100%;

  td,
  th {
    border-bottom: 1px solid ${room.line};
    padding: 10px 12px 10px 0;
    text-align: left;
  }

  td:last-child {
    color: ${room.goldLight};
    font-weight: ${fonts.weight.bold};
  }

  th {
    ${plate};
    color: ${room.mist};
    font-size: 9.5px;
  }
`;
