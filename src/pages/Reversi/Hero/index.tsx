import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import reversiArena from 'assets/reversi-arena.webp';

import * as S from './Styles';

const Hero = () => (
  <S.Hero aria-label="Reversi overview">
    <S.Artwork>
      <S.Image
        alt="A luminous cyan Reversi arena with black and ivory disks and one disk suspended mid-flip"
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
        <S.PlayLink href="#reversi-computer">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          Play free
        </S.PlayLink>
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
