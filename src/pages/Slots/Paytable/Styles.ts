import styled, {keyframes} from 'styled-components';

import slotsTheme from '../theme';

const lit = keyframes`
  0%, 100% {
    box-shadow: inset 0 0 0 1px rgba(255, 215, 106, 0.55), 0 0 0 rgba(255, 215, 106, 0);
  }
  50% {
    box-shadow: inset 0 0 0 1px rgba(255, 215, 106, 0.95), 0 0 22px rgba(255, 215, 106, 0.35);
  }
`;

export const Line = styled.span`
  display: inline-flex;
  gap: 2px;

  svg {
    height: 30px;
    width: 30px;
  }
`;

export const Odds = styled.span`
  color: ${slotsTheme.textFaint};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
`;

export const Pays = styled.span`
  display: grid;
  line-height: 1.2;

  strong {
    color: ${slotsTheme.goldLight};
    font-size: 16px;
    font-variant-numeric: tabular-nums;
  }

  span {
    color: ${slotsTheme.textMuted};
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    min-height: 13px;
  }
`;

export const Row = styled.li`
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr auto;
  padding: 7px 10px;
  transition: background 0.3s ease;

  &[data-lit] {
    animation: ${lit} 1s ease-in-out infinite;
    background: rgba(255, 215, 106, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-lit] {
      animation: none;
      box-shadow: inset 0 0 0 1px rgba(255, 215, 106, 0.95);
    }
  }
`;

export const Rows = styled.ul`
  display: grid;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`;
