import styled from 'styled-components';

import slotsTheme from '../theme';

export const Details = styled.details`
  margin-top: 14px;

  summary {
    color: ${slotsTheme.textMuted};
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
  }

  summary:focus-visible {
    outline: 2px solid ${slotsTheme.gold};
    outline-offset: 2px;
  }
`;

export const Facts = styled.dl`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 16px 0 0;

  div {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 12px;
    padding: 10px 12px;
  }

  dt {
    color: ${slotsTheme.textFaint};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  dd {
    color: ${slotsTheme.text};
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    margin: 4px 0 0;
  }

  dd[data-sign='up'] {
    color: ${slotsTheme.positive};
  }

  dd[data-sign='down'] {
    color: ${slotsTheme.negative};
  }

  small {
    color: ${slotsTheme.textFaint};
    font-size: 11px;
    font-weight: 500;
  }
`;

export const Failed = styled.p`
  color: ${slotsTheme.negative};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

export const Line = styled.div`
  background: linear-gradient(180deg, #ece8f4, #fdfcff 50%, #ece8f4);
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(36, 16, 63, 0.3);
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-items: center;
  padding: 10px;

  svg {
    height: 54px;
    width: 54px;
  }
`;

export const Raw = styled.pre`
  background: rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  color: ${slotsTheme.textMuted};
  font-size: 11px;
  margin: 12px 0 0;
  max-height: 260px;
  overflow: auto;
  padding: 12px;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const Seeds = styled.dl`
  display: grid;
  gap: 8px;
  margin: 12px 0 0;

  dt {
    color: ${slotsTheme.textFaint};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  dd {
    color: ${slotsTheme.text};
    font-family: 'SFMono-Regular', Menlo, Consolas, monospace;
    font-size: 12px;
    margin: 2px 0 0;
    word-break: break-all;
  }
`;

export const Steps = styled.ol`
  color: ${slotsTheme.textMuted};
  display: grid;
  font-size: 13px;
  gap: 8px;
  line-height: 1.55;
  margin: 12px 0 0;
  padding-left: 20px;

  li::marker {
    color: ${slotsTheme.gold};
    font-weight: 700;
  }
`;

export const Verified = styled.p`
  color: ${slotsTheme.positive};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

export const Verify = styled.div`
  align-items: flex-start;
  display: grid;
  gap: 8px;
  justify-items: start;
  margin-top: 14px;
`;
