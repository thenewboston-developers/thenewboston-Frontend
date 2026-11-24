import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import dotsAndBoxesPlayground from 'assets/dots-and-boxes-playground.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Dots and Boxes overview">
    <S.Artwork>
      <S.Image
        alt="A mint Dots and Boxes board with ivory pegs, blue and coral connecting rods, and four claimed glass squares"
        fetchPriority="high"
        height={960}
        src={dotsAndBoxesPlayground}
        width={1440}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>
        <S.BoxMark aria-hidden="true" />A little line. A big idea.
      </S.Eyebrow>
      <S.Title>
        Dots <span>&amp;</span>
        <br />
        Boxes
      </S.Title>
      <S.Tagline>Draw a line. Close a box. Go again.</S.Tagline>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#dots-and-boxes-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
      <S.Facts aria-label="Game features">
        <li>3 board sizes</li>
        <li>3 difficulty levels</li>
      </S.Facts>
    </S.Content>
    <S.CornerMark aria-hidden="true" />
  </S.Hero>
);

export default Hero;
