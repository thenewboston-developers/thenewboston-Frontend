import {css} from 'styled-components';

import {BadgeStyle} from 'components/Badge';
import {ButtonColor} from 'components/Button/types';
import {
  CreateAccount,
  GuestDescription,
  Notice as RewardNotice,
  PaidAmount,
  PaidCurrency,
  PaidDescription,
  PaidRewardLabel,
  PaidTitle,
  RewardLabel,
} from 'components/ComputerRewardNotice/Styles';
import {Description, Eyebrow, Panel, Title} from 'components/GameResultPanel/Styles';
import {breakpoints, fonts} from 'styles';

import {boardPanel, classic} from '../theme';

export const matchButton = css<{color?: ButtonColor}>`
  background: ${({color}) => (color === ButtonColor.secondary ? classic.surfaceRaised : classic.accent)};
  border: 1px solid ${({color}) => (color === ButtonColor.danger ? classic.negative : classic.borderStrong)};
  color: ${({color}) => (color === ButtonColor.secondary ? classic.text : classic.accentInk)};

  ${({color}) =>
    color === ButtonColor.danger &&
    css`
      background: ${classic.negativeSoft};
      color: ${classic.negative};
    `}

  &:hover:not(:disabled) {
    background: ${({color}) =>
      color === ButtonColor.secondary || color === ButtonColor.danger ? classic.surfaceRaised : classic.board};
  }

  &:focus-visible {
    outline: 2px solid ${classic.focus};
    outline-offset: 3px;
  }

  &:disabled {
    background: ${classic.surfaceRaised};
    border-color: ${classic.border};
    color: ${classic.muted};
    cursor: not-allowed;
  }
`;

export const matchPanel = css`
  ${boardPanel};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 20px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px;
  }
`;

export const matchStatus = css<{badgeStyle: BadgeStyle}>`
  background: ${classic.accentSoft};
  border: 1px solid ${classic.borderStrong};
  border-radius: 999px;
  color: ${classic.accent};
  flex-shrink: 0;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 3px 10px;

  ${({badgeStyle}) => {
    if (badgeStyle === BadgeStyle.danger || badgeStyle === BadgeStyle.lightRed)
      return css`
        background: ${classic.negativeSoft};
        color: ${classic.negative};
      `;
    if (badgeStyle === BadgeStyle.success || badgeStyle === BadgeStyle.lightGreen)
      return css`
        background: ${classic.positiveSoft};
        color: ${classic.positive};
      `;
    if (badgeStyle === BadgeStyle.neutral)
      return css`
        background: ${classic.surfaceRaised};
        color: ${classic.textMuted};
      `;
    return undefined;
  }}
`;

export const resultPanel = css`
  ${RewardNotice} {
    background: ${classic.surfaceRaised};
    border-color: ${classic.borderStrong};
    box-shadow: none;
    color: ${classic.textSecondary};
  }

  ${GuestDescription}, ${PaidDescription}, ${RewardLabel} {
    color: ${classic.textMuted};
  }

  ${PaidAmount}, ${PaidTitle} {
    color: ${classic.text};
  }

  ${PaidCurrency}, ${PaidRewardLabel} {
    color: ${classic.accent};
  }

  ${CreateAccount} {
    background: ${classic.accent};
    color: ${classic.accentInk};

    &:focus-visible {
      outline-color: ${classic.focus};
    }
  }

  ${Panel} {
    background: radial-gradient(ellipse at 90% 0, ${classic.accentSoft}, transparent 65%), ${classic.surface};
    border-color: ${classic.borderStrong};
    color: ${classic.text};
    margin: 0;

    &::before {
      background: linear-gradient(90deg, transparent, ${classic.accent}, transparent);
    }

    &::after {
      background-image:
        linear-gradient(${classic.grid} 1px, transparent 1px),
        linear-gradient(90deg, ${classic.grid} 1px, transparent 1px);
    }
  }

  ${Description}, ${Eyebrow} span {
    color: ${classic.textMuted};
  }

  ${Eyebrow}, ${Eyebrow} strong {
    color: ${classic.accent};
  }

  ${Title} {
    color: ${classic.text};
  }
`;
