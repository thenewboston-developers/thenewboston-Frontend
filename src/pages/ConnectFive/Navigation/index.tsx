import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {PATH_GAMES} from 'constants/paths';
import {SFC} from 'types';

import * as S from './Styles';

const ConnectFiveNavigation: SFC = ({className}) => {
  return (
    <S.Container aria-label="Connect Five" className={className}>
      <S.BackLink to={PATH_GAMES}>All games</S.BackLink>
      <S.MenuItems>
        <ToolbarMenuLink text="Lobby" to="/connect-five/home" />
        <ToolbarMenuLink text="Leaderboard" to="/connect-five/leaderboard" />
      </S.MenuItems>
      <S.Right />
    </S.Container>
  );
};

export default ConnectFiveNavigation;
