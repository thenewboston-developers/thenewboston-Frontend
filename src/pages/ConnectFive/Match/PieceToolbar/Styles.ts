import styled, {css} from 'styled-components';

import {fonts, radii} from 'styles';

import {COMPACT_PLAYER_ROW_QUERY, WHITE_PIECE_OUTLINE} from '../../mixins';
import {classic} from '../../theme';

const COMPACT_TOOL_SIZE = 36;
const TOOL_SIZE = 44;
const TRACK_PADDING = 4;

const toolMixin = css<{$isDisabled: boolean}>`
  align-items: center;
  border-radius: ${radii.small};
  display: flex;
  filter: ${({$isDisabled}) => ($isDisabled ? 'grayscale(1)' : 'none')};
  flex-shrink: 0;
  height: ${`${TOOL_SIZE}px`};
  justify-content: center;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.45 : 1)};
  position: relative;
  width: ${`${TOOL_SIZE}px`};

  @media ${COMPACT_PLAYER_ROW_QUERY} {
    height: ${`${COMPACT_TOOL_SIZE}px`};
    width: ${`${COMPACT_TOOL_SIZE}px`};
  }

  /* The pieces get a line of their own on phones (see PlayerRow), where the tools share its width */
  @media (max-width: 1160px) {
    flex: 1;
    width: auto;
  }
`;

// The selected piece has an ivory tile and a dark outline, distinct from the wooden tray.
export const ToolButton = styled.button<{$isActive: boolean; $isDisabled: boolean}>`
  ${toolMixin};
  background: ${({$isActive, $isDisabled}) => ($isActive && !$isDisabled ? classic.whiteStone : 'transparent')};
  border: 0;
  box-shadow: ${({$isActive, $isDisabled}) =>
    $isActive && !$isDisabled ? 'inset 0 0 0 2px #755231, 0 2px 4px rgba(0,0,0,.16)' : 'none'};
  cursor: ${({$isDisabled}) => ($isDisabled ? 'not-allowed' : 'pointer')};
  outline: none;
  padding: 0;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${({$isActive}) => ($isActive ? classic.whiteStone : 'rgb(255 255 255 / 55%)')};
    }
  }

  &:focus-visible {
    outline: 2px solid ${classic.accentInk};
    outline-offset: 1px;
  }
`;

export const ToolButtonReadOnly = styled.div<{$isDisabled: boolean}>`
  ${toolMixin};
`;

export const ToolCount = styled.span`
  background: ${classic.whiteStone};
  border: 1px solid ${classic.boardRim};
  border-radius: ${radii.pill};
  bottom: 2px;
  color: ${classic.accentInk};
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1;
  min-width: 16px;
  padding: 2px 4px;
  pointer-events: none;
  position: absolute;
  right: calc(50% - 20px); /* Follows the centered icon when the tools stretch */
  text-align: center;

  @media ${COMPACT_PLAYER_ROW_QUERY} {
    bottom: 0;
    right: 0;
  }
`;

export const ToolIcon = styled.svg<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? classic.blackStone : classic.whiteStone)};
  display: block;
  filter: ${({$variant}) => ($variant === 'white' ? WHITE_PIECE_OUTLINE : 'none')};
  height: 24px;
  width: 24px;
`;

export const Toolbar = styled.div`
  background: ${classic.board};
  border: 1px solid ${classic.boardRim};
  border-radius: ${radii.medium};
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;
  gap: 2px;
  grid-area: toolbar;
  padding: ${`${TRACK_PADDING}px`};
`;
