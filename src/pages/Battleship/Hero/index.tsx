import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import battleshipCommand from 'assets/battleship-command.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Battleship overview">
    <S.Artwork>
      <S.Image
        alt="A fleet of five naval ships crossing a moonlit ocean tactical grid with amber target markers"
        fetchPriority="high"
        height={960}
        src={battleshipCommand}
        width={1440}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>
        <S.RadarMark aria-hidden="true" />
        Take command
      </S.Eyebrow>
      <S.Title>Battleship</S.Title>
      <S.Tagline>Hide your fleet. Hunt theirs.</S.Tagline>
      <S.Description>Read the water. Plan your next strike. Make every shot count.</S.Description>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#battleship-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
      <S.Facts aria-label="Game features">
        <li>Hidden fleets</li>
        <li>Turn-based strategy</li>
        <li>Computer &amp; multiplayer</li>
      </S.Facts>
    </S.Content>
  </S.Hero>
);

export default Hero;
