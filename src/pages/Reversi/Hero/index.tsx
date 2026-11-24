import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import reversiArena from 'assets/reversi-arena.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Reversi overview">
    <S.Artwork>
      <S.Image
        alt="A classic green felt Reversi board with black and ivory disks in a dark forest frame"
        fetchPriority="high"
        height={960}
        src={reversiArena}
        width={1440}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>
        <S.DiskMark aria-hidden="true" />
        Black. White. Your move.
      </S.Eyebrow>
      <S.Title>Reversi</S.Title>
      <S.Tagline>One move. The whole board turns.</S.Tagline>
      <S.Description>Trap your opponent’s disks. Take the corners. Flip the game in your favor.</S.Description>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#reversi-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
      <S.Facts aria-label="Game features">
        <li>8 × 8 board</li>
        <li>2 players</li>
        <li>3 difficulty levels</li>
      </S.Facts>
    </S.Content>
  </S.Hero>
);

export default Hero;
