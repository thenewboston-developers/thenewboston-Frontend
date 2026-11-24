import {useRef} from 'react';

import {ReversiLastMove, ReversiSide, ReversiSquare} from 'types/reversi';

import * as S from './Styles';
import {BOARD_SIZE, getPiece, hasSquare, SIDE_LABELS, squareName} from './utils';

interface Props {
  // Changes with every move. Disks only animate after it has changed, never on the first paint
  animationKey?: number;
  board: string[];
  lastMove?: ReversiLastMove | null;
  legalMoves?: ReversiSquare[];
  onSelect?: (row: number, column: number) => void;
  turn?: ReversiSide | null;
}

const INDEXES = Array.from({length: BOARD_SIZE}, (_, index) => index);

const Board = ({animationKey, board, lastMove, legalMoves, onSelect, turn}: Props) => {
  const firstAnimationKey = useRef(animationKey);

  const animate = animationKey !== firstAnimationKey.current;

  const getAnimation = (row: number, column: number): 'flip' | 'place' | undefined => {
    if (!animate || !lastMove) return undefined;
    if (lastMove.row === row && lastMove.column === column) return 'place';
    return hasSquare(lastMove.flipped, row, column) ? 'flip' : undefined;
  };

  const renderSquare = (row: number, column: number) => {
    const piece = getPiece(board, row, column);
    const isLast = !!lastMove && lastMove.row === row && lastMove.column === column;
    const isLegal = !!onSelect && !!turn && hasSquare(legalMoves, row, column);
    const name = squareName(row, column);
    let label = `${name}: ${piece ? `${SIDE_LABELS[piece]} disk` : 'empty'}`;
    if (isLast) label += ', last move';
    if (isLegal) label += ', legal move';

    return (
      <S.Square
        $legal={isLegal}
        aria-label={label}
        disabled={!isLegal}
        key={name}
        onClick={() => onSelect?.(row, column)}
        type="button"
      >
        {piece && <S.Disk $animation={getAnimation(row, column)} $last={isLast} $side={piece} key={piece} />}
        {!piece && isLegal && turn && <S.Hint $side={turn} />}
      </S.Square>
    );
  };

  return (
    <S.BoardFrame>
      <span />
      <S.BoardLabels $direction="column" aria-hidden="true">
        {INDEXES.map((column) => (
          <S.BoardLabel key={column}>{String.fromCharCode(97 + column)}</S.BoardLabel>
        ))}
      </S.BoardLabels>
      <S.BoardLabels $direction="row" aria-hidden="true">
        {INDEXES.map((row) => (
          <S.BoardLabel key={row}>{row + 1}</S.BoardLabel>
        ))}
      </S.BoardLabels>
      <S.BoardGrid aria-label="Reversi board" role="group">
        {INDEXES.map((row) => INDEXES.map((column) => renderSquare(row, column)))}
      </S.BoardGrid>
    </S.BoardFrame>
  );
};

export default Board;
