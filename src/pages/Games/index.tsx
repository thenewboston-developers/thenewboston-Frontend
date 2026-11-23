import connectFiveCover from 'assets/connect-five-cover.webp';
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
            <S.GameCount>1 game</S.GameCount>
          </S.SectionHeader>
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
        <S.About aria-label="The Connect Five experience">
          <S.AboutItem>
            <S.AboutTitle>Find your rival</S.AboutTitle>
            <S.AboutText>Challenge a member and make every move count.</S.AboutText>
          </S.AboutItem>
          <S.AboutItem>
            <S.AboutTitle>Make your mark</S.AboutTitle>
            <S.AboutText>Build your rating and climb the leaderboard.</S.AboutText>
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
