import {useSelector} from 'react-redux';
import {mdiSwapHorizontal} from '@mdi/js';

import {getCurrencies} from 'selectors/state';
import {SFC, UserReadSerializer} from 'types';
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
  const currencies = useSelector(getCurrencies);

  return (
    <S.Container className={className}>
      <S.IconWrapper>
        <S.Icon icon={mdiSwapHorizontal} size={24} />
      </S.IconWrapper>
      <S.Content>
        <S.Text>
          <S.Link to={`/profile/${owner.id}`}>{owner.username}</S.Link> sent{' '}
          <strong>
            {priceAmount.toLocaleString()} {currencies[priceCurrency]?.ticker}
          </strong>{' '}
          to <S.Link to={`/profile/${recipient.id}`}>{recipient.username}</S.Link>
        </S.Text>
        <S.Date>{shortDate(createdDate, true)}</S.Date>
      </S.Content>
    </S.Container>
  );
};

export default TransferInfo;
