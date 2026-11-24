import {CSSProperties, useLayoutEffect, useRef, useState} from 'react';

import {MancalaBoard, MancalaMove, MancalaSide} from 'types/mancala';

import * as S from './BoardStyles';
import {opponent, pitIndex, PITS, SowingFrame, STORE} from './utils';

interface Props {
  activeSide?: MancalaSide | null;
  board: MancalaBoard;
  canPlay?: boolean;
  clocks?: Record<MancalaSide, string>;
  frame?: SowingFrame | null;
  lastMove?: MancalaMove | null;
  names?: Record<MancalaSide, string>;
  onPlay?: (pit: number) => void;
  pendingPit?: number | null;
  // The viewer's row is nearest, with their store on the right. Spectators see the host's side.
  viewerSide?: MancalaSide | null;
}

interface Flight {
  from: number;
  key: string;
  style: CSSProperties;
  to: number;
}

const PIT_STONES = 14;
const STORE_STONES = 27;
const STONE_COLORS = ['#70d6be', '#c8eadc', '#e5ba76', '#9ec3c7', '#fbdfaa', '#519b8e'];

// A sunflower spiral keeps any number of stones evenly spread inside a round pit.
const pitPosition = (stone: number) => {
  const radius = 7 + 8 * Math.sqrt(stone);
  const angle = stone * 2.39996;
  return {left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%`};
};

const storePosition = (stone: number) => ({
  left: `${24 + (stone % 3) * 26 + (Math.floor(stone / 3) % 2) * 3}%`,
  top: `${91 - Math.floor(stone / 3) * 6.5}%`,
});

const Stones = ({
  count,
  frame,
  index,
  store = false,
}: {
  count: number;
  frame: SowingFrame | null;
  index: number;
  store?: boolean;
}) => {
  const visible = Math.min(count, store ? STORE_STONES : PIT_STONES);
  const received =
    frame?.transfers?.reduce((total, transfer) => total + (transfer.to === index ? transfer.stones : 0), 0) ?? 0;
  return (
    <>
      {Array.from({length: visible}, (_, stone) => {
        const landing = !!frame && received > 0 && stone >= count - received;
        return (
          <S.Stone
            $color={STONE_COLORS[(stone + index * 2) % STONE_COLORS.length]}
            $landing={landing ? frame.duration : 0}
            $store={store}
            aria-hidden="true"
            key={landing ? `${frame.version}-${frame.hand}-${stone}` : stone}
            style={store ? storePosition(stone) : pitPosition(stone)}
          />
        );
      })}
    </>
  );
};

const Board = ({
  activeSide = null,
  board,
  canPlay = false,
  clocks,
  frame = null,
  lastMove = null,
  names,
  onPlay,
  pendingPit = null,
  viewerSide = null,
}: Props) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const cells = useRef<Record<number, HTMLElement | null>>({});
  const marked = frame?.marked ?? (lastMove ? [lastMove.last] : []);
  const movingSide = frame?.side ?? activeSide;
  const near = viewerSide ?? 'host';
  const far = opponent(near);
  const source = frame?.source ?? (lastMove ? pitIndex(lastMove.side, lastMove.pit) : null);

  useLayoutEffect(() => {
    if (!frame?.transfers?.length || !boardRef.current) {
      setFlights([]);
      return undefined;
    }
    // Measure the actual hollows, so flights follow both viewer orientations and every screen size.
    const measure = () => {
      const bounds = boardRef.current?.getBoundingClientRect();
      if (!bounds?.width || !bounds.height) return;
      const next = frame.transfers!.flatMap(({from, to, stones}) => {
        const start = cells.current[from]?.getBoundingClientRect();
        const end = cells.current[to]?.getBoundingClientRect();
        if (!start || !end) return [];
        const fromX = start.left + start.width / 2 - bounds.left;
        const fromY = start.top + start.height / 2 - bounds.top;
        const toX = end.left + end.width / 2 - bounds.left;
        const toY = end.top + end.height * (to === STORE.host || to === STORE.guest ? 0.72 : 0.5) - bounds.top;
        return Array.from({length: Math.min(stones, 4)}, (_, stone) => ({
          from,
          key: `${frame.version}-${frame.kind}-${frame.hand}-${from}-${to}-${stone}`,
          style: {
            '--arc-x': `${(fromX + toX) / 2}px`,
            '--arc-y': `${Math.min(fromY, toY) - Math.min(48, bounds.height * 0.18) - stone * 5}px`,
            '--from-x': `${fromX + stone * 3}px`,
            '--from-y': `${fromY}px`,
            '--to-x': `${toX + stone * 3}px`,
            '--to-y': `${toY}px`,
            animationDelay: `${stone * 35}ms`,
            animationDuration: `${Math.max(80, frame.duration * 0.8 - stone * 35)}ms`,
            width: `${Math.max(8, Math.min(start.width, end.width) * 0.19)}px`,
          } as CSSProperties,
          to,
        }));
      });
      setFlights(next);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(boardRef.current);
    return () => observer?.disconnect();
  }, [frame, near]);

  const owner = (side: MancalaSide) => {
    if (side === viewerSide) return 'Your';
    return names ? `${names[side]}’s` : `The ${side}’s`;
  };

  const renderPit = (side: MancalaSide, pit: number) => {
    const index = pitIndex(side, pit);
    const count = board[index];
    const playable = canPlay && side === viewerSide && count > 0;
    const label = `${owner(side)} pit ${pit + 1}: ${count} ${count === 1 ? 'stone' : 'stones'}`;
    const countLabel = (
      <S.Count $changed={!!frame && marked.includes(index)} aria-hidden="true" key={count}>
        {count}
      </S.Count>
    );
    const hollow = (
      <S.Hollow
        $marked={marked.includes(index)}
        $playable={playable}
        $source={source === index}
        data-pit-index={index}
        ref={(element) => {
          cells.current[index] = element;
        }}
      >
        <Stones count={count} frame={frame} index={index} />
        {!count && <S.EmptyPit aria-hidden="true" />}
      </S.Hollow>
    );
    if (side === viewerSide)
      return (
        <S.PitButton
          aria-busy={pendingPit === pit}
          aria-label={label}
          disabled={!playable}
          key={index}
          onClick={() => onPlay?.(pit)}
          type="button"
        >
          {hollow}
          {countLabel}
        </S.PitButton>
      );
    return (
      <S.Pit aria-label={label} key={index} role="img">
        {side === far && countLabel}
        {hollow}
        {side === near && countLabel}
      </S.Pit>
    );
  };

  const renderPlayer = (side: MancalaSide) => (
    <S.PlayerRail $active={movingSide === side}>
      <S.PlayerAvatar aria-hidden="true">{(names?.[side] ?? side).slice(0, 1).toUpperCase()}</S.PlayerAvatar>
      <S.PlayerIdentity>
        <S.PlayerName>{side === viewerSide ? `${names?.[side] ?? 'You'} (you)` : (names?.[side] ?? side)}</S.PlayerName>
        <S.PlayerMeta>
          {side === near && (side === viewerSide ? 'Your store →' : 'Store on the right →')}
          {side === far && '← Store on the left'}
        </S.PlayerMeta>
      </S.PlayerIdentity>
      {movingSide === side && <S.TurnPill>{frame ? 'Sowing' : 'To play'}</S.TurnPill>}
      {clocks && <S.Clock aria-label={`${names?.[side] ?? side}: ${clocks[side]} remaining`}>{clocks[side]}</S.Clock>}
      <S.RailScore aria-label={`${names?.[side] ?? side}: ${board[STORE[side]]} stones stored`}>
        {board[STORE[side]]}
        <small>stored</small>
      </S.RailScore>
    </S.PlayerRail>
  );

  const renderStore = (side: MancalaSide) => {
    const index = STORE[side];
    const receiving = !!frame?.transfers?.some(({to}) => to === index);
    return (
      <S.Store
        $marked={marked.includes(index) || receiving}
        $near={side === near}
        aria-label={`${owner(side)} store: ${board[index]} stones`}
        data-pit-index={index}
        ref={(element) => {
          cells.current[index] = element;
        }}
        role="img"
      >
        <Stones count={board[index]} frame={frame} index={index} store />
        <S.StoreCount $changed={receiving} aria-hidden="true" key={board[index]}>
          {board[index]}
        </S.StoreCount>
        <S.StoreLabel aria-hidden="true">STORE</S.StoreLabel>
      </S.Store>
    );
  };

  const pits = Array.from({length: PITS}, (_, pit) => pit);
  let movement = 'MANCALA';
  if (frame) {
    movement = frame.hand ? `${frame.hand} ${frame.hand === 1 ? 'stone' : 'stones'} in hand` : 'Last stone';
    if (frame.kind === 'capture') movement = 'Capture!';
    if (frame.kind === 'sweep') movement = 'Collecting the board';
  }
  return (
    <S.Table aria-label="Mancala board" role="group">
      {renderPlayer(far)}
      <S.Board ref={boardRef}>
        {renderStore(far)}
        <S.Rows>
          <S.Row>{[...pits].reverse().map((pit) => renderPit(far, pit))}</S.Row>
          <S.DirectionLane aria-hidden="true">
            <span>←</span>
            <S.MovementLabel $moving={!!frame} key={movement}>
              {movement}
            </S.MovementLabel>
            <span>→</span>
          </S.DirectionLane>
          <S.Row>{pits.map((pit) => renderPit(near, pit))}</S.Row>
        </S.Rows>
        {renderStore(near)}
        {flights.map(({from, key, style, to}) => (
          <S.FlyingStone aria-hidden="true" data-flight-from={from} data-flight-to={to} key={key} style={style} />
        ))}
      </S.Board>
      {renderPlayer(near)}
      <S.TableHint>
        {canPlay
          ? 'Choose a glowing pit to sow your stones.'
          : 'Sow counter-clockwise. Finish in your store to play again.'}
      </S.TableHint>
    </S.Table>
  );
};

export default Board;
