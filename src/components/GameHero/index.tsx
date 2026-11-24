import {mdiArrowRight, mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import * as S from './Styles';

interface Props {
  artwork: string;
  artworkAlt: string;
  challengeHref: string;
  description: string;
  eyebrow: string;
  game: string;
  highlights: string[];
  playHref: string;
  tagline: string;
  theme: 'ocean' | 'emerald' | 'amber';
}

const GameHero = ({
  artwork,
  artworkAlt,
  challengeHref,
  description,
  eyebrow,
  game,
  highlights,
  playHref,
  tagline,
  theme,
}: Props) => (
  <S.Hero $theme={theme} aria-label={`${game} overview`}>
    <S.Content>
      <S.Eyebrow>{eyebrow}</S.Eyebrow>
      <S.Title>{game}</S.Title>
      <S.Tagline>{tagline}</S.Tagline>
      <S.Description>{description}</S.Description>
      <S.Actions>
        <S.PlayLink href={playHref}>
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          Play free
        </S.PlayLink>
        <S.ChallengeLink href={challengeHref}>
          Challenge a player
          <Icon aria-hidden path={mdiArrowRight} size={0.75} />
        </S.ChallengeLink>
      </S.Actions>
      <S.Note>No account needed for computer play</S.Note>
    </S.Content>
    <S.Artwork>
      <S.Image alt={artworkAlt} fetchPriority="high" height={800} src={artwork} width={1200} />
      <S.ArtworkCaption aria-hidden="true">
        <S.LiveDot />
        Your next great game
      </S.ArtworkCaption>
    </S.Artwork>
    <S.Highlights aria-label="Game features">
      {highlights.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </S.Highlights>
  </S.Hero>
);

export default GameHero;
