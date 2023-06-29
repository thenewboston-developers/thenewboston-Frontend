import {ReactNode, useMemo} from 'react';

import Table from 'components/Table';
import {useToggle} from 'hooks';
import {Block, Dict, SFC} from 'types';
import {longDate} from 'utils/dates';
import {snakeToTitle} from 'utils/strings';
import * as S from './Styles';

export interface ExpandableBlockProps {
  block: Block;
}

const ExpandableBlock: SFC<ExpandableBlockProps> = ({block, className}) => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const rows = useMemo(() => {
    const keyOverrides: Dict<string> = {
      id: 'Block ID',
    };

    const valueOverrides: {[key: string]: (value?: any) => ReactNode} = {
      payload: (value) => JSON.stringify(value, null, 4),
    };

    /* eslint-disable sort-keys */
    const orderedBlock: Block = {
      id: block.id,
      amount: block.amount,
      transaction_fee: block.transaction_fee,
      sender: block.sender,
      recipient: block.recipient,
      signature: block.signature,
      payload: block.payload,
      created_date: block.created_date,
    };
    /* eslint-enable sort-keys */

    return Object.entries(orderedBlock)
      .filter(([key]) => key !== 'created_date')
      .map(([key, value]) => ({
        key: keyOverrides[key] || snakeToTitle(key),
        value: valueOverrides[key] ? valueOverrides[key](value) : value,
      }));
  }, [block]);

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
        <S.Date>{longDate(block.created_date)}</S.Date>
        <S.Amount>{block.amount}</S.Amount>
      </S.Top>
      {renderBottom()}
    </S.Container>
  );
};

export default ExpandableBlock;
