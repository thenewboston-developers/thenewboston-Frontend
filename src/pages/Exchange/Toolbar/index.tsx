import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.Center>
        <ToolbarMenuLink text="Trade" to="/exchange/trade" />
        <ToolbarMenuLink text="Orders" to="/exchange/orders" />
      </S.Center>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
