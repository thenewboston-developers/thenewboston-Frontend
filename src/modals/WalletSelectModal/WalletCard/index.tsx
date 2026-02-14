import {useLayoutEffect, useRef, useState} from 'react';
import {mdiCheck} from '@mdi/js';

import Icon from 'components/Icon';
import {SFC, Wallet} from 'types';

import * as S from './Styles';

interface WalletCardProps {
  isSelected: boolean;
  onAnimationComplete?: () => void;
  onClick: () => void;
  wallet: Wallet;
}

const WalletCard: SFC<WalletCardProps> = ({className, isSelected, onAnimationComplete, onClick, wallet}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeselecting, setIsDeselecting] = useState(false);
  const wasSelectedRef = useRef(isSelected);

  useLayoutEffect(() => {
    let animationTimeout: ReturnType<typeof setTimeout> | null = null;
    const wasSelected = wasSelectedRef.current;

    if (wasSelected && !isSelected) {
      setIsAnimating(false);
      setIsDeselecting(true);
      animationTimeout = setTimeout(() => {
        setIsDeselecting(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 200);
    } else if (!wasSelected && isSelected) {
      setIsDeselecting(false);
      setIsAnimating(true);
      animationTimeout = setTimeout(() => {
        setIsAnimating(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 500);
    }
    wasSelectedRef.current = isSelected;

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [isSelected, onAnimationComplete]);

  const handleClick = () => {
    onClick();
  };

  return (
    <S.Container $isActive={isSelected} $isAnimating={isAnimating} className={className} onClick={handleClick}>
      <S.WalletInfo>
        <S.CurrencyLogo alt={`${wallet.currency.ticker} logo`} src={wallet.currency.logo} />
        <S.WalletDetails>
          <S.Ticker>{wallet.currency.ticker}</S.Ticker>
          <S.Balance>{wallet.balance.toLocaleString()}</S.Balance>
        </S.WalletDetails>
      </S.WalletInfo>
      {(isSelected || isDeselecting) && (
        <S.CheckIcon $isAnimating={isAnimating} $isDeselecting={isDeselecting}>
          <Icon icon={mdiCheck} size={14} />
        </S.CheckIcon>
      )}
    </S.Container>
  );
};

export default WalletCard;
