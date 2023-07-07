import {ReactNode, useMemo} from 'react';

import Table from 'components/Table';
import {useToggle} from 'hooks';
import {Block, Dict, SFC, Transfer} from 'types';
import {longDate} from 'utils/dates';
import {snakeToTitle} from 'utils/strings';
import * as S from './Styles';

export interface ExpandableTransferProps {
  transfer: Transfer;
}

const ExpandableTransfer: SFC<ExpandableTransferProps> = ({className, transfer}) => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const rows = useMemo(() => {
    const keyOverrides: Dict<string> = {
      id: 'Block ID',
    };

    const valueOverrides: {[key: string]: (value?: any) => ReactNode} = {
      amount: (value) => value.toLocaleString(),
      payload: (value) => JSON.stringify(value, null, 4),
      transaction_fee: (value) => value.toLocaleString(),
    };

    /* eslint-disable sort-keys */
    const orderedBlock: Block = {
      id: transfer.id,
      amount: transfer.amount,
      transaction_fee: transfer.transaction_fee,
      sender: transfer.sender,
      recipient: transfer.recipient,
      signature: transfer.signature,
      payload: transfer.payload,
    };
    /* eslint-enable sort-keys */

    return Object.entries(orderedBlock)
      .filter(([key]) => key !== 'created_date')
      .map(([key, value]) => ({
        key: keyOverrides[key] || snakeToTitle(key),
        value: valueOverrides[key] ? valueOverrides[key](value) : value,
      }));
  }, [transfer]);

  const renderBottom = () => {
    if (!isExpanded) return null;

    return (
      <S.Bottom>
        <Table rows={rows} />
      </S.Bottom>
    );
  };

  return (
    <S.Container className={className}>
      <S.Top onClick={toggleIsExpanded}>
        <S.Date>{longDate(transfer.created_date)}</S.Date>
        <S.Amount>{transfer.amount.toLocaleString()}</S.Amount>
      </S.Top>
      {renderBottom()}
    </S.Container>
  );
};

export default ExpandableTransfer;
