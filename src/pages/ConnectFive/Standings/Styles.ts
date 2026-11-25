import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAvatar from 'components/Avatar';
import {Img as AvatarImg} from 'components/Avatar/Styles';
import UPagination from 'components/Pagination';
import {fonts} from 'styles';

import {winningLineCell} from '../Stones';
import {boardPanel, classic, eyebrow, ghostButton, paginationStyle} from '../theme';

export const PHONE = '600px';

export const Avatar = styled(UAvatar)<{$inLine: boolean}>`
  border-radius: 50%;
  box-shadow:
    0 0 0 2px ${classic.surface},
    0 0 0 3px ${({$inLine}) => ($inLine ? 'rgba(237, 197, 139, 0.8)' : classic.borderStrong)};
`;

// The username link next to the avatar leads to the same profile, so the avatar stays out of the tab order
export const AvatarLink = styled(Link)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
`;

export const Board = styled.section`
  ${boardPanel};
  overflow: hidden;
`;

export const Description = styled.p`
  color: ${classic.textMuted};
  font-size: 14px;
  line-height: 1.6;
  margin: 6px 0 0;
  max-width: 640px;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px 24px 44px;
  text-align: center;

  strong {
    color: ${classic.text};
    font-size: 18px;
    margin-top: 6px;
  }

  p {
    color: ${classic.textMuted};
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    max-width: 420px;
  }
`;

export const Eyebrow = styled.p`
  ${eyebrow};
  margin: 0 0 4px;
`;

export const Footer = styled.div`
  align-items: center;
  background: rgba(23, 18, 15, 0.35);
  border-top: 1px solid rgba(237, 197, 139, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 14px 18px;
  justify-content: space-between;
  padding: 16px 28px;

  @media (max-width: ${PHONE}) {
    padding: 14px 16px;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 18px;
  padding: 28px;

  @media (max-width: ${PHONE}) {
    align-items: flex-start;
    gap: 14px;
    padding: 22px 16px;
  }
`;

export const Heading = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Identity = styled.div`
  min-width: 0;
`;

export const Message = styled.div`
  align-items: center;
  color: ${classic.textSecondary};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 14px;
  padding: 40px 24px;
  text-align: center;
`;

export const NameRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0;
`;

export const Note = styled.p`
  color: ${classic.textMuted};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  ${paginationStyle};
`;

export const Period = styled.span`
  border: 1px solid ${classic.borderStrong};
  border-radius: 999px;
  color: ${classic.textMuted};
  flex-shrink: 0;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.1em;
  padding: 6px 12px;
  text-transform: uppercase;

  @media (max-width: ${PHONE}) {
    display: none;
  }
`;

export const Player = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 0;

  @media (max-width: ${PHONE}) {
    gap: 10px;

    ${AvatarImg} {
      height: 32px;
      width: 32px;
    }
  }
`;

export const PlayerNote = styled.span`
  color: ${classic.textMuted};
  display: block;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 2px;
`;

export const RankCell = styled.td<{$lineAbove: boolean; $lineBelow: boolean}>`
  ${winningLineCell};
`;

export const Retry = styled.button`
  ${ghostButton};
`;

// A row of the winning line gets a gold wash, the viewer's own row an amber one
export const Row = styled.tr<{$inLine: boolean; $isSelf?: boolean}>`
  transition: background-color 0.15s ease;

  ${({$inLine}) =>
    $inLine &&
    css`
      background-image: linear-gradient(90deg, rgba(237, 197, 139, 0.08), transparent 65%);
    `}

  ${({$isSelf}) =>
    $isSelf &&
    css`
      background-image: linear-gradient(90deg, rgba(237, 197, 139, 0.18), rgba(237, 197, 139, 0.04));
    `}

  @media (hover: hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
`;

export const SelfChip = styled.span`
  background: ${classic.focusSoft};
  border-radius: 999px;
  color: ${classic.text};
  flex-shrink: 0;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.5;
  padding: 1px 8px;
`;

// The rank column has no side padding, so the stone and the line of the winning line share its exact center
export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;

  caption {
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  th {
    background: rgba(23, 18, 15, 0.45);
    border-bottom: 1px solid rgba(237, 197, 139, 0.1);
    border-top: 1px solid rgba(237, 197, 139, 0.1);
    color: ${classic.muted};
    font-size: 10.5px;
    font-weight: ${fonts.weight.bold};
    letter-spacing: 0.1em;
    padding: 12px 16px;
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 12px 16px;
    vertical-align: middle;
  }

  tbody tr + tr td {
    border-top: 1px solid rgba(237, 197, 139, 0.08);
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
    width: 76px;
  }

  th:last-child,
  td:last-child {
    padding-right: 28px;
    text-align: right;
  }

  @media (max-width: ${PHONE}) {
    th,
    td {
      padding-left: 8px;
      padding-right: 8px;
    }

    th:first-child,
    td:first-child {
      width: 52px;
    }

    th:last-child,
    td:last-child {
      padding-right: 16px;
    }
  }
`;

export const Title = styled.h2`
  color: ${classic.text};
  font-size: 26px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0;

  @media (max-width: ${PHONE}) {
    font-size: 22px;
  }
`;

export const Username = styled(Link)`
  border-radius: 4px;
  color: ${classic.text};
  display: block;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.3;
  min-width: 0;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${classic.accent};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${classic.focus};
    outline-offset: 2px;
  }
`;
