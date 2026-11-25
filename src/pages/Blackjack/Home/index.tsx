import CasinoSession from 'components/Casino/Session';

import {CardFace} from '../Card';
import Rules from '../Rules';
import * as S from '../Styles';
import Table from '../Table';

const Home = () => (
  <S.Container>
    <S.Navigation>
      <S.TextLink to="/games">← All games</S.TextLink>
      <S.Badge>Six decks · Provably fair</S.Badge>
    </S.Navigation>
    <S.Masthead>
      <S.Fan aria-hidden="true">
        <S.FanCard>
          <CardFace card="AS" />
        </S.FanCard>
        <S.FanCard>
          <CardFace card="KH" />
        </S.FanCard>
      </S.Fan>
      <div>
        <S.Eyebrow>The thenewboston casino</S.Eyebrow>
        <S.Heading>Blackjack</S.Heading>
      </div>
      <S.Tagline>Get closer to 21 than the dealer. Know when to hold.</S.Tagline>
    </S.Masthead>
    <CasinoSession>
      <Table />
    </CasinoSession>
    <Rules />
  </S.Container>
);

export default Home;
