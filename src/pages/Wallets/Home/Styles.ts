import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, pagePadding} from 'styles';

export const Box = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;

export const Button = styled(UButton)`
  width: 100%;
`;

export const ButtonContainer = styled.div<{$hasWallets: boolean}>`
  margin-bottom: ${({$hasWallets}) => ($hasWallets ? '16px' : 0)};

  @media (min-width: 1025px) {
    flex-grow: 1;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  align-items: flex-start;
  display: flex;
  gap: 16px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const ContentArea = styled.div``;

export const EmptyPageWrapper = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 24px 16px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 10px;
  }
`;

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;

  @media (max-width: ${breakpoints.tablet}) {
    justify-content: end;
  }
`;

export const LeftMenu = styled.div`
  min-width: 271px;

  @media (max-width: ${breakpoints.tablet}) {
    min-width: auto;
    width: 100%;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

export const TabsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
