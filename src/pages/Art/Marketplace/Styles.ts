import styled from 'styled-components';
import UBanner from 'components/Banner';

import {breakpoints, fonts} from 'styles';

export const ArtworkCards = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  padding: 16px;

  @media (min-width: ${breakpoints.mini}) {
    grid-template-columns: 1fr;
  }

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${breakpoints.largeDesktop}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: ${breakpoints.xlDesktop}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const ArtworkCardsHeading = styled.div`
  font-size: 22px;
  font-weight: ${fonts.weight.semiBold};
  margin: 42px 16px 0;
`;

export const Banner = styled(UBanner)`
  margin: 16px 16px 0;
`;

export const Container = styled.div`
  height: 100%;
`;
