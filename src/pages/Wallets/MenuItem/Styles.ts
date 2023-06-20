import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Balance = styled.div`
  color: ${colors.palette.darkGray['300']};
  font-size: 12px;
`;

export const Container = styled.div`
  display: flex;
  padding: 8px 12px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Domain = styled.div`
  font-size: 12px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const Ticker = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;
