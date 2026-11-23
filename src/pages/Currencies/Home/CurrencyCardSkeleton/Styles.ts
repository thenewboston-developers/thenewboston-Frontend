import styled from 'styled-components';

import {cardStyle} from 'styles';

export const Container = styled.div`
  ${cardStyle};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  padding: 20px;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 18px;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Owner = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;
