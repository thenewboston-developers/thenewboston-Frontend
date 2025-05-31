import styled from 'styled-components';

import {breakpoints} from 'styles';

import Pattern from './profile-pattern.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
  min-height: 100vh;
`;

export const TopSection = styled.div`
  position: relative;
  padding: 24px 32px;

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

export const ContentWrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
`;

export const OutletContainer = styled.div`
  padding: 0 32px 32px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 16px 16px;
  }
`;
