import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import hexArena from 'assets/hex-arena.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Hex overview">
    <S.Content>
      <S.Eyebrow>Two colors. One winner. Always.</S.Eyebrow>
      <S.Title>Hex</S.Title>
      <S.Tagline>
        One chain.
        <br />
        <span>Edge to edge.</span>
      </S.Tagline>
      <S.Description>
        Place a stone, block a path, and join your two edges before your rival joins theirs. No game ever ends in a
        draw.
      </S.Description>
      <S.Features aria-label="Game features">
        <li>2 players</li>
        <li>4 board sizes</li>
        <li>3 difficulty levels</li>
      </S.Features>
    </S.Content>
    <S.Artwork>
      <S.Image
        alt="Glossy ruby and cobalt stones on a sculpted ivory Hex board with red and blue edges in a midnight-blue arena"
        fetchPriority="high"
        height={960}
        src={hexArena}
        width={1440}
      />
    </S.Artwork>
    <S.ActionBar>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.9} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#hex-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
    </S.ActionBar>
  </S.Hero>
);

export default Hero;
