import styled from 'styled-components';

import {colors} from 'styles';

export const Amount = styled.span`
  color: ${colors.palette.gray[700]};
  font-size: 12px;
  font-weight: 500;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  height: 16px;
  object-fit: cover;
  width: 16px;
`;

export const TipItem = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  gap: 4px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;
