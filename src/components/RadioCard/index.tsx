import {useMemo, useState} from 'react';
import {mdiCheck} from '@mdi/js';

import Icon from 'components/Icon';
import {Currency, SFC} from 'types';

import * as S from './Styles';

interface RadioCardProps {
  currency: Currency;
  isSelected: boolean;
  onClick: () => void;
  onAnimationComplete?: () => void;
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
        <S.Image alt={`${currency.ticker} logo`} src={currency.logo} />
        <S.Title>{currency.ticker}</S.Title>
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
