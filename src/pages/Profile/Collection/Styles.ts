import styled from 'styled-components';

import {colors} from 'styles';

export const CoinAmount = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 14px;
`;

export const CoinDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CoinInfo = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const CoinName = styled.div`
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: 600;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 24px;
  width: 100%;
`;

export const LoadingText = styled.div`
  color: ${colors.palette.gray[600]};
  padding: 40px;
  text-align: center;
`;

export const WalletCard = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  cursor: pointer;
  padding: 16px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const WalletsGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
