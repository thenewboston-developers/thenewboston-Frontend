import MdiIcon from '@mdi/react';
import styled from 'styled-components';

import {colors, controlStyle, fonts, radii} from 'styles';

const CHEVRON_COLOR = encodeURIComponent(colors.secondary);
const CHEVRON_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='${CHEVRON_COLOR}' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`;
const CONTROL_HEIGHT = 40;
const LOGO_SIZE = 36;

export const Amounts = styled.div`
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  text-align: right;
`;

export const Balance = styled.div<{$isEmpty: boolean}>`
  color: ${({$isEmpty}) => ($isEmpty ? colors.secondary : colors.primary)};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const Controls = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 4px 12px;
`;

export const Detail = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Empty = styled.li`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  padding: 32px 12px;
  text-align: center;
`;

export const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  list-style: none;
  margin: 0;
  min-height: 0;
  /* Sorting moves the rows around, and scroll anchoring would follow one of them instead of staying put */
  overflow-anchor: none;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0 4px 4px;
`;

export const Logo = styled.img`
  background: ${colors.whiteHover};
  border-radius: 50%;
  flex-shrink: 0;
  height: ${`${LOGO_SIZE}px`};
  object-fit: cover;
  width: ${`${LOGO_SIZE}px`};
`;

export const Name = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Row = styled.button<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.whiteHover : 'transparent')};
  border: none;
  border-radius: ${radii.medium};
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.family.default};
  gap: 12px;
  padding: 10px 12px;
  position: relative;
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  /* The marker of the open wallet: a short accent bar on the leading edge */
  &::before {
    background: ${colors.accent};
    border-radius: ${radii.pill};
    bottom: 12px;
    content: '';
    left: 0;
    opacity: ${({$isActive}) => ($isActive ? 1 : 0)};
    position: absolute;
    top: 12px;
    transition: opacity 0.15s ease;
    width: 3px;
  }

  &:focus-visible {
    outline: 2px solid ${colors.palette.blue[500]};
    outline-offset: -2px;
  }

  &:hover {
    background: ${colors.whiteHover};
  }
`;

export const SearchContainer = styled.div`
  flex: 1 1 140px;
  min-width: 0;
  position: relative;
`;

export const SearchIcon = styled(MdiIcon)`
  color: ${colors.secondary};
  left: 12px;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const SearchInput = styled.input`
  ${controlStyle};
  height: ${`${CONTROL_HEIGHT}px`};
  padding: 0 12px 0 36px;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SkeletonLines = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`;

export const SkeletonRow = styled.li`
  align-items: center;
  display: flex;
  gap: 12px;
  padding: 10px 12px;
`;

export const SortSelect = styled.select`
  ${controlStyle};
  appearance: none;
  background-image: ${CHEVRON_ICON};
  background-position: right 10px center;
  background-repeat: no-repeat;
  cursor: pointer;
  flex: 1 1 130px;
  height: ${`${CONTROL_HEIGHT}px`};
  min-width: 0;
  padding: 0 32px 0 12px;
  text-overflow: ellipsis;
`;

export const Ticker = styled.div`
  align-items: center;
  color: ${colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  gap: 6px;
  line-height: 1.4;

  svg {
    color: ${colors.secondary};
    flex-shrink: 0;
  }
`;

export const Value = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.4;
`;
