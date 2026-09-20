import {SFC} from 'types';

import * as S from './Styles';

interface PlayerInfoProps {
  player: {avatar: string | null; connect_five_elo: number | null; id: number; username: string} | null;
  playerSide: 'black' | 'white' | null;
}

const PlayerInfo: SFC<PlayerInfoProps> = ({className, player, playerSide}) => {
  if (!player || !playerSide) return null;

  const hasElo = typeof player.connect_five_elo === 'number';
  const profilePath = `/profile/${player.id}`;
  const sideLabel = playerSide === 'black' ? 'Black' : 'White';

  return (
    <S.PlayerLabel className={className}>
      <S.PlayerAvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
        <S.PlayerAvatar $variant={playerSide} size="44px" src={player.avatar} />
      </S.PlayerAvatarLink>
      <S.PlayerLabelDetails>
        <S.PlayerName to={profilePath}>{player.username}</S.PlayerName>
        <S.PlayerMeta>
          <S.PlayerSideText>{sideLabel}</S.PlayerSideText>
          {hasElo && (
            <>
              <span aria-hidden="true">&middot;</span>
              <S.PlayerElo>{`ELO ${player.connect_five_elo}`}</S.PlayerElo>
            </>
          )}
        </S.PlayerMeta>
      </S.PlayerLabelDetails>
    </S.PlayerLabel>
  );
};

export default PlayerInfo;
