import styled from 'styled-components';
import {breakpoints, colors} from 'styles';

export const Box = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  grid-column: span 6;
  padding: 20px 20px 0px 20px;
`;

export const Text = styled.div`
  margin-top: 10px;
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px 40px 0px 40px;
`;

export const Heading = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const Image = styled.img`
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 260px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    max-width: 330px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    max-width: 350px;
  }
`;
