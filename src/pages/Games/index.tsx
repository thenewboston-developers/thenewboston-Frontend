import {mdiGamepadVariantOutline, mdiTrophyOutline, mdiWeb} from '@mdi/js';
import Icon from '@mdi/react';

import backgammonCover from 'assets/backgammon-cover.webp';
import battleshipCover from 'assets/battleship-cover.webp';
import checkersCover from 'assets/checkers-cover.webp';
import connectFiveCover from 'assets/connect-five-cover.webp';
import mancalaCover from 'assets/mancala-cover.webp';
import reversiCover from 'assets/reversi-cover.webp';
import GameFund from 'components/GameFund';
import {SFC} from 'types';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

const games = [
  {
    accent: '#146984',
    art: battleshipCover,
    badge: 'TACTICAL FAVORITE',
    category: 'Naval strategy',
    description: 'Hide your fleet. Read your rival. Make every shot count.',
    imageDescription: 'Sculpted naval ships on an illuminated ocean-blue tactical board',
    name: 'Battleship',
    path: 'battleship',
    target: 'battleship',
  },
  {
    accent: '#23735c',
    art: backgammonCover,
    badge: 'TIMELESS CLASSIC',
    category: 'Dice & strategy',
    description: 'A little luck. A lot of strategy. Race your checkers home.',
    imageDescription: 'An emerald and walnut backgammon board with polished checkers and ivory dice',
    name: 'Backgammon',
    path: 'backgammon',
    target: 'backgammon',
  },
  {
    accent: '#6c51ae',
    art: connectFiveCover,
    badge: 'ONE MORE ROUND',
    category: 'Five-in-a-row strategy',
    description: 'Simple rules. Brilliant rivalries. Find your winning line.',
    imageDescription: 'Black and ivory stones with five connected in a glowing violet line',
    name: 'Connect Five',
    path: 'connect-five',
    target: 'connect_five',
  },
  {
    accent: '#9a642d',
    art: checkersCover,
    badge: 'NEW TO THE ARCADE',
    category: 'Classic board strategy',
    description: 'Plan your jumps. Find your opening. Crown your next king.',
    imageDescription: 'Polished black and ivory checkers on a warm wooden board with a crowned king',
    name: 'Checkers',
    path: 'checkers',
    target: 'checkers',
  },
  {
    accent: '#3f4a6b',
    art: reversiCover,
    badge: 'JUST ARRIVED',
    category: 'Classic disk strategy',
    description: 'One move. The whole board turns. Outflank, flip, and take the corners.',
    imageDescription: 'Black and ivory disks on an emerald Reversi board, with one disk caught mid-flip',
    name: 'Reversi',
    path: 'reversi',
    target: 'reversi',
  },
  {
    accent: '#b4472e',
    art: mancalaCover,
    badge: 'NEWEST ARRIVAL',
    category: 'Count & capture strategy',
    description: 'Sow your stones. Steal a turn. Capture what they leave open.',
    imageDescription: 'A carved walnut mancala board with glass stones in jewel colors',
    name: 'Mancala',
    path: 'mancala',
    target: 'mancala',
  },
];

const Games: SFC = ({className}) => (
  <S.Container {...analyticsArea('games')} className={className}>
    <S.Content>
      <S.Header>
        <div>
          <S.Eyebrow>THE THENEWBOSTON ARCADE</S.Eyebrow>
          <S.Title>Great games. Good company.</S.Title>
          <S.Intro>Your next favorite is a play away. Jump in, find your rhythm, and go for the win.</S.Intro>
        </div>
        <S.BrowserBadge>
          <Icon aria-hidden="true" path={mdiWeb} size="18px" />
          No downloads. Just play.
        </S.BrowserBadge>
      </S.Header>
      <section aria-labelledby="featured-game-heading">
        <S.SectionHeader>
          <div>
            <S.SectionTitle id="featured-game-heading">Find your next obsession</S.SectionTitle>
            <S.SectionDescription>Classic games. Endless ways to outplay.</S.SectionDescription>
          </div>
          <S.GameCount>{games.length} games · Free to play</S.GameCount>
        </S.SectionHeader>
        <S.GameGrid>
          {games.map((game) => (
            <S.GameCard
              {...analyticsTarget(game.target)}
              $accent={game.accent}
              aria-label={`${game.name} — play now`}
              key={game.path}
              to={`/${game.path}/home`}
            >
              <S.Artwork>
                <S.Cover alt={game.imageDescription} height={800} src={game.art} width={1200} />
                <S.FeaturedBadge>{game.badge}</S.FeaturedBadge>
              </S.Artwork>
              <S.GameDetails>
                <S.Category>{game.category}</S.Category>
                <S.GameTitle>{game.name}</S.GameTitle>
                <S.Description>{game.description}</S.Description>
                <S.Tags>
                  <span>vs. Computer</span>
                  <span>Multiplayer</span>
                </S.Tags>
                <S.CardFooter>
                  <S.FreeLabel>
                    Free<S.FreeNote>No install</S.FreeNote>
                  </S.FreeLabel>
                  <S.PlayLabel>Play now</S.PlayLabel>
                </S.CardFooter>
              </S.GameDetails>
            </S.GameCard>
          ))}
        </S.GameGrid>
      </section>
      <GameFund />
      <S.About aria-label="The games experience">
        <S.AboutItem>
          <S.AboutIcon aria-hidden="true" path={mdiGamepadVariantOutline} size="24px" />
          <div>
            <S.AboutTitle>Try it. Love it. Play again.</S.AboutTitle>
            <S.AboutText>Play the computer with no account required.</S.AboutText>
          </div>
        </S.AboutItem>
        <S.AboutItem>
          <S.AboutIcon aria-hidden="true" path={mdiTrophyOutline} size="24px" />
          <div>
            <S.AboutTitle>Make your wins count.</S.AboutTitle>
            <S.AboutText>Create an account to earn funded rewards and challenge friends.</S.AboutText>
          </div>
        </S.AboutItem>
      </S.About>
    </S.Content>
  </S.Container>
);

export default Games;
