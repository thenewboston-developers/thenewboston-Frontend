import styled from 'styled-components';

import {colors, fonts} from 'styles';

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
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

export const Header = styled.div`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
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

export const TabContent = styled.div`
  margin-top: 24px;
`;
