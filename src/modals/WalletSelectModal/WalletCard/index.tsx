import {useMemo, useState} from 'react';
import {mdiCheck} from '@mdi/js';

import Icon from 'components/Icon';
import {SFC, Wallet} from 'types';

import * as S from './Styles';

interface WalletCardProps {
  isSelected: boolean;
  onClick: () => void;
  wallet: Wallet;
}

const WalletCard: SFC<WalletCardProps> = ({className, isSelected, onClick, wallet}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeselecting, setIsDeselecting] = useState(false);
  const [wasSelected, setWasSelected] = useState(isSelected);

  useMemo(() => {
    if (wasSelected && !isSelected) {
      setIsDeselecting(true);
      setTimeout(() => {
        setIsDeselecting(false);
      }, 200);
    } else if (!wasSelected && isSelected) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
    setWasSelected(isSelected);
  }, [isSelected, wasSelected]);

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
