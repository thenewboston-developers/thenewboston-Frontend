import connectFiveCover from 'assets/connect-five-cover.webp';
import BackgammonBoard from 'pages/Backgammon/Board';
import {INITIAL_BOARD} from 'pages/Backgammon/utils';
import {SFC} from 'types';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

const Games: SFC = ({className}) => {
  return (
    <S.Container {...analyticsArea('games')} className={className}>
      <S.Content>
        <S.Header>
          <S.Eyebrow>PLAY ON THENEWBOSTON</S.Eyebrow>
          <S.Title>Games</S.Title>
          <S.Intro>Your next great match starts here.</S.Intro>
        </S.Header>
        <section aria-labelledby="featured-game-heading">
          <S.SectionHeader>
            <S.SectionTitle id="featured-game-heading">In the spotlight</S.SectionTitle>
            <S.GameCount>2 games</S.GameCount>
          </S.SectionHeader>
          <S.GameCard aria-label="Backgammon — open game lobby" to="/backgammon/home">
            <S.BackgammonArtwork>
              <BackgammonBoard board={INITIAL_BOARD} decorative />
              <S.FeaturedBadge>NEW GAME</S.FeaturedBadge>
            </S.BackgammonArtwork>
            <S.GameDetails>
              <S.Category>CLASSIC STRATEGY · COMPUTER & MULTIPLAYER</S.Category>
              <S.GameTitle>Backgammon</S.GameTitle>
              <S.Tagline>
                A little luck.
                <br />A lot of strategy.
              </S.Tagline>
              <S.Description>
                Race your checkers home and find the right moment to double. Play the computer for free or challenge a
                member for TNB.
              </S.Description>
              <S.Facts>
                <S.Fact>
                  <S.FactValue>Free practice</S.FactValue>
                  <S.FactLabel>Three computer levels</S.FactLabel>
                </S.Fact>
                <S.Fact>
                  <S.FactValue>Optional TNB stakes</S.FactValue>
                  <S.FactLabel>A fixed prize for the match</S.FactLabel>
                </S.Fact>
              </S.Facts>
              <S.PlayLabel>Open lobby</S.PlayLabel>
              <S.BrowserNote>Play in your browser · No download needed</S.BrowserNote>
            </S.GameDetails>
          </S.GameCard>
          <S.CardSpacer />
          <S.GameCard
            {...analyticsTarget('connect_five')}
            aria-label="Connect Five — open game lobby"
            to="/connect-five/home"
          >
            <S.Artwork>
              <S.Cover
                alt="Black and ivory stones on a Connect Five board, with five stones connected in a glowing line"
                height={1024}
                src={connectFiveCover}
                width={1536}
              />
              <S.FeaturedBadge>FEATURED GAME</S.FeaturedBadge>
            </S.Artwork>
            <S.GameDetails>
              <S.Category>STRATEGY · MULTIPLAYER</S.Category>
              <S.GameTitle>Connect Five</S.GameTitle>
              <S.Tagline>
                Simple rules.
                <br />
                Brilliant rivalries.
              </S.Tagline>
              <S.Description>
                Outthink your opponent, build your line, and connect five before they do. One board. Endless
                possibilities.
              </S.Description>
              <S.Facts>
                <S.Fact>
                  <S.FactValue>2 players</S.FactValue>
                  <S.FactLabel>Head to head</S.FactLabel>
                </S.Fact>
                <S.Fact>
                  <S.FactValue>5 in a row</S.FactValue>
                  <S.FactLabel>The winning move</S.FactLabel>
                </S.Fact>
              </S.Facts>
              <S.PlayLabel>Open lobby</S.PlayLabel>
              <S.BrowserNote>Play in your browser · No download needed</S.BrowserNote>
            </S.GameDetails>
          </S.GameCard>
        </section>
        <S.About aria-label="The games experience">
          <S.AboutItem>
            <S.AboutTitle>Find your rival</S.AboutTitle>
            <S.AboutText>Challenge a member and make every move count.</S.AboutText>
          </S.AboutItem>
          <S.AboutItem>
            <S.AboutTitle>Find your rhythm</S.AboutTitle>
            <S.AboutText>Practice your backgammon or climb the Connect Five leaderboard.</S.AboutText>
          </S.AboutItem>
          <S.AboutItem>
            <S.AboutTitle>Take a front-row seat</S.AboutTitle>
            <S.AboutText>Watch live matches and see the next great move.</S.AboutText>
          </S.AboutItem>
        </S.About>
      </S.Content>
    </S.Container>
  );
};

export default Games;
