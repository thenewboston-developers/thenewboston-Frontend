import {Link as ULink} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import UPriceMini from 'components/PriceMini';
import {colors, fonts, radii, shadows} from 'styles';

const AVATAR_SIZE = '32px';
const BUBBLE_RADIUS = '16px';

const highlightRing = keyframes`
  from {
    box-shadow: 0 0 0 2px ${colors.palette.blue[300]};
  }

  to {
    box-shadow: 0 0 0 2px transparent;
  }
`;

export const AvatarLink = styled(ULink)`
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
`;

// A highlighted comment keeps a light tint, so it can be found again after scrolling, and shows a ring that fades once
// it has been scrolled into view
export const Bubble = styled.div<{$isHighlighted: boolean; $showsRing: boolean}>`
  background: ${({$isHighlighted}) => ($isHighlighted ? colors.palette.blue[50] : colors.palette.gray[100])};
  border-radius: ${BUBBLE_RADIUS};
  min-width: 0;
  padding: 8px 12px;

  ${({$isHighlighted, $showsRing}) =>
    $isHighlighted &&
    $showsRing &&
    css`
      animation: ${highlightRing} 2.4s ease-out 0.5s both;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

export const BubbleRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 4px;
`;

export const Container = styled.div<{$isFirst: boolean}>`
  display: flex;
  gap: 8px;
  margin-top: ${({$isFirst}) => ($isFirst ? '16px' : '12px')};
  width: 100%;
`;

export const Content = styled.div`
  color: ${colors.primary};
  font-size: 14px;
  line-height: 1.45;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const Date = styled.div`
  white-space: nowrap;
`;

// Purely decorative separator (hidden from assistive technology), so it can stay lighter than the text around it
export const Dot = styled.div`
  color: ${colors.palette.gray[400]};
`;

// Pinned to the right edge of the row (the bubble only hugs its content) so the menu, which opens leftwards from the
// trigger, always has room to open on narrow screens
export const DropdownMenu = styled(UDropdownMenu)`
  margin-left: auto;
  margin-top: 2px;
`;

export const Main = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Metadata = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 4px 6px;
  margin-top: 4px;
  padding-left: 12px;
`;

export const PriceMini = styled(UPriceMini)`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.pill};
  color: ${colors.primary};
  font-variant-numeric: tabular-nums;
  padding: 2px 8px 2px 6px;
`;

export const Username = styled(ULink)`
  border-radius: 4px;
  color: ${colors.primary};
  display: block;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: fit-content;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;
