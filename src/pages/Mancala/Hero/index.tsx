import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import mancalaStudio from 'assets/mancala-studio.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Mancala overview">
    <S.Artwork>
      <S.Image
        alt="A honey-colored Mancala board with twelve pits, two stores, and jewel-colored glass stones in a warm coral studio"
        fetchPriority="high"
        height={934}
        src={mancalaStudio}
        width={1400}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>A timeless game. A fresh challenge.</S.Eyebrow>
      <S.Title>
        Mancala<span aria-hidden="true">.</span>
      </S.Title>
      <S.Tagline>
        Small stones.
        <br />
        Big moves.
      </S.Tagline>
      <S.Description>Sow your stones, find your rhythm, and make every move count.</S.Description>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#mancala-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
    </S.Content>
    <S.StudioLabel aria-hidden="true">
      Sow. Capture.
      <br />
      Repeat.
    </S.StudioLabel>
    <S.Features aria-label="Game features">
      <li>48 stones</li>
      <li>2 players</li>
      <li>3 difficulty levels</li>
    </S.Features>
  </S.Hero>
);

export default Hero;
