import {mdiGamepadVariantOutline, mdiTrophyOutline, mdiWeb} from '@mdi/js';
import Icon from '@mdi/react';

import backgammonThumbnail from 'assets/backgammon-thumbnail.webp';
import battleshipThumbnail from 'assets/battleship-thumbnail.webp';
import blackjackThumbnail from 'assets/blackjack-thumbnail.webp';
import checkersThumbnail from 'assets/checkers-thumbnail.webp';
import connectFiveThumbnail from 'assets/connect-five-classic-thumbnail.webp';
import dotsAndBoxesThumbnail from 'assets/dots-and-boxes-thumbnail.webp';
import hexThumbnail from 'assets/hex-thumbnail.webp';
import letItRideThumbnail from 'assets/let-it-ride-thumbnail.webp';
import mancalaThumbnail from 'assets/mancala-thumbnail.webp';
import plinkoThumbnail from 'assets/plinko-thumbnail.webp';
import reversiThumbnail from 'assets/reversi-thumbnail.webp';
import rouletteThumbnail from 'assets/roulette-thumbnail.webp';
import slotsThumbnail from 'assets/slots-thumbnail.webp';
import tribesThumbnail from 'assets/tribes-thumbnail.webp';
import videoPokerThumbnail from 'assets/video-poker-thumbnail.webp';
import GameFund from 'components/GameFund';
import {SFC} from 'types';
import {captureAnalyticsEvent} from 'utils/analytics';
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
    imageDescription: 'Black and ivory stones on a honey-wood Connect Five board',
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
    imageDescription: 'Charcoal and ivory checkers on a classic green and ivory board',
    name: 'Checkers',
    path: 'checkers',
    target: 'checkers',
  },
  {
    accent: '#278052',
    art: reversiThumbnail,
    badge: 'JUST ARRIVED',
    category: 'Classic disk strategy',
    description: 'One move. The whole board turns. Outflank, flip, and take the corners.',
    imageDescription: 'Black and ivory Reversi disks on a classic green felt board',
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
    imageDescription:
      'Ruby and cobalt glass stones centered on a crisp ivory honeycomb in a sleek close-up Hex composition',
    name: 'Hex',
    path: 'hex',
    target: 'hex',
  },
];

