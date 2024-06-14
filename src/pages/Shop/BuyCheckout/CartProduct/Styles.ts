import styled from 'styled-components';
import UThumbnail from 'components/Thumbnail';
import {breakpoints, colors, fonts} from 'styles';

const Thumbnail_SIZE = '154px';

export const Thumbnail = styled(UThumbnail)`
  border-radius: 10px;
  height: ${Thumbnail_SIZE};
  width: ${Thumbnail_SIZE};
  &:hover {
    cursor: pointer;
  }
`;
export const Left = styled.div`
  color: ${colors.gray};
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  flex-grow: 1;
`;
export const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Price = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: space-between;
  margin: 10px 0px 0px 0px;
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
`;

export const CoreLogo = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

export const Amount = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  margin-left: 6px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Right = styled.div``;

export const Status = styled.div``;
