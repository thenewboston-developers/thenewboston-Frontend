import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import checkersCrown from 'assets/checkers-crown.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Checkers overview">
    <S.Content>
      <S.Eyebrow>Classic board. Fresh challenge.</S.Eyebrow>
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
        alt="A green and ivory eight-by-eight Checkers board with charcoal and ivory disks"
        fetchPriority="high"
        height={960}
        src={checkersCrown}
        width={1440}
      />
    </S.Artwork>
    <S.ActionBar>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.9} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#checkers-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
    </S.ActionBar>
  </S.Hero>
);

export default Hero;