const casinoGames = [
  {
    accent: '#8f713d',
    art: blackjackThumbnail,
    badge: 'BLACKJACK PAYS 3:2',
    category: 'Classic casino cards',
    description: 'Get closer to 21. Take another card, hold, or double down.',
    imageDescription: 'An ace of spades and king of hearts on a green Blackjack table',
    name: 'Blackjack',
    path: 'blackjack',
  },
  {
    accent: '#2b55b3',
    art: letItRideThumbnail,
    badge: 'UP TO 100 TO 1',
    category: 'Casino poker',
    description: 'Three bets on five cards. Pull two back, or let them ride.',
    imageDescription: 'A royal flush in spades above three blue-and-gold chip stacks on midnight-blue felt',
    name: 'Let It Ride',
    path: 'let-it-ride',
  },
  {
    accent: '#2438b8',
    art: videoPokerThumbnail,
    badge: 'JACKS OR BETTER',
    category: 'Classic draw poker',
    description: 'Five cards. One draw. Hold the right ones and chase the royal flush.',
    imageDescription:
      'A royal flush in spades on a royal-blue video poker cabinet with a red marquee and yellow lights',
    name: 'Video Poker',
    path: 'video-poker',
  },
  {
    accent: '#278b80',
    art: plinkoThumbnail,
    badge: 'UP TO 50× TOTAL RETURN',
    category: 'Drop & discover',
    description: 'One ball. Twelve bounces. Follow the path to your payout.',
    imageDescription:
      'A golden ball bouncing between mint pegs on a deep teal Plinko board above coral, gold, and mint payout pockets',
    name: 'Plinko',
    path: 'plinko',
  },
  {
    accent: '#9f6433',
    art: slotsThumbnail,
    badge: 'UP TO 100× TOTAL RETURN',
    category: 'Classic casino reels',
    description: 'Choose your wager. Spin the reels. See your result in a moment.',
    imageDescription: 'A cream, walnut, and brass slot machine against a rich burgundy backdrop',
    name: 'Slots',
    path: 'slots',
  },
  {
    accent: '#27654a',
    art: rouletteThumbnail,
    badge: 'SINGLE-ZERO WHEEL',
    category: 'Classic casino wheel',
    description: 'Pick a number, color, or group. Let the wheel decide.',
    imageDescription: 'A polished walnut and brass roulette wheel on an emerald green table',
    name: 'Roulette',
    path: 'roulette',
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
      <section aria-labelledby="tribes-game-heading">
        <S.SectionHeader>
          <div>
            <S.SectionTitle id="tribes-game-heading">Build something together</S.SectionTitle>
            <S.SectionDescription>A shared world. A new story in every tournament.</S.SectionDescription>
          </div>
          <S.GameCount>Multiplayer tournaments · TNB economy</S.GameCount>
        </S.SectionHeader>
        <S.GameGrid>
          <S.GameCard
            {...analyticsTarget('tribes')}
            $accent="#426b43"
            aria-label="Tribes — explore the world"
            onClick={() => captureAnalyticsEvent('game_selected', {game: 'tribes', source: 'games_hub'})}
            to="/tribes"
          >
            <S.Artwork>
              <S.Cover
                alt="A fortified timber settlement with golden banners, pine forests, and sunlit alpine mountains"
                height={600}
                src={tribesThumbnail}
                width={900}
              />
              <S.FeaturedBadge>A WORLD BUILT TOGETHER</S.FeaturedBadge>
            </S.Artwork>
            <S.GameDetails>
              <S.Category>Team strategy tournaments</S.Category>
              <S.GameTitle>Tribes</S.GameTitle>
              <S.Description>
                Gather your people. Build an economy. Choose your allies. Prepare for the final battle.
              </S.Description>
              <S.Tags>
                <span>Teams of up to 8</span>
                <span>Scheduled tournaments</span>
              </S.Tags>
              <S.CardFooter>
                <S.FreeLabel>
                  TNB economy<S.FreeNote>Uses your app wallet</S.FreeNote>
                </S.FreeLabel>
                <S.PlayLabel>Explore world</S.PlayLabel>
              </S.CardFooter>
            </S.GameDetails>
          </S.GameCard>
        </S.GameGrid>
      </section>
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
              onClick={() => captureAnalyticsEvent('game_selected', {game: game.target, source: 'games_hub'})}
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
      <section aria-labelledby="casino-games-heading">
        <S.SectionHeader>
          <div>
            <S.SectionTitle id="casino-games-heading">Casino games</S.SectionTitle>
            <S.SectionDescription>TNB wagers. Every accepted bet has its payout covered.</S.SectionDescription>
          </div>
          <S.GameCount>{casinoGames.length} games · TNB wagers</S.GameCount>
        </S.SectionHeader>
        <S.GameGrid>
          {casinoGames.map((game) => (
            <S.GameCard
              {...analyticsTarget(game.path)}
              $accent={game.accent}
              aria-label={`${game.name} — play with TNB`}
              key={game.path}
              onClick={() =>
                captureAnalyticsEvent('game_selected', {game: game.path.replace(/-/g, '_'), source: 'games_hub'})
              }
              to={`/${game.path}/home`}
            >
              <S.Artwork>
                <S.Cover alt={game.imageDescription} height={600} src={game.art} width={900} />
                <S.FeaturedBadge>{game.badge}</S.FeaturedBadge>
              </S.Artwork>
              <S.GameDetails>
                <S.Category>{game.category}</S.Category>
                <S.GameTitle>{game.name}</S.GameTitle>
                <S.Description>{game.description}</S.Description>
                <S.Tags>
                  <span>Single player</span>
                  <span>Verifiable results</span>
                </S.Tags>
                <S.CardFooter>
                  <S.FreeLabel>
                    TNB wagers<S.FreeNote>Sign in to play</S.FreeNote>
                  </S.FreeLabel>
                  <S.PlayLabel>Play now</S.PlayLabel>
                </S.CardFooter>
              </S.GameDetails>
            </S.GameCard>
          ))}
        </S.GameGrid>
      </section>
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
