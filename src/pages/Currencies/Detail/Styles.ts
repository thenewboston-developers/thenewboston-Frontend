import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding, toolbarStyle} from 'styles';

export const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  gap: 8px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  span {
    font-family: ${fonts.family.default};
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
  max-width: 1200px;
  width: 100%;
`;

export const Header = styled.div`
  ${toolbarStyle};
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const TabContent = styled.div`
  margin-top: 24px;
`;

export const TabHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: stretch;
    flex-direction: column;
    gap: 16px;
  }
`;

export const TabSection = styled.div`
  margin-top: 32px;
`;
