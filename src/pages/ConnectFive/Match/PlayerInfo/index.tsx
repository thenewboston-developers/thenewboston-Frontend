import {Link} from 'react-router-dom';

import {SFC} from 'types';

import * as S from './Styles';

interface PlayerInfoProps {
  player: {avatar: string | null; connect_five_elo: number | null; id: number; username: string} | null;
  playerSide: 'black' | 'white' | null;
}

const getPlayerLabel = (player: {connect_five_elo: number | null; username: string}) => {
  if (typeof player.connect_five_elo !== 'number') return player.username;
  return `${player.username} (${player.connect_five_elo})`;
};

const PlayerInfo: SFC<PlayerInfoProps> = ({className, player, playerSide}) => {
  if (!player || !playerSide) return null;

  const profilePath = `/profile/${player.id}`;
  const sideLabel = playerSide === 'black' ? 'Black' : 'White';

  return (
    <S.PlayerLabel className={className}>
      <Link to={profilePath}>
        <S.PlayerAvatar $variant={playerSide} size="44px" src={player.avatar} />
      </Link>
      <S.PlayerLabelDetails>
        <S.PlayerName $isClickable as={Link} to={profilePath}>
          {getPlayerLabel(player)}
        </S.PlayerName>
        <S.PlayerSideText $variant={playerSide}>{sideLabel}</S.PlayerSideText>
      </S.PlayerLabelDetails>
    </S.PlayerLabel>
  );
};

export default PlayerInfo;
