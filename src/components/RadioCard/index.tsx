import {useMemo, useState} from 'react';
import {mdiCheck} from '@mdi/js';

import Icon from 'components/Icon';
import {Currency, SFC} from 'types';

import * as S from './Styles';

interface RadioCardProps {
  currency: Currency;
  isSelected: boolean;
  onClick: () => void;
  showAnimation?: boolean;
}

const RadioCard: SFC<RadioCardProps> = ({className, currency, isSelected, onClick, showAnimation = true}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isSelected && showAnimation) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
    onClick();
  };

  return (
    <S.Container $isActive={isSelected} $isAnimating={isAnimating} className={className} onClick={handleClick}>
      <S.ImageContainer>
        <S.Image alt={`${currency.ticker} logo`} src={currency.logo} />
        <S.Title>{currency.ticker}</S.Title>
      </S.ImageContainer>
      {isSelected && (
        <S.CheckIcon $isAnimating={showAnimation ? isAnimating : false}>
          <Icon icon={mdiCheck} size={14} />
        </S.CheckIcon>
      )}
    </S.Container>
  );
};

export default RadioCard;
