import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';

import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.MenuItems>
        <ToolbarMenuLink text="Home" to="/wallets/home" />
        <ToolbarMenuLink text="Learn More" to="/wallets/learn-more" />
      </S.MenuItems>
      <S.Right />
    </S.Container>
  );
};

export default Toolbar;
