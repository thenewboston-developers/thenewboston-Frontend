import {MouseEvent} from 'react';
import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import letItRideTable from 'assets/let-it-ride-thumbnail.svg';

import * as S from './Styles';

const scrollTo = (event: MouseEvent, id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({behavior: 'smooth', block: 'start'});
  target.focus({preventScroll: true});
};

const Hero = () => (
  <S.Hero aria-label="Let It Ride overview">
    <S.Artwork>
      <S.Image
        alt="A royal flush in spades fanned over three gold chips on a midnight-blue card table"
        fetchPriority="high"
        height={600}
        src={letItRideTable}
        width={900}
      />
    </S.Artwork>
    <S.Content>
      <S.Eyebrow>
        <S.Suits aria-hidden="true">♠ ♥ ♣ ♦</S.Suits>
        The thenewboston casino
      </S.Eyebrow>
      <S.Title>Let It Ride</S.Title>
      <S.Tagline>Three bets. Five cards. Your call.</S.Tagline>
      <S.Description>
        Bet on a poker hand before you have seen it all. Like what you see? Let it ride. Not so sure? Pull a bet back.
      </S.Description>
      <S.Actions>
        <S.PlayButton href="#let-it-ride-table" onClick={(event) => scrollTo(event, 'let-it-ride-table')}>
          <Icon aria-hidden path={mdiPlay} size={0.85} />
          Take a seat
        </S.PlayButton>
        <S.RulesLink href="#let-it-ride-rules" onClick={(event) => scrollTo(event, 'let-it-ride-rules')}>
          How to play
        </S.RulesLink>
      </S.Actions>
      <S.Note>Played with TNB. Every accepted hand has its payout covered.</S.Note>
      <S.Facts aria-label="Game features">
        <li>Pull back two of three bets</li>
        <li>Up to 100 to 1</li>
        <li>Provably fair deals</li>
      </S.Facts>
    </S.Content>
  </S.Hero>
);

export default Hero;
