import {mdiArrowRight} from '@mdi/js';

import connectFiveCover from 'assets/connect-five-cover.webp';
import GameFund from 'components/GameFund';
import BackgammonBoard from 'pages/Backgammon/Board';
import {INITIAL_BOARD} from 'pages/Backgammon/utils';
import BattleshipArtwork from 'pages/Battleship/Artwork';
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
        <GameFund />
        <section aria-labelledby="featured-game-heading">
          <S.SectionHeader>
            <S.SectionTitle id="featured-game-heading">In the spotlight</S.SectionTitle>
            <S.GameCount>3 games</S.GameCount>
          </S.SectionHeader>
          <S.GameCard aria-label="Battleship — open game lobby" to="/battleship/home">
            <S.BattleshipArtwork>
              <BattleshipArtwork />
              <S.FeaturedBadge>NEW GAME</S.FeaturedBadge>
            </S.BattleshipArtwork>
            <S.GameDetails>
              <S.Category>NAVAL STRATEGY · COMPUTER & MULTIPLAYER</S.Category>
              <S.GameTitle>Battleship</S.GameTitle>
              <S.Tagline>
                Hide your fleet.
                <br />
                Hunt theirs.
              </S.Tagline>
              <S.Description>
                Plot your fleet, read the water, and make every shot count. Play the computer for free or challenge a
                member for TNB.
              </S.Description>
              <S.Facts>
                <S.Fact>
                  <S.FactValue>Five ships. One mission.</S.FactValue>
                  <S.FactLabel>Sink the opposing fleet</S.FactLabel>
                </S.Fact>
                <S.Fact>
                  <S.FactValue>Optional TNB stakes</S.FactValue>
                  <S.FactLabel>Free computer practice</S.FactLabel>
                </S.Fact>
              </S.Facts>
              <S.PlayLabel>Open lobby</S.PlayLabel>
              <S.BrowserNote>Private boards · No download needed</S.BrowserNote>
            </S.GameDetails>
          </S.GameCard>
          <S.CardSpacer />
          <S.GameCard aria-label="Backgammon — open game lobby" to="/backgammon/home">
            <S.BackgammonArtwork>
              <BackgammonBoard board={INITIAL_BOARD} decorative />
              <S.FeaturedBadge>CLASSIC GAME</S.FeaturedBadge>
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
              <S.Category>STRATEGY · COMPUTER & MULTIPLAYER</S.Category>
              <S.GameTitle>Connect Five</S.GameTitle>
              <S.Tagline>
                Simple rules.
                <br />
                Brilliant rivalries.
              </S.Tagline>
              <S.Description>
                Practice against the computer or challenge a member. Build your line and connect five before they do.
              </S.Description>
              <S.Facts>
                <S.Fact>
                  <S.FactValue>Free computer play</S.FactValue>
                  <S.FactLabel>Three difficulty levels</S.FactLabel>
                </S.Fact>
                <S.Fact>
                  <S.FactValue>5 in a row</S.FactValue>
                  <S.FactLabel>The winning move</S.FactLabel>
                </S.Fact>
              </S.Facts>
              <S.PlayLabel>
                Open lobby
                <S.PlayIcon aria-hidden="true" path={mdiArrowRight} size="18px" />
              </S.PlayLabel>
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
            <S.AboutText>
              Practice all three games against the computer, or climb the Connect Five leaderboard.
            </S.AboutText>
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
