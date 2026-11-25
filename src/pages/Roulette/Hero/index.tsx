import {MouseEvent} from 'react';
import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import rouletteWheel from 'assets/roulette-thumbnail.webp';

import * as S from './Styles';

const scrollTo = (event: MouseEvent, id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  if (target instanceof HTMLDetailsElement) target.open = true;
  target.scrollIntoView({behavior: 'smooth', block: 'start'});
  target.focus({preventScroll: true});
};

const Hero = () => (
  <S.Hero aria-label="Roulette overview">
    <S.Artwork>
      <S.Image
        alt="A polished walnut and brass roulette wheel on an emerald green table"
        fetchPriority="high"
        height={600}
        src={rouletteWheel}
        width={900}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>
        <S.WheelMark aria-hidden="true" />
        The thenewboston casino
      </S.Eyebrow>
      <S.Title>Roulette</S.Title>
      <S.Tagline>One wheel. Thirty-seven pockets.</S.Tagline>
      <S.Description>Stack your chips, call your spot, and watch the ivory ball find its pocket.</S.Description>
      <S.Actions>
        <S.PlayButton href="#roulette-table" onClick={(event) => scrollTo(event, 'roulette-table')}>
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          Place your bets
        </S.PlayButton>
        <S.RulesLink href="#roulette-rules" onClick={(event) => scrollTo(event, 'roulette-rules')}>
          Payouts &amp; rules
        </S.RulesLink>
      </S.Actions>
      <S.Note>Played with TNB. Every accepted wager has its payout covered.</S.Note>
      <S.Facts aria-label="Game features">
        <li>Single-zero wheel</li>
        <li>Up to 36× return</li>
        <li>Provably fair spins</li>
      </S.Facts>
    </S.Content>
  </S.Hero>
);

export default Hero;
