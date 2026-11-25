import {Navigate, Route, useLocation} from 'react-router-dom';

import CasinoSession from 'components/Casino/Session';
import SentryRoutes from 'components/SentryRoutes';

import * as S from './Styles';
import Table from './Table';

const Home = () => (
  <S.Container>
    <S.Content>
      <S.Navigation>
        <S.TextLink to="/games">← All games</S.TextLink>
        <S.Badge>SIX DECKS · VERIFIABLE HANDS</S.Badge>
      </S.Navigation>
      <S.Header>
        <div>
          <S.Eyebrow>The thenewboston card room</S.Eyebrow>
          <h1>Blackjack</h1>
          <p>Get closer to 21. Know when to hold.</p>
        </div>
        <span aria-hidden="true" style={{color: '#bd9a5e', fontFamily: 'Georgia,serif', fontSize: 64}}>
          ♠
        </span>
      </S.Header>
      <CasinoSession>
        <Table />
      </CasinoSession>
      <S.Panel aria-labelledby="blackjack-rules-heading">
        <S.Eyebrow>The house rules</S.Eyebrow>
        <S.Heading id="blackjack-rules-heading">Simple to learn. Yours to play.</S.Heading>
        <S.Rules>
          <div>
            <h3>Beat the dealer</h3>
            <p>
              Get closer to 21 without going over. Number cards count at face value, picture cards as 10, and aces as 1
              or 11. The dealer stands on every 17, including a soft 17.
            </p>
          </div>
          <div>
            <h3>Make your move</h3>
            <p>
              Hit for another card or stand to hold. On your first two cards, double down to add the same wager and
              receive one final card. This table offers no splitting, insurance, or surrender.
            </p>
          </div>
          <div>
            <h3>Know your returns</h3>
            <p>
              A two-card blackjack pays 3:2; other wins pay 1:1. A tie returns your wager. Six decks are shuffled for
              each hand. Unfinished hands automatically stand after 15 minutes. Return depends on your decisions.
            </p>
          </div>
        </S.Rules>
      </S.Panel>
    </S.Content>
  </S.Container>
);

const Blackjack = () => {
  const {hash, search} = useLocation();
  return (
    <SentryRoutes>
      <Route element={<Home />} path="/home" />
      <Route element={<Navigate replace to={{pathname: '/blackjack/home', search, hash}} />} path="*" />
    </SentryRoutes>
  );
};

export default Blackjack;
