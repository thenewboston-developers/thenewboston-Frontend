import {CSSProperties, Fragment} from 'react';

import {STONE_CYCLE, STONES, StoneTone} from '../theme';

import {
  pile,
  pitCenter,
  Row,
  SOURCE_COLUMN,
  SOWN,
  STONE_HEIGHT,
  STONE_SIZE,
  STORE_LEFT,
  tilt,
  toLeft,
  toTop,
} from './geometry';
import * as S from './Styles';

// Hand-placed piles for a few stones, in percent of the pit; larger piles follow a sunflower spiral
const PILES: [number, number][][] = [
  [],
  [[50, 50]],
  [
    [40, 44],
    [60, 57],
  ],
  [
    [38, 40],
    [62, 43],
    [48, 64],
  ],
  [
    [37, 38],
    [62, 37],
    [38, 63],
    [63, 62],
  ],
  [
    [35, 38],
    [60, 33],
    [36, 64],
    [64, 61],
    [50, 49],
  ],
  [
    [32, 44],
    [50, 30],
    [68, 42],
    [65, 64],
    [43, 68],
    [50, 49],
  ],
  [
    [70, 50],
    [60, 68],
    [40, 68],
    [30, 50],
    [40, 32],
    [60, 32],
    [50, 50],
  ],
];

// A store holding a good number of stones, in percent of the store
const FULL_STORE: [number, number][] = [
  [33, 83],
  [67, 81],
  [36, 65],
  [66, 63],
  [34, 46],
  [65, 44],
  [50, 27],
];

const COLUMNS = [0, 1, 2, 3, 4, 5];
const ROWS: Row[] = ['far', 'near'];

