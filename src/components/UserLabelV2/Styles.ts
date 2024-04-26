import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dadada;
  padding: 20px 0;
`;

export const Header = styled.h3`
  font-size: 12px;
  line-height: 20px;
  font-weight: ${fonts.weight.bold};
  text-transform: uppercase;
  color: ${colors.gray};
`;

export const Username = styled.h2`
  font-size: 18px;
  font-weight: ${fonts.weight.regular};
  line-height: 24px;
  color: ${colors.black};
  text-transform: capitalize;
`;

export const Image = styled.img`
  border-radius: 100%;
`;
