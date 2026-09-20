import styled from 'styled-components';

import {cardStyle, colors} from 'styles';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Container = styled.div`
  ${cardStyle};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  padding: 20px;
`;

export const Dates = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 14px;
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.borderSubtle};
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Owner = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const OwnerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
