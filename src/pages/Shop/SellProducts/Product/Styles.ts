import styled from 'styled-components';
import UThumbnail from 'components/Thumbnail';
import {breakpoints, colors, fonts} from 'styles';

const THUMBNAIL_SIZE = '154px';

export const ActivationStatus = styled.div``;

export const Amount = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  margin-left: 6px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

export const CoreLogo = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
`;

export const Left = styled.div`
  color: ${colors.gray};
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mini}) {
    flex-direction: column;
  }
`;

export const Link = styled.div`
  margin-top: 5px;
`;

export const ProductDetails = styled.div`
  flex-grow: 1;
`;

export const Price = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: space-between;
  margin: 10px 0px 0px 0px;
`;

export const Right = styled.div``;

export const Thumbnail = styled(UThumbnail)`
  border-radius: 10px;
  height: ${THUMBNAIL_SIZE};
  width: ${THUMBNAIL_SIZE};
  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${breakpoints.mini}) {
    width: 100%;
  }
`;
