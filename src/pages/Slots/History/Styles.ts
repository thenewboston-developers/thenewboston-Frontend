import styled from 'styled-components';

import {breakpoints} from 'styles';

import slotsTheme from '../theme';

export const Amount = styled.span`
  color: ${slotsTheme.text};
  display: grid;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;

  small {
    color: ${slotsTheme.textFaint};
    font-size: 11px;
    font-weight: 600;
  }

  &[data-sign='up'] small {
    color: ${slotsTheme.positive};
  }

  &[data-sign='down'] small {
    color: ${slotsTheme.negative};
  }
`;

export const Empty = styled.div`
  align-items: center;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  display: grid;
  justify-items: center;
  padding: 26px 16px 22px;
  text-align: center;

  p {
    margin: 0;
  }
`;

export const EmptyLine = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  opacity: 0.55;

  svg {
    height: 42px;
    width: 42px;
  }
`;

export const Item = styled.li`
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  border-radius: 14px;
  display: grid;
  gap: 14px;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  padding: 8px 10px 8px 12px;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &[data-tier='win'],
  &[data-tier='nice'],
  &[data-tier='big'],
  &[data-tier='huge'],
  &[data-tier='jackpot'] {
    background: linear-gradient(90deg, rgba(255, 215, 106, 0.12), rgba(255, 215, 106, 0.02) 60%);
    box-shadow: inset 3px 0 0 ${slotsTheme.gold};
  }

  &[data-selected] {
    border-color: rgba(255, 233, 168, 0.5);
  }

  @media (max-width: ${breakpoints.mini}) {
    gap: 10px;
    grid-template-columns: auto minmax(0, 1fr) auto;

    button {
      grid-column: 1 / -1;
      justify-content: center;
    }
  }
`;

export const Line = styled.span`
  display: inline-flex;
  gap: 2px;

  svg {
    height: 26px;
    width: 26px;
  }
`;

export const List = styled.ul`
  display: grid;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Summary = styled.span`
  display: grid;
  line-height: 1.35;
  min-width: 0;

  strong {
    color: ${slotsTheme.text};
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: ${slotsTheme.textFaint};
    font-size: 12px;
  }
`;
