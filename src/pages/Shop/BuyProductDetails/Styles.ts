import styled from 'styled-components';
import UPrice from 'components/Price';
import UUserLabel from 'components/UserLabel';
import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px 32px;
  @media (max-width: ${breakpoints.mini}) {
    padding: 24px 16px;
  }
`;

export const Img = styled.img`
  border-radius: 14px;
  height: 541px;
  object-fit: cover;
  object-position: center;
  padding: 10px;
`;

export const Right = styled.div`
  background-color: ${colors.white};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  grid-column: span 6;
  @media (max-width: ${breakpoints.tablet}) {
    grid-column: span 12;
  }
`;

export const Name = styled.div`
  font-size: 26px;
  font-weight: ${fonts.weight.semiBold};
  margin-top: 4px;
`;

export const Header = styled.div`
  align-items: center;
  border-radius: 4px;
  display: flex;
  gap: 24px;
  justify-content: space-between;
`;

export const ProductDetail = styled.div`
  background-color: ${colors.white};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  grid-column: span 6;
  @media (max-width: ${breakpoints.tablet}) {
    grid-column: span 12;
  }
`;

export const UserLabel = styled(UUserLabel)`
  padding: 20px;
`;

export const Price = styled(UPrice)`
  font-weight: ${fonts.weight.regular};
  margin-top: 5px;
`;
export const Icon = styled.div`
  align-items: center;
  background-color: ${colors.palette.gray[100]};
  border-radius: 50%;
  display: flex;
  padding: 10px;
`;
export const Button = styled.button`
  align-items: center;
  background-color: ${colors.white};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 5px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
`;

export const Left = styled.div`
  align-items: center;
  color: ${colors.palette.blue[700]};
  display: flex;
  font-weight: ${fonts.weight.semiBold};
  & span {
    margin-left: 12px;
  }
`;

export const Div = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(12, 1fr);
`;

export const Date = styled.div`
  display: flex;
  padding: 20px;
`;

export const Title = styled.div`
  color: ${colors.gray};
  font-weight: ${fonts.weight.bold};
`;

export const Description = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const Wrapper = styled.div`
  padding: 20px;
`;
