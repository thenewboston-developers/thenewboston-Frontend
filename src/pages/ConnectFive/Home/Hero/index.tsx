import {mdiPlay, mdiTrophyOutline} from '@mdi/js';
import Icon from '@mdi/react';

import connectFiveCosmos from 'assets/connect-five-cosmos.webp';
import {analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

interface Props {
  isAuthenticated: boolean;
}

const Hero = ({isAuthenticated}: Props) => (
  <S.Hero aria-label="Connect Five overview">
    <S.Artwork>
      <S.Image
        alt="A cosmic violet strategy board with exactly five golden stones connected in a winning line"
        fetchPriority="high"
        height={960}
        src={connectFiveCosmos}
        width={1440}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>
        <S.WinningLine aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </S.WinningLine>
        Find your winning line
      </S.Eyebrow>
      <S.Title aria-label="Connect Five">
        Connect <span>Five</span>
      </S.Title>
      <S.Description>Five in a row. A move ahead.</S.Description>
      <S.Actions>
        {isAuthenticated ? (
          <S.PrimaryLink {...analyticsTarget('challenge_a_player')} href="#challenge-player">
            Challenge a player
          </S.PrimaryLink>
        ) : (
          <S.PrimaryLink href="#computer-game">
            <Icon aria-hidden path={mdiPlay} size={0.85} />
            Play free
          </S.PrimaryLink>
        )}
        <S.LeaderboardLink {...analyticsTarget('leaderboard')} to="/connect-five/leaderboard">
          <Icon aria-hidden path={mdiTrophyOutline} size={0.85} />
          Leaderboard
        </S.LeaderboardLink>
      </S.Actions>
      <S.Facts aria-label="Game features">
        <li>Computer &amp; multiplayer</li>
        <li>Ranked matches</li>
      </S.Facts>
    </S.Content>
  </S.Hero>
);

export default Hero;
