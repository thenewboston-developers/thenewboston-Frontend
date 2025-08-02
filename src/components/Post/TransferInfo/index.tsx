import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {getCurrency} from 'dispatchers/currencies';
import {useCurrencyLogo} from 'hooks';
import {AppDispatch, Currency, SFC, UserReadSerializer} from 'types';
import {shortDate} from 'utils/dates';

import * as S from './Styles';

export interface TransferInfoProps {
  createdDate: Date;
  owner: UserReadSerializer;
  priceAmount: number;
  priceCurrency: number;
  recipient: UserReadSerializer;
}

const TransferInfo: SFC<TransferInfoProps> = ({
  className,
  createdDate,
  owner,
  priceAmount,
  priceCurrency,
  recipient,
}) => {
  const [currency, setCurrency] = useState<Currency | null>(null);
  const currencyLogo = useCurrencyLogo(priceCurrency);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const currencyData = await dispatch(getCurrency(priceCurrency));
        setCurrency(currencyData);
      } catch (error) {
        // Error fetching currency
      }
    };

    if (priceCurrency) {
      fetchCurrency();
    }
  }, [priceCurrency, dispatch]);

  return (
    <S.Container className={className}>
      <S.GraphicWrapper>
        <S.CurrencyLogo alt={currency?.ticker || ''} src={currencyLogo} />
      </S.GraphicWrapper>
      <S.Content>
        <S.Text>
          <S.Link to={`/profile/${owner.id}`}>{owner.username}</S.Link> sent{' '}
          <strong>
            {priceAmount.toLocaleString()} {currency?.ticker || ''}
          </strong>{' '}
          to <S.Link to={`/profile/${recipient.id}`}>{recipient.username}</S.Link>
        </S.Text>
        <S.Date>{shortDate(createdDate, true)}</S.Date>
      </S.Content>
    </S.Container>
  );
};

export default TransferInfo;
