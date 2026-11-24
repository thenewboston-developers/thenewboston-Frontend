import {SFC} from 'types';

import * as S from './Styles';

interface PlayerInfoProps {
  computerDifficulty?: string;
  player: {avatar: string | null; connect_five_elo: number | null; id: number; username: string} | null;
  playerSide: 'black' | 'white' | null;
}

const PlayerInfo: SFC<PlayerInfoProps> = ({className, computerDifficulty, player, playerSide}) => {
  if (!playerSide) return null;
  if (!player && computerDifficulty)
    return (
      <S.PlayerLabel className={className}>
        <S.PlayerAvatar $variant={playerSide} size="44px" src={null} />
        <S.PlayerLabelDetails>
          <S.ComputerName>Computer</S.ComputerName>
          <S.PlayerMeta>
            {computerDifficulty} · {playerSide === 'black' ? 'Black' : 'White'}
          </S.PlayerMeta>
        </S.PlayerLabelDetails>
      </S.PlayerLabel>
    );
  if (!player) return null;
  if (player.id === 0)
    return (
      <S.PlayerLabel className={className}>
        <S.PlayerAvatar $variant={playerSide} size="44px" src={null} />
        <S.PlayerLabelDetails>
          <S.ComputerName>Guest · You</S.ComputerName>
          <S.PlayerMeta>{playerSide === 'black' ? 'Black' : 'White'} · Free play</S.PlayerMeta>
        </S.PlayerLabelDetails>
      </S.PlayerLabel>
    );

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
