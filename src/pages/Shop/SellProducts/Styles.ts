import styled from 'styled-components';
import {breakpoints, colors, fonts} from 'styles';

export const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
`;

export const Div = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  flex-grow: 1;
`;

export const Heading = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;

export const Products = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  padding: 12px 0;
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;
