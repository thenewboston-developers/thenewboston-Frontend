import * as S from './Styles';
import {isInWinningLine, WINNING_LINE_LENGTH} from './utils';

export type {StoneTone} from './Styles';
export {Stone, winningLineCell} from './Styles';

const FIVE = Array.from({length: WINNING_LINE_LENGTH}, (_, index) => index);

// Decorative pieces only: each of them is hidden from assistive technology, the text next to them carries the meaning

export const ComputerEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <S.EmblemStone $size={8} $tone="ivory" $x={0} $y={4} />
    <S.EmblemStone $size={8} $tone="obsidian" $x={1} $y={3} />
    <S.EmblemStone $size={8} $tone="ivory" $x={2} $y={2} />
    <S.EmblemStone $size={8} $tone="obsidian" $x={3} $y={1} />
    <S.EmblemGhost $size={8} $tone="empty" $x={4} $y={0} />
  </S.EmblemTile>
);

interface BoardArtStone {
  tone: S.StoneTone;
  x: number;
  y: number;
}

const BoardArt = ({
  columns,
  line,
  rows,
  stones,
}: {
  columns: number;
  line?: [[number, number], [number, number]];
  rows: number;
  stones: BoardArtStone[];
}) => (
  <S.BoardArt $columns={columns} $rows={rows} aria-hidden="true">
    {line && <S.BoardArtLine $from={line[0]} $to={line[1]} />}
    {stones.map(({tone, x, y}) =>
      tone === 'empty' ? (
        <S.Ghost $size={14} $tone="empty" $x={x} $y={y} key={`${x}-${y}`} />
      ) : (
        <S.BoardArtStone $size={14} $tone={tone} $x={x} $y={y} key={`${x}-${y}`} />
      ),
    )}
  </S.BoardArt>
);

const WAITING_BOARD: BoardArtStone[] = [
  {tone: 'obsidian', x: 3, y: 1},
  {tone: 'ivory', x: 4, y: 2},
  {tone: 'obsidian', x: 5, y: 2},
  {tone: 'ivory', x: 6, y: 3},
  {tone: 'obsidian', x: 7, y: 3},
  {tone: 'ivory', x: 5, y: 4},
  {tone: 'empty', x: 8, y: 2},
];

const WON_BOARD: BoardArtStone[] = [
  {tone: 'obsidian', x: 2, y: 3},
  {tone: 'obsidian', x: 3, y: 2},
  {tone: 'ivory', x: 5, y: 1},
  {tone: 'obsidian', x: 6, y: 4},
  {tone: 'ivory', x: 7, y: 3},
  {tone: 'ivory', x: 8, y: 2},
  {tone: 'obsidian', x: 9, y: 3},
  {tone: 'obsidian', x: 10, y: 1},
  {tone: 'ivory', x: 11, y: 2},
  ...[0, 1, 2, 3, 4].map((step) => ({tone: 'gold' as const, x: 4 + step, y: 4 - step})),
];

// The board waiting for its next move, for empty states
export const EmptyBoardArt = () => <BoardArt columns={12} rows={6} stones={WAITING_BOARD} />;

// A finished board with its five gold stones joined, the goal of every game
export const WonBoardArt = () => (
  <BoardArt
    columns={14}
    line={[
      [4, 4],
      [8, 0],
    ]}
    rows={5}
    stones={WON_BOARD}
  />
);

export type KitPieceKind = 'bomb' | 'horizontal' | 'vertical';

// The special pieces each player starts with: two stones placed at once side by side or stacked, and a bomb
export const KitPiece = ({kind}: {kind: KitPieceKind}) => (
  <S.KitPiece $isVertical={kind === 'vertical'} aria-hidden="true">
    {kind === 'bomb' ? (
      <>
        <S.Stone $size={12} $tone="obsidian" />
        <S.KitFuse />
      </>
    ) : (
      <>
        <S.Stone $size={8} $tone="ivory" />
        <S.Stone $size={8} $tone="ivory" />
      </>
    )}
  </S.KitPiece>
);

export const LineEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <S.EmblemLine />
    {FIVE.map((index) => (
      <S.EmblemStone $size={8} $tone="gold" $x={index} $y={4 - index} key={index} />
    ))}
  </S.EmblemTile>
);

export const LiveEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <S.EmblemStone $size={10} $tone="obsidian" $x={1} $y={3} />
    <S.EmblemStone $size={10} $tone="ivory" $x={2} $y={3} />
    <S.EmblemStone $size={10} $tone="obsidian" $x={1} $y={2} />
    <S.EmblemRing $x={3} $y={1} />
    <S.EmblemStone $size={10} $tone="ivory" $x={3} $y={1} />
  </S.EmblemTile>
);

export const RankStone = ({rank, size = 34}: {rank: number; size?: number}) => (
  <S.RankStone $size={size} $tone={isInWinningLine(rank) ? 'gold' : 'obsidian'}>
    {rank.toLocaleString()}
  </S.RankStone>
);

export const RivalryEmblem = () => (
  <S.EmblemTile aria-hidden="true">
    <S.EmblemSpark />
    <S.EmblemStone $size={20} $tone="obsidian" $x={1} $y={2.4} />
    <S.EmblemStone $size={20} $tone="ivory" $x={2.9} $y={2.4} />
  </S.EmblemTile>
);

export const StoneLoader = () => (
  <S.Loader aria-hidden="true">
    {FIVE.map((index) => (
      <S.Stone $size={10} $tone="gold" key={index} />
    ))}
  </S.Loader>
);

// A line of five intersections with the first stones placed, for showing a level out of five
export const StoneRow = ({filled, size = 10, tone = 'gold'}: {filled: number; size?: number; tone?: S.StoneTone}) => (
  <S.StoneRow $gap={Math.round(size * 0.6)} aria-hidden="true">
    {FIVE.map((index) => (
      <S.Stone $size={size} $tone={index < filled ? tone : 'empty'} key={index} />
    ))}
  </S.StoneRow>
);

// The five connected gold stones of the hero's eyebrow
export const WinningLine = () => (
  <S.WinningLine aria-hidden="true">
    {FIVE.map((index) => (
      <span key={index} />
    ))}
  </S.WinningLine>
);
