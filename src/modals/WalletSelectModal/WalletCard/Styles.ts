import styled, {css, keyframes} from 'styled-components';

import {colors, fonts} from 'styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
`;

export const Balance = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  margin-top: 4px;
`;

const getAnimation = ($isAnimating: boolean, $isDeselecting: boolean) => {
  if ($isAnimating) {
    return css`
      ${fadeIn} 0.5s ease-out
    `;
  }
  if ($isDeselecting) {
    return css`
      ${fadeOut} 0.2s ease-out
    `;
  }
  return 'none';
};

export const CheckIcon = styled.div<{$isAnimating: boolean; $isDeselecting: boolean}>`
  align-items: center;
  animation: ${({$isAnimating, $isDeselecting}) => getAnimation($isAnimating, $isDeselecting)};
  background: ${colors.palette.blue[500]};
  border-radius: 50%;
  color: ${colors.white};
  display: flex;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 12px;
  top: 12px;
  width: 20px;
`;

export const Container = styled.div<{$isActive: boolean; $isAnimating: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.palette.blue[50] : colors.white)};
  border: 2px solid ${({$isActive}) => ($isActive ? colors.palette.blue[300] : colors.palette.gray[100])};
  border-radius: 16px;
  cursor: pointer;
  padding: 16px;
  position: relative;
  transition: all 0.2s ease;

  ${({$isAnimating}) =>
    $isAnimating &&
    css`
      animation: ${keyframes`
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      `} 0.5s ease-out;
    `}

  &:hover {
    border-color: ${({$isActive}) => ($isActive ? colors.palette.blue[400] : colors.palette.gray[300])};
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    transform: translateY(-2px);
  }
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  height: 40px;
  width: 40px;
`;

export const Domain = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 12px;
  margin-top: 2px;
`;

export const Ticker = styled.div`
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const WalletDetails = styled.div`
  margin-left: 12px;
`;

export const WalletInfo = styled.div`
  align-items: center;
  display: flex;
`;
