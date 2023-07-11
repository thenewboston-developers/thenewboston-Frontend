import {SFC} from 'types';
import MenuLink from './MenuLink';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <MenuLink text="Trade" to="/exchange/trade" />
      <MenuLink text="Orders" to="/exchange/orders" />
    </S.Container>
  );
};

export default TopNav;
