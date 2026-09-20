import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding, radii, shadows, toolbarStyle} from 'styles';

// 680px post column plus the 32px horizontal page padding on each side
const CONTENT_MAX_WIDTH = '744px';

export const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${radii.pill};
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  gap: 6px;
  margin-left: -8px;
  padding: 6px 12px 6px 8px;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.whiteHover};
      color: ${colors.primary};
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 0 24px;
  }
`;

export const Header = styled.div`
  ${toolbarStyle};
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;
