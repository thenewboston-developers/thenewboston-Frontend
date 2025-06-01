import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiCheck} from '@mdi/js';

import Icon from 'components/Icon';
import {ToastType} from 'enums';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, Currency, SFC} from 'types';
import {displayToast} from 'utils/toasts';

import * as S from './Styles';

interface RadioCardProps {
  close?: () => void;
  currency: Currency;
}

const RadioCard: SFC<RadioCardProps> = ({className, close, currency}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const [isAnimating, setIsAnimating] = useState(false);

  const isActiveCommentCurrency = useMemo(() => {
    return manager.activeCommentCurrency?.id === currency.id;
  }, [currency.id, manager.activeCommentCurrency?.id]);

  const handleRadioCardClick = () => {
    if (isActiveCommentCurrency) {
      // Deselecting current currency
      dispatch(updateManager({activeCommentCurrency: null}));
      displayToast(`${currency.ticker} deselected`, ToastType.SUCCESS);
      if (close) {
        close();
      }
    } else {
      // Selecting new currency
      dispatch(updateManager({activeCommentCurrency: currency}));
      displayToast(`${currency.ticker} selected`, ToastType.SUCCESS);
      setIsAnimating(true);

      // Close modal after animation (1 second total)
      setTimeout(() => {
        setIsAnimating(false);
        if (close) {
          close();
        }
      }, 1000);
    }
  };

  return (
    <S.Container
      $isActive={isActiveCommentCurrency}
      $isAnimating={isAnimating}
      className={className}
      key={currency.id}
      onClick={handleRadioCardClick}
    >
      <S.ImageContainer>
        <S.Img alt={`${currency.ticker} logo`} src={currency.logo} />
        <S.Title>{currency.ticker}</S.Title>
      </S.ImageContainer>
      {isActiveCommentCurrency && (
        <S.CheckIcon $isAnimating={isAnimating}>
          <Icon icon={mdiCheck} size={14} />
        </S.CheckIcon>
      )}
    </S.Container>
  );
};

export default RadioCard;
