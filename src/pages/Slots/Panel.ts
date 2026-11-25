import styled from 'styled-components';

import slotsTheme from './theme';

// Frosted panels that sit on the dark casino floor around the machine.

export const Badge = styled.span`
  background: rgba(246, 196, 83, 0.12);
  border: 1px solid rgba(246, 196, 83, 0.35);
  border-radius: 999px;
  color: ${slotsTheme.goldLight};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  white-space: nowrap;
`;

export const Card = styled.section`
  backdrop-filter: blur(10px);
  background: linear-gradient(180deg, rgba(34, 24, 80, 0.72), rgba(16, 11, 46, 0.78));
  border: 1px solid ${slotsTheme.panelBorder};
  border-radius: 20px;
  box-shadow:
    0 18px 40px rgba(4, 2, 16, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: ${slotsTheme.text};
  min-width: 0;
  padding: 20px;
`;

export const CardHeader = styled.header`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const CardTitle = styled.h2`
  color: ${slotsTheme.text};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
`;

export const Eyebrow = styled.p`
  color: ${slotsTheme.gold};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 6px;
  text-transform: uppercase;
`;

export const GhostButton = styled.button`
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  color: ${slotsTheme.text};
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  font-weight: 600;
  gap: 6px;
  padding: 8px 14px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 233, 168, 0.45);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid ${slotsTheme.gold};
    outline-offset: 2px;
  }
`;

export const Note = styled.p`
  color: ${slotsTheme.textMuted};
  font-size: 13px;
  line-height: 1.6;
  margin: 10px 0 0;
`;
