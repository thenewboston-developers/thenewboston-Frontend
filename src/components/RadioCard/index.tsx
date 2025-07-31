import {useMemo, useState} from 'react';
import {mdiCheck} from '@mdi/js';

import Badge, {BadgeStyle} from 'components/Badge';
import Icon from 'components/Icon';
import {Currency, SFC} from 'types';

import * as S from './Styles';

interface RadioCardProps {
  currency: Currency;
  isSelected: boolean;
  onAnimationComplete?: () => void;
  onClick: () => void;
}

const RadioCard: SFC<RadioCardProps> = ({className, currency, isSelected, onClick, onAnimationComplete}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeselecting, setIsDeselecting] = useState(false);
  const [wasSelected, setWasSelected] = useState(isSelected);

  // Handle selection state changes
  useMemo(() => {
    if (wasSelected && !isSelected) {
      // Deselecting
      setIsDeselecting(true);
      setTimeout(() => {
        setIsDeselecting(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 200); // Faster deselect animation
    } else if (!wasSelected && isSelected) {
      // Selecting
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 500);
    }
    setWasSelected(isSelected);
  }, [isSelected, wasSelected, onAnimationComplete]);

  const handleClick = () => {
    onClick();
  };

  return (
    <S.Container $isActive={isSelected} $isAnimating={isAnimating} className={className} onClick={handleClick}>
      <S.ImageContainer>
        <S.CurrencyLogo alt={`${currency.ticker} logo`} src={currency.logo} />
        <S.DomainInfo>
          <S.Ticker>{currency.ticker}</S.Ticker>
          {currency.domain ? (
            <S.Domain>{currency.domain}</S.Domain>
          ) : (
            <Badge badgeStyle={BadgeStyle.info}>Internal</Badge>
          )}
        </S.DomainInfo>
      </S.ImageContainer>
      {(isSelected || isDeselecting) && (
        <S.CheckIcon $isAnimating={isAnimating} $isDeselecting={isDeselecting}>
          <Icon icon={mdiCheck} size={14} />
        </S.CheckIcon>
      )}
    </S.Container>
  );
};

export default RadioCard;
