import {CSSProperties, KeyboardEvent, memo, useId, useRef, useState} from 'react';

import {HexSide, HexStone} from 'types/hex';

import * as S from './BoardStyles';
import {cellLabel, getBoardLayout, getHexPoints, HEX_RADIUS, SIDE_NAMES, stepCell} from './utils';

interface Props {
  board: HexStone[];
  disabled?: boolean;
  lastMove?: number | null;
  onSelect: (cell: number) => void;
  portrait?: boolean;
  preview?: {cell: number; side: HexSide} | null;
  side?: HexSide;
  size: number;
  winningPath?: number[] | null;
}

const STONE_RADIUS = HEX_RADIUS * 0.62;
const STONES: Record<HexSide, HexStone> = {blue: 2, red: 1};

const Board = ({
  board,
  disabled = false,
  lastMove = null,
  onSelect,
  portrait = false,
  preview = null,
  side = 'red',
  size,
  winningPath = null,
}: Props) => {
  const [focusCell, setFocusCell] = useState<number | null>(null);
  const boardRef = useRef<SVGSVGElement>(null);
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const layout = getBoardLayout(size, portrait);
  const middle = Math.floor(size / 2) * size + Math.floor(size / 2);
  // One cell takes part in the tab order; the arrow keys move between cells from there.
  const tabCell =
    (focusCell !== null && focusCell < size * size ? focusCell : null) ?? preview?.cell ?? lastMove ?? middle;
  const winning = new Set(winningPath ?? []);

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, cell: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled && board[cell] === 0) onSelect(cell);
      return;
    }
    const next = stepCell(cell, size, event.key, portrait);
    if (next === cell) return;
    event.preventDefault();
    setFocusCell(next);
    boardRef.current?.querySelector<SVGGElement>(`[data-cell="${next}"]`)?.focus();
  };

  const renderCell = (cell: number) => {
    const centre = layout.cells[cell];
    const stone = board[cell];
    const isPreview = preview?.cell === cell;
    const interactive = !disabled && stone === 0;
    let name = 'empty';
    if (stone) name = `${stone === 1 ? 'red' : 'blue'} stone`;
    if (isPreview) name = `your ${preview.side} stone, not placed yet`;
    const details = [
      winning.has(cell) ? 'winning chain' : '',
      lastMove === cell && !isPreview ? 'last move' : '',
      isPreview ? 'press again to place it' : '',
    ].filter(Boolean);
    return (
      <S.Cell
        $interactive={interactive}
        $side={side}
        aria-disabled={!interactive}
        aria-label={[`${cellLabel(cell, size)}: ${name}`, ...details].join(', ')}
        aria-pressed={interactive ? isPreview : undefined}
        data-cell={cell}
        key={cell}
        onClick={interactive ? () => onSelect(cell) : undefined}
        onFocus={() => setFocusCell(cell)}
        onKeyDown={(event) => handleKeyDown(event, cell)}
        role="button"
        // The board can always be read with the keyboard, also while waiting and after the game: every cell
        // takes focus from the arrow keys, and one of them is the stop for the Tab key.
        tabIndex={cell === tabCell ? 0 : -1}
      >
        <polygon points={getHexPoints(centre, portrait)} />
        <S.FocusRing points={getHexPoints(centre, portrait, HEX_RADIUS - 3.4)} />
      </S.Cell>
    );
  };

  const renderStone = (cell: number) => {
    const centre = layout.cells[cell];
    const isPreview = preview?.cell === cell;
    const stone = isPreview ? STONES[preview.side] : board[cell];
    if (!stone) return null;
    return (
      <g key={cell}>
        <S.Stone
          $preview={isPreview}
          cx={centre.x}
          cy={centre.y}
          fill={`url(#${gradientId}-${stone === 1 ? 'red' : 'blue'})`}
          r={STONE_RADIUS}
        />
        {isPreview && <S.PreviewRing $side={preview.side} points={getHexPoints(centre, portrait, HEX_RADIUS - 2.4)} />}
        {winning.has(cell) && <S.WinningRing cx={centre.x} cy={centre.y} r={STONE_RADIUS + 1.6} />}
        {lastMove === cell && !isPreview && <S.LastMoveMark cx={centre.x} cy={centre.y} r={3.2} />}
      </g>
    );
  };

  return (
    <S.BoardFrame $upright={portrait} style={{'--board-aspect': layout.aspectRatio} as CSSProperties}>
      <S.BoardSvg
        aria-label={`Hex board, ${size} by ${size}. Red joins row 1 to row ${size}. Blue joins column a to column ${String.fromCharCode(96 + size)}.`}
        ref={boardRef}
        role="group"
        viewBox={layout.viewBox}
      >
        <defs>
          <radialGradient cx="35%" cy="30%" id={`${gradientId}-red`} r="75%">
            <stop offset="0%" stopColor="#ff9d8f" />
            <stop offset="55%" stopColor="#dc463b" />
            <stop offset="100%" stopColor="#9c2219" />
          </radialGradient>
          <radialGradient cx="35%" cy="30%" id={`${gradientId}-blue`} r="75%">
            <stop offset="0%" stopColor="#9cc4ff" />
            <stop offset="55%" stopColor="#2f72da" />
            <stop offset="100%" stopColor="#153f8f" />
          </radialGradient>
        </defs>
        {layout.edges.map((edge) => (
          <S.EdgeBand $side={edge.side} key={edge.points} points={edge.points} />
        ))}
        {layout.cells.map((_, cell) => renderCell(cell))}
        {winningPath && winningPath.length > 1 && (
          <S.WinningLine
            points={winningPath.map((cell) => `${layout.cells[cell].x},${layout.cells[cell].y}`).join(' ')}
          />
        )}
        {layout.cells.map((_, cell) => renderStone(cell))}
        {layout.labels.map((label) => (
          <S.EdgeLabel aria-hidden="true" key={`${label.text}-${label.x}`} x={label.x} y={label.y}>
            {label.text}
          </S.EdgeLabel>
        ))}
      </S.BoardSvg>
      <S.Legend>
        <span>
          <S.LegendDot $side="red" />
          Red joins the two red edges
        </span>
        <span>
          <S.LegendDot $side="blue" />
          Blue joins the two blue edges
        </span>
        {preview && <span>Dashed outline: your {SIDE_NAMES[preview.side].toLowerCase()} stone, not placed yet</span>}
        {winningPath && <span>Gold line: the winning chain</span>}
      </S.Legend>
    </S.BoardFrame>
  );
};

// The match page re-renders four times a second for its clocks; the board only changes with its props.
export default memo(Board);
