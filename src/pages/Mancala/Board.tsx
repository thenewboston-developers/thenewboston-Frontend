import {MancalaBoard, MancalaMove, MancalaSide} from 'types/mancala';

import * as S from './Styles';
import {opponent, pitIndex, PITS, SowingFrame, STORE} from './utils';

interface Props {
  board: MancalaBoard;
  // The viewer's pits can be pressed: it is their turn and the board on screen is current
  canPlay?: boolean;
  // The step of a move that is being shown right now
  frame?: SowingFrame | null;
  // Marked on the resting board so the last move stays readable
  lastMove?: MancalaMove | null;
  names?: Record<MancalaSide, string>;
  onPlay?: (pit: number) => void;
  // The pit whose move is on its way to the server
  pendingPit?: number | null;
  // The side the viewer plays, shown along the bottom with its store on the right. Spectators see the host's side.
  viewerSide?: MancalaSide | null;
}

const PIT_STONES = 14;
const STORE_STONES = 27;
const STONE_COLORS = ['#35b8a6', '#f2a93b', '#e8695f', '#8a7cf0', '#f3ecdf', '#4b97da'];

// A sunflower spiral keeps any number of stones evenly spread inside a round pit
const pitPosition = (stone: number) => {
  const radius = 7 + 8 * Math.sqrt(stone);
  const angle = stone * 2.39996;
  return {left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%`};
};

// Stores fill from the bottom in rows of three and stop short of the count at the top
const storePosition = (stone: number) => ({
  left: `${24 + (stone % 3) * 26 + (Math.floor(stone / 3) % 2) * 3}%`,
  top: `${92 - Math.floor(stone / 3) * 7.6}%`,
});

const Stones = ({count, index, store = false}: {count: number; index: number; store?: boolean}) => (
  <>
    {Array.from({length: Math.min(count, store ? STORE_STONES : PIT_STONES)}, (_, stone) => (
      <S.Stone
        $color={STONE_COLORS[(stone + index * 2) % STONE_COLORS.length]}
        $store={store}
        aria-hidden="true"
        key={stone}
        style={store ? storePosition(stone) : pitPosition(stone)}
      />
    ))}
  </>
);

const Board = ({
  board,
  canPlay = false,
  frame = null,
  lastMove = null,
  names,
  onPlay,
  pendingPit = null,
  viewerSide = null,
}: Props) => {
  const near = viewerSide ?? 'host';
  const far = opponent(near);
  const source = frame?.source ?? (lastMove ? pitIndex(lastMove.side, lastMove.pit) : null);
  const marked = frame?.marked ?? (lastMove ? [lastMove.last] : []);
  const owner = (side: MancalaSide) => {
    if (side === viewerSide) return 'Your';
    return names ? `${names[side]}’s` : `The ${side}’s`;
  };

  const renderStore = (side: MancalaSide) => {
    const index = STORE[side];
    return (
      <S.Store $marked={marked.includes(index)} aria-label={`${owner(side)} store: ${board[index]} stones`} role="img">
        <Stones count={board[index]} index={index} store />
        <S.StoreCount aria-hidden="true">{board[index]}</S.StoreCount>
      </S.Store>
    );
  };

  const renderPit = (side: MancalaSide, pit: number) => {
    const index = pitIndex(side, pit);
    const count = board[index];
    const playable = canPlay && side === viewerSide && count > 0;
    const label = `${owner(side)} pit ${pit + 1}: ${count} ${count === 1 ? 'stone' : 'stones'}`;
    const hollow = (
      <S.Hollow $marked={marked.includes(index)} $playable={playable} $source={source === index}>
        <Stones count={count} index={index} />
      </S.Hollow>
    );
    if (side === viewerSide)
      return (
        // The whole cell is the button, count included, so the pit is easy to hit on a phone
        <S.PitButton
          aria-busy={pendingPit === pit}
          aria-label={label}
          disabled={!playable}
          key={index}
          onClick={() => onPlay?.(pit)}
          type="button"
        >
          {hollow}
          <S.Count aria-hidden="true">{count}</S.Count>
        </S.PitButton>
      );
    return (
      <S.Pit aria-label={label} key={index} role="img">
        {side === far && <S.Count aria-hidden="true">{count}</S.Count>}
        {hollow}
        {side === near && <S.Count aria-hidden="true">{count}</S.Count>}
      </S.Pit>
    );
  };

  const pits = Array.from({length: PITS}, (_, pit) => pit);
  return (
    <S.Board aria-label="Mancala board" role="group">
      {renderStore(far)}
      <S.Rows>
        {/* Play runs counter-clockwise, so the far row is read right to left */}
        <S.Row>{[...pits].reverse().map((pit) => renderPit(far, pit))}</S.Row>
        <S.Row>{pits.map((pit) => renderPit(near, pit))}</S.Row>
      </S.Rows>
      {renderStore(near)}
    </S.Board>
  );
};

export default Board;
