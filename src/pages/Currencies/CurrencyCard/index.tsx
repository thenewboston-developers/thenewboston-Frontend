import CurrencyDetail from 'components/CurrencyLabel';
import {Currency, SFC} from 'types';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency}) => {
  return (
    <>
      <S.Container className={className}>
        <CurrencyDetail currency={currency} />
      </S.Container>
    </>
  );
};

export default CurrencyCard;
