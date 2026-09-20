import {mdiArrowRight} from '@mdi/js';

import {CurrencyTinySerializer, SFC, UserReadSerializer} from 'types';

import * as S from './Styles';

export interface TransferInfoProps {
  owner: UserReadSerializer;
  priceAmount: number;
  priceCurrency: CurrencyTinySerializer;
  recipient: UserReadSerializer;
}

const TransferInfo: SFC<TransferInfoProps> = ({className, owner, priceAmount, priceCurrency, recipient}) => {
  return (
    <S.Container className={className}>
      <S.CurrencyLogo alt={priceCurrency.ticker} src={priceCurrency.logo} />
      <S.Details>
        <S.Label>Transfer</S.Label>
        <S.Parties>
          <S.Link to={`/profile/${owner.id}`}>{owner.username}</S.Link>
          <S.Arrow path={mdiArrowRight} size="16px" title="sent to" />
          <S.Link to={`/profile/${recipient.id}`}>{recipient.username}</S.Link>
        </S.Parties>
      </S.Details>
      <S.Amount>
        <S.AmountValue>{priceAmount.toLocaleString()}</S.AmountValue>
        <S.Ticker>{priceCurrency.ticker}</S.Ticker>
      </S.Amount>
    </S.Container>
  );
};

export default TransferInfo;
