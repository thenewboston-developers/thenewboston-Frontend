import {Currency, GenericVoidFunction, SFC} from 'types';
import * as S from './Styles';

interface RadioCardProps {
  activeCurrencyId: number | null;
  currency: Currency;
  handleRadioCardClick: GenericVoidFunction;
}

const RadioCard: SFC<RadioCardProps> = ({activeCurrencyId, className, currency, handleRadioCardClick}) => {
  return (
    <S.Container
      $isActive={activeCurrencyId === currency.id}
      className={className}
      key={currency.id}
      onClick={handleRadioCardClick}
    >
      <S.ImageContainer>
        <S.Img alt="logo" src={currency.logo || ''} />
        <S.Title>{currency.ticker}</S.Title>
      </S.ImageContainer>
      <S.Radio>
        <S.RadioInput
          checked={activeCurrencyId === currency.id}
          name="ticker"
          readOnly
          type="radio"
          value={currency.ticker}
        />
      </S.Radio>
    </S.Container>
  );
};

export default RadioCard;
