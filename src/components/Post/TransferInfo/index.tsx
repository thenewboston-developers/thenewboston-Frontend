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
      <S.GraphicWrapper>
        <S.CurrencyLogo alt={priceCurrency.ticker} src={priceCurrency.logo} />
      </S.GraphicWrapper>
      <S.Content>
        <S.Text>
          <S.Link to={`/profile/${owner.id}`}>{owner.username}</S.Link> sent{' '}
          <strong>
            {priceAmount.toLocaleString()} {priceCurrency.ticker}
          </strong>{' '}
          to <S.Link to={`/profile/${recipient.id}`}>{recipient.username}</S.Link>
        </S.Text>
      </S.Content>
    </S.Container>
  );
};

export default TransferInfo;
