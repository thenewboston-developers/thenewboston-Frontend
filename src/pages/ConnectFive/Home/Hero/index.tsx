import {mdiPlay, mdiTrophyOutline} from '@mdi/js';
import Icon from '@mdi/react';

import connectFiveHero from 'assets/connect-five-classic-hero.webp';
import {analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Connect Five overview">
    <S.Artwork>
      <S.Image
        alt="Black and ivory stones on a honey-wood Connect Five board"
        fetchPriority="high"
        height={960}
        src={connectFiveHero}
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
        <S.PrimaryButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PrimaryButton>
        <S.LeaderboardLink {...analyticsTarget('leaderboard')} to="/connect-five/leaderboard">
          <Icon aria-hidden path={mdiTrophyOutline} size={0.85} />
          ELO leaderboard
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
