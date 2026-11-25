import {PATH_GAMES} from 'constants/paths';
import {SFC} from 'types';

import * as S from './Styles';

const ConnectFiveNavigation: SFC = ({className}) => {
  return (
    <S.Container aria-label="Connect Five" className={className}>
      <S.BackLink to={PATH_GAMES}>All games</S.BackLink>
      <S.MenuItems>
        <S.MenuLink text="Lobby" to="/connect-five/home" />
        <S.MenuLink text="ELO leaderboard" to="/connect-five/leaderboard" />
      </S.MenuItems>
      <S.Right />
    </S.Container>
  );
};

export default ConnectFiveNavigation;
