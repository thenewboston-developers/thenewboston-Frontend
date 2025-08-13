import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, pagePadding} from 'styles';

export const Button = styled(UButton)`
  width: 100%;

  @media (min-width: 1025px) {
    width: auto;
  }
`;

export const ButtonContainer = styled.div<{$hasWallets: boolean}>`
  margin-bottom: ${({$hasWallets}) => ($hasWallets ? '16px' : 0)};
  width: 100%;

  @media (min-width: 1025px) {
    width: auto;
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

export const EmptyStateWrapper = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 24px 16px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 10px;
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

export const TopSection = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const WalletSelectorWrapper = styled.div`
  flex: 1;
  max-width: 300px;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    width: 100%;
  }
`;
