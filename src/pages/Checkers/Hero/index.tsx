import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import checkersCrown from 'assets/checkers-crown.webp';

import * as S from './Styles';

const Hero = () => (
  <S.Hero aria-label="Checkers overview">
    <S.Content>
      <S.Eyebrow>A classic. With attitude.</S.Eyebrow>
      <S.Title>Checkers</S.Title>
      <S.Tagline>
        Make your move.
        <br />
        <span>Take the crown.</span>
      </S.Tagline>
      <S.Description>Set the trap. Find the jump. Turn a small move into your next big win.</S.Description>
      <S.Features aria-label="Game features">
        <li>2 players</li>
        <li>8 × 8 board</li>
        <li>3 difficulty levels</li>
      </S.Features>
    </S.Content>
    <S.Artwork>
      <S.Image
        alt="A cobalt and ivory eight-by-eight Checkers board with ruby-red and ivory disks and a stacked red king"
        fetchPriority="high"
        height={960}
        src={checkersCrown}
        width={1440}
      />
    </S.Artwork>
    <S.ActionBar>
      <S.Actions>
        <S.PlayLink href="#checkers-computer">
          <Icon aria-hidden path={mdiPlay} size={0.9} />
          Play free
        </S.PlayLink>
        <S.ChallengeLink href="#checkers-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
    </S.ActionBar>
  </S.Hero>
);

export default Hero;
