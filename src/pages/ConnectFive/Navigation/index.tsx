import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';

import * as S from './Styles';

const ConnectFiveNavigation: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.MenuItems>
        <ToolbarMenuLink text="Lobby" to="/connect-five/home" />
        <ToolbarMenuLink text="Leaderboard" to="/connect-five/leaderboard" />
      </S.MenuItems>
      <S.Right />
    </S.Container>
  );
};

export default ConnectFiveNavigation;
