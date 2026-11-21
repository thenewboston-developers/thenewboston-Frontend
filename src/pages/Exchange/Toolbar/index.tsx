import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {useIsAuthenticated} from 'hooks';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <S.Container className={className}>
      <S.Left />
      <S.MenuItems>
        <ToolbarMenuLink text="Home" to="/exchange/home" />
        {isAuthenticated && <ToolbarMenuLink text="Orders" to="/exchange/orders" />}
        <ToolbarMenuLink text="Learn More" to="/exchange/learn-more" />
      </S.MenuItems>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
