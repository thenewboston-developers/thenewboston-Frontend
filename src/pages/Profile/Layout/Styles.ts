import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
`;

export const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;

export const OutletContainer = styled.div`
  padding: 24px 32px 32px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 24px 24px;
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const TopSection = styled.div`
  padding: 24px 32px 0;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 24px 24px 0;
  }
`;