const pilePosition = (stone: number, count: number): CSSProperties => {
  const position = PILES[count]?.[stone];
  const turn = {'--tilt': `${tilt(count * 11 + stone)}deg`} as CSSProperties;
  if (position) return {...turn, left: `${position[0]}%`, top: `${position[1]}%`};
  const radius = 6 + 7 * Math.sqrt(stone);
  const angle = stone * 2.39996;
  return {...turn, left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%`};
};

const pileStoneSize = (count: number) => {
  if (count <= 4) return '32%';
  if (count <= 7) return '28%';
  return '22%';
};

// A stone of the illustrated board, centered on a point and turned a little
const stoneAt = (x: number, y: number, turn = 0): CSSProperties =>
  ({
    '--tilt': `${turn}deg`,
    left: toLeft(x - STONE_SIZE / 2),
    top: toTop(y - STONE_HEIGHT / 2),
  }) as CSSProperties;

const stoneTone = (row: Row, column: number, stone: number) =>
  STONE_CYCLE[(stone + column + (row === 'far' ? 2 : 0)) % STONE_CYCLE.length];

interface PitStonesProps {
  count: number;
  first?: number;
  honey?: boolean;
  size: number;
  tone?: StoneTone;
}

/** A carved pit holding a small pile of glass stones. */
export const PitStones = ({count, first = 0, honey = false, size, tone}: PitStonesProps) => (
  <S.Pit $honey={honey} $size={size} aria-hidden="true" style={{'--stone-size': pileStoneSize(count)} as CSSProperties}>
    {Array.from({length: count}, (_, stone) => (
      <S.PitStone
        $tone={tone ?? STONE_CYCLE[(stone + first) % STONE_CYCLE.length]}
        key={stone}
        style={pilePosition(stone, count)}
      />
    ))}
  </S.Pit>
);

// The twelve pits of a board as a game starts, four stones in each. While sowing, the third near pit is lifted out.
const BoardPits = ({sowing = false}: {sowing?: boolean}) => (
  <>
    <S.DemoStore style={{left: toLeft(STORE_LEFT.far)}} />
    <S.DemoStore $filled={sowing} style={{left: toLeft(STORE_LEFT.near)}} />
    {ROWS.flatMap((row) =>
      COLUMNS.map((column) => {
        const center = pitCenter(row, column);
        const seed = (row === 'far' ? 0 : 6) + column;
        const isSource = sowing && row === 'near' && column === SOURCE_COLUMN;
        return (
          <Fragment key={`${row}-${column}`}>
            <S.DemoPit $source={isSource} style={{left: toLeft(center.x), top: toTop(center.y)}} />
            {!isSource &&
              pile(seed).map((offset, stone) => (
                <S.DemoStone
                  $tone={stoneTone(row, column, stone)}
                  key={stone}
                  style={stoneAt(center.x + offset.x, center.y + offset.y, tilt(seed * 4 + stone))}
                />
              ))}
          </Fragment>
        );
      }),
    )}
  </>
);

export const ComputerEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <PitStones count={4} honey size={30} />
    <S.EmblemStore>
      <S.PitStone $tone={STONES.amber} style={{left: '50%', top: '76%', width: '70%'}} />
      <S.PitStone
        $tone={STONES.turquoise}
        style={{'--tilt': '24deg', left: '50%', top: '55%', width: '70%'} as CSSProperties}
      />
    </S.EmblemStore>
  </S.EmblemTile>
);

/** The opening position, for an empty list of live matches. */
export const EmptyBoard = () => (
  <S.EmptyBoard aria-hidden="true">
    <S.DemoBoard>
      <BoardPits />
    </S.DemoBoard>
  </S.EmptyBoard>
);

/** Three empty rank pits and the first stone hovering over first place, for a leaderboard nobody is on yet. */
export const EmptyPodium = () => (
  <S.Podium aria-hidden="true">
    <S.PodiumPit>
      1
      <S.PodiumStoneShadow />
      <S.PodiumStone />
    </S.PodiumPit>
    <S.PodiumPit>2</S.PodiumPit>
    <S.PodiumPit>3</S.PodiumPit>
  </S.Podium>
);

export const RivalryEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <S.EmblemRows>
      <PitStones count={2} honey size={20} tone={STONES.amethyst} />
      <PitStones count={2} honey size={20} tone={STONES.amethyst} />
      <PitStones count={2} honey size={20} tone={STONES.turquoise} />
      <PitStones count={2} honey size={20} tone={STONES.turquoise} />
    </S.EmblemRows>
  </S.EmblemTile>
);

/** A match that has not started yet: the board is set, four stones a pit. */
export const SetBoard = () => (
  <S.ScoreTile aria-hidden="true">
    <PitStones count={4} honey size={38} />
  </S.ScoreTile>
);

/** A stone hopping from pit to pit, for loading states. */
export const SowingLoader = () => (
  <S.Loader aria-hidden="true">
    <S.LoaderPit />
    <S.LoaderPit />
    <S.LoaderPit />
    <S.LoaderStone />
  </S.Loader>
);

/**
 * The opening move that earns another turn: the four stones of the third pit are sown one by one, and the last lands
 * in the store. With reduced motion, the board shows the position after the move.
 */
export const SowingDemo = () => (
  <S.Demo>
    <S.DemoBoard aria-hidden="true">
      <BoardPits sowing />
      {SOWN.map(({from}, stone) => (
        <S.DemoStone
          $flight={stone}
          $tone={stoneTone('near', SOURCE_COLUMN, stone)}
          key={stone}
          style={stoneAt(from.x, from.y)}
        />
      ))}
      <S.PlayAgain>Play again</S.PlayAgain>
    </S.DemoBoard>
    <S.Caption as="figcaption">
      Sow the four stones of your third pit, one per pit. The last lands in your store, so you play again.
    </S.Caption>
  </S.Demo>
);

/** The two stores of a match, the host's first: the Mancala score. */
export const StoreScore = ({guest, host}: {guest: number; host: number}) => (
  <S.ScoreTile aria-hidden="true">
    <S.ScoreStore $leading={host > guest}>{host}</S.ScoreStore>
    <S.ScoreStore $leading={guest > host}>{guest}</S.ScoreStore>
  </S.ScoreTile>
);

/** A store holding stones, standing in for a trophy. */
export const StoreEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <S.EmblemStore $width={28}>
      {FULL_STORE.map(([left, top], stone) => (
        <S.PitStone
          $tone={STONE_CYCLE[(stone + 2) % STONE_CYCLE.length]}
          key={stone}
          style={{'--tilt': `${tilt(stone + 30)}deg`, left: `${left}%`, top: `${top}%`, width: '40%'} as CSSProperties}
        />
      ))}
    </S.EmblemStore>
  </S.EmblemTile>
);
