import styled from 'styled-components';
import UBanner from 'components/Banner';
import {fonts} from 'styles';

export const Container = styled.div`
  height: 100%;
`;
export const Banner = styled(UBanner)`
  margin: 16px 16px 0;
`;

export const Heading = styled.div`
  font-size: 22px;
  font-weight: ${fonts.weight.semiBold};
  margin: 42px 16px 0;
`;
