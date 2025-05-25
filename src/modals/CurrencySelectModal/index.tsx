import {useSelector} from 'react-redux';

import {getCurrencies} from 'selectors/state';
import {SFC} from 'types';

import * as S from './Styles';

export interface CurrencySelectModalProps {
  close(): void;
}

const CurrencySelectModal: SFC<CurrencySelectModalProps> = ({className, close}) => {
  const currencies = useSelector(getCurrencies);

  const renderRadioCards = () => {
    return (
      <>
        {Object.values(currencies).map((_currency) => {
          return <S.RadioCardWrapper currency={_currency} key={_currency.id} />;
        })}
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Currencies">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
      <S.Button text="Apply" />
    </S.Modal>
  );
};

export default CurrencySelectModal;
