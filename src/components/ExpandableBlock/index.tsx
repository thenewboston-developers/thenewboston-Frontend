import {ReactNode} from 'react';

import Table from 'components/Table';
import {useToggle} from 'hooks';
import {Block, Dict, SFC} from 'types';
import {camelToTitle} from 'utils/strings';
import * as S from './Styles';

export interface ExpandableBlockProps {
  block: Block;
}

const ExpandableBlock: SFC<ExpandableBlockProps> = ({block, className}) => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const renderBottom = () => {
    if (!isExpanded) return null;

    const keyOverrides: Dict<string> = {
      id: 'Block ID',
      transaction_fee: 'Transaction Fee',
    };

    const valueOverrides: {[key: string]: (value?: any) => ReactNode} = {
      payload: (value) => JSON.stringify(value, null, 4),
    };

    const rows = Object.entries(block).map(([key, value]) => ({
      key: keyOverrides[key] || camelToTitle(key),
      value: valueOverrides[key] ? valueOverrides[key](value) : value,
    }));

    return (
      <S.Bottom>
        <Table rows={rows} />
      </S.Bottom>
    );
  };

  return (
    <S.Container className={className}>
      <S.Top onClick={toggleIsExpanded}>
        <S.Date>12/12/12</S.Date>
        <S.Amount>{block.amount}</S.Amount>
      </S.Top>
      {renderBottom()}
    </S.Container>
  );
};

export default ExpandableBlock;
