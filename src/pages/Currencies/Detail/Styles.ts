import styled from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

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
  overflow: hidden;
`;

export const Content = styled.div`
  ${pagePadding};
  flex: 1;
  overflow-y: auto;
`;

export const Header = styled.div`
  align-items: center;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
`;

export const TabSection = styled.div`
  margin-top: 32px;
`;

export const TabHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

export const TabContent = styled.div`
  margin-top: 24px;
`;
