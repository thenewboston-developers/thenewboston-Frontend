import {useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, Currency, SFC} from 'types';

import * as S from './Styles';

interface RadioCardProps {
  currency: Currency;
}

const RadioCard: SFC<RadioCardProps> = ({className, currency}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const radioRef = useRef<HTMLInputElement>(null);

  const isActiveCommentCurrency = useMemo(() => {
    return manager.activeCommentCurrency?.id === currency.id;
  }, [currency.id, manager.activeCommentCurrency?.id]);

  const handleRadioCardClick = () => {
    dispatch(updateManager({activeCommentCurrency: isActiveCommentCurrency ? null : currency}));
    if (radioRef.current) {
      radioRef.current.click();
    }
  };

  return (
    <S.Container
      $isActive={isActiveCommentCurrency}
      className={className}
      key={currency.id}
      onClick={handleRadioCardClick}
    >
      <S.ImageContainer>
        <S.Img alt="logo" src={currency.logo} />
        <S.Title>{currency.ticker}</S.Title>
      </S.ImageContainer>
      <S.Radio>
        <S.RadioInput
          checked={isActiveCommentCurrency}
          name="ticker"
          readOnly
          ref={radioRef}
          type="radio"
          value={currency.ticker}
        />
      </S.Radio>
    </S.Container>
  );
};

export default RadioCard;
