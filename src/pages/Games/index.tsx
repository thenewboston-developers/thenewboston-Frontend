import {mdiGamepadVariantOutline, mdiTrophyOutline, mdiWeb} from '@mdi/js';
import Icon from '@mdi/react';

import backgammonThumbnail from 'assets/backgammon-thumbnail.webp';
import battleshipThumbnail from 'assets/battleship-thumbnail.webp';
import checkersThumbnail from 'assets/checkers-thumbnail.webp';
import connectFiveThumbnail from 'assets/connect-five-thumbnail.webp';
import dotsAndBoxesThumbnail from 'assets/dots-and-boxes-thumbnail.webp';
import hexThumbnail from 'assets/hex-thumbnail.webp';
import mancalaThumbnail from 'assets/mancala-thumbnail.webp';
import reversiThumbnail from 'assets/reversi-thumbnail.webp';
import GameFund from 'components/GameFund';
import {SFC} from 'types';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

const games = [
  {
    accent: '#ad542b',
    art: battleshipThumbnail,
    badge: 'TACTICAL FAVORITE',
    category: 'Naval strategy',
    description: 'Hide your fleet. Read your rival. Make every shot count.',
    imageDescription: 'A miniature naval fleet on a stormy ocean tactical grid with warm targeting lights',
    name: 'Battleship',
    path: 'battleship',
    target: 'battleship',
  },
  {
    accent: '#26675e',
    art: backgammonThumbnail,
    badge: 'TIMELESS CLASSIC',
    category: 'Dice & strategy',
    description: 'A little luck. A lot of strategy. Race your checkers home.',
    imageDescription: 'A refined teal and brass backgammon board with polished checkers and ivory dice',
    name: 'Backgammon',
    path: 'backgammon',
    target: 'backgammon',
  },
  {
    accent: '#7842ba',
    art: connectFiveThumbnail,
    badge: 'ONE MORE ROUND',
    category: 'Five-in-a-row strategy',
    description: 'Simple rules. Brilliant rivalries. Find your winning line.',
    imageDescription: 'Black and ivory stones with a glowing five-stone winning line in a violet arena',
    name: 'Connect Five',
    path: 'connect-five',
    target: 'connect_five',
  },
  {
    accent: '#bd3349',
    art: checkersThumbnail,
    badge: 'NEW TO THE ARCADE',
    category: 'Classic board strategy',
    description: 'Plan your jumps. Find your opening. Crown your next king.',
    imageDescription: 'Glossy red and ivory checkers with a stacked king on a cobalt and ivory board',
    name: 'Checkers',
    path: 'checkers',
    target: 'checkers',
  },
  {
    accent: '#087c91',
    art: reversiThumbnail,
    badge: 'JUST ARRIVED',
    category: 'Classic disk strategy',
    description: 'One move. The whole board turns. Outflank, flip, and take the corners.',
    imageDescription: 'Glossy black and ivory Reversi disks on a cyan-lit futuristic board',
    name: 'Reversi',
    path: 'reversi',
    target: 'reversi',
  },
  {
    accent: '#b4472e',
    art: mancalaThumbnail,
    badge: 'NEWEST ARRIVAL',
    category: 'Count & capture strategy',
    description: 'Sow your stones. Steal a turn. Capture what they leave open.',
    imageDescription: 'A sculptural Mancala board and jewel-colored glass stones in a warm coral scene',
    name: 'Mancala',
    path: 'mancala',
    target: 'mancala',
  },
  {
    accent: '#2f5bd0',
    art: dotsAndBoxesThumbnail,
    badge: 'PEN-AND-PAPER CLASSIC',
    category: 'Line-by-line strategy',
    description: 'Draw a line. Close a box. Go again. Simple to start, sneaky to master.',
    imageDescription: 'Porcelain pegs and blue and coral rods forming claimed boxes in a playful geometric scene',
    name: 'Dots and Boxes',
    path: 'dots-and-boxes',
    target: 'dots_and_boxes',
  },
  {
    accent: '#3257b8',
    art: hexThumbnail,
    badge: 'NO DRAWS, EVER',
    category: 'Connection strategy',
    description: 'One chain. Two edges. Block their path while you build yours.',
    imageDescription: 'Red and blue stones on a diamond of six-sided cells, a glowing red chain joining two edges',
    name: 'Hex',
    path: 'hex',
    target: 'hex',
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
