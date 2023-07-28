import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>
        <ToolbarMenuLink text="Trade" to="/exchange/trade" />
        <ToolbarMenuLink text="Orders" to="/exchange/orders" />
      </S.Left>
    </S.Container>
  );
};

export default Toolbar;
