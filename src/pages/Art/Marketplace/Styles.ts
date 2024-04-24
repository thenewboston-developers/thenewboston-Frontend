import styled from 'styled-components';

import {breakpoints} from 'styles';
import UBanner from './Banner';

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

export const Banner = styled(UBanner)`
  margin: 16px;
`;

export const Container = styled.div`
  height: 100%;
`;
