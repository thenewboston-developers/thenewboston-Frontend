import styled from 'styled-components';

import ULine from 'components/Line';
import UThumbnail from 'components/Thumbnail';
import UPrice from 'components/Price';
import UUserLabel from 'components/UserLabel';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
    cursor: pointer;
  }
`;

export const Description = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  padding: 0px 0px 10px 20px;
`;

export const Line = styled(ULine)`
  margin: 16px 0;
`;

export const Name = styled.div`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  padding: 10px 0px 5px 20px;
`;

export const Thumbnail = styled(UThumbnail)`
  border-radius: 0;
`;

export const UserLabel = styled(UUserLabel)`
  padding: 10px 0px 10px 20px;
`;

export const Price = styled(UPrice)`
  padding: 10px 0px 10px 20px;
`;

export const Div = styled.div``;
