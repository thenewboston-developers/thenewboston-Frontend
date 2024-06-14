import styled from 'styled-components';
import {breakpoints, colors, fonts} from 'styles';

export const Addresses = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 12px;
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 32px;
  @media (max-width: ${breakpoints.mini}) {
    padding: 24px 16px;
  }
`;

export const Heading = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;
export const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
export const Div = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 12px;
`;
export const AddressCard = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;
