import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding, radii, shadows, toolbarStyle} from 'styles';

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
  outline: none;
  padding: 6px 12px 6px 8px;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
  }

  &:hover {
    background: ${colors.whiteHover};
    color: ${colors.primary};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const Header = styled.div`
  ${toolbarStyle};
  flex-shrink: 0;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 240px;
  width: 100%;
`;

export const ScrollableContent = styled.div`
  ${pagePadding};
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const TabContent = styled.div`
  margin-top: 16px;
`;

export const TabHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: center;
    flex-direction: column;
  }
`;

export const TabSection = styled.div`
  min-width: 0;
`;
