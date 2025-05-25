import {ReactNode, useMemo} from 'react';
import {useToggle} from 'hooks';
import {Block, Dict, SFC, Wire} from 'types';

import Table from 'components/Table';
import {longDate} from 'utils/dates';
import {snakeToTitle} from 'utils/strings';

import * as S from './Styles';

export interface ExpandableWireProps {
  wire: Wire;
}

const ExpandableWire: SFC<ExpandableWireProps> = ({className, wire}) => {
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
      id: wire.id,
      amount: wire.amount,
      transaction_fee: wire.transaction_fee,
      sender: wire.sender,
      recipient: wire.recipient,
      signature: wire.signature,
      payload: wire.payload,
    };
    /* eslint-enable sort-keys */

    return Object.entries(orderedBlock)
      .filter(([key]) => key !== 'created_date')
      .map(([key, value]) => ({
        key: keyOverrides[key] || snakeToTitle(key),
        value: valueOverrides[key] ? valueOverrides[key](value) : value,
      }));
  }, [wire]);

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
        <S.Date>{longDate(wire.created_date)}</S.Date>
        <S.Amount>{wire.amount.toLocaleString()}</S.Amount>
      </S.Top>
      {renderBottom()}
    </S.Container>
  );
};

export default ExpandableWire;
