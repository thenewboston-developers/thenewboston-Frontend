import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const Left = styled.div`
  color: ${colors.gray};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2px;
  justify-content: space-between;
`;

export const Right = styled.div``;

export const Div = styled.div``;

export const Text = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;
