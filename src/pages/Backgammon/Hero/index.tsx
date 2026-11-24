import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import backgammonClub from 'assets/backgammon-club.webp';

import * as S from './Styles';

interface Props {
  isCreating: boolean;
  onPlay: () => void;
}

const Hero = ({isCreating, onPlay}: Props) => (
  <S.Hero aria-label="Backgammon overview">
    <S.Content>
      <S.Eyebrow>The strategy club</S.Eyebrow>
      <S.Title>Backgammon</S.Title>
      <S.Tagline>
        A little luck.
        <br />
        <em>A lot of strategy.</em>
      </S.Tagline>
      <S.Description>
        Race your checkers home. Read the board, trust your instincts, and make every roll count.
      </S.Description>
      <S.Actions>
        <S.PlayButton disabled={isCreating} onClick={onPlay} type="button">
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          {isCreating ? 'Preparing your game…' : 'Play free'}
        </S.PlayButton>
        <S.ChallengeLink href="#backgammon-challenge">Challenge a player</S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
    </S.Content>
    <S.Artwork>
      <S.Image
        alt="A walnut and brass Backgammon board with emerald felt, ivory and coral checkers, and two dice"
        fetchPriority="high"
        height={960}
        src={backgammonClub}
        width={1440}
      />
    </S.Artwork>
    <S.Features aria-label="Game features">
      <li>Two players</li>
      <li>Thirty checkers</li>
      <li>Every roll, a possibility</li>
    </S.Features>
  </S.Hero>
);

export default Hero;
