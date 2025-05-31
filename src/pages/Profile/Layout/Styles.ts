import styled from 'styled-components';

import {breakpoints} from 'styles';

import Pattern from './profile-pattern.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  position: relative;
`;

export const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;

export const OutletContainer = styled.div`
  padding: 0 32px 32px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 16px 16px;
  }
`;

export const TopSection = styled.div`
  padding: 24px 32px;
  position: relative;

  &::after {
    background-image: url(${Pattern});
    content: '';
    height: 125px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 24px 16px;
  }
`;
