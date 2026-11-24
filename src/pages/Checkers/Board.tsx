import {CheckersPiece, CheckersSide} from 'types/checkers';

import * as S from './BoardStyles';
import {cellLabel} from './utils';

interface Props {
  board: CheckersPiece[];
  disabled?: boolean;
  lastMove?: number[];
  onSelect: (index: number) => void;
  path: number[];
  selectable: number[];
  side: CheckersSide;
  targets: number[];
}

const Board = ({board, disabled = false, lastMove = [], onSelect, path, selectable, side, targets}: Props) => {
  const cells = Array.from({length: 64}, (_, index) => (side === 'black' ? 63 - index : index));
  const current = path.length ? path[path.length - 1] : null;

  return (
    <S.BoardFrame>
      <S.BoardTitle>
        <strong>CHECKERS</strong>
        <span>{side === 'white' ? 'Ivory' : 'Charcoal'} side below</span>
      </S.BoardTitle>
      <S.BoardGrid aria-label="Checkers board" role="group">
        {cells.map((index) => {
          const piece = board[index];
          const dark = (Math.floor(index / 8) + (index % 8)) % 2 === 1;
          const target = targets.includes(index);
          const selected = current === index;
          const name = piece ? `${piece > 0 ? 'white' : 'black'} ${Math.abs(piece) === 2 ? 'king' : 'man'}` : 'empty';
          const label = `${cellLabel(index)}: ${name}${selected ? ', selected' : ''}${target ? ', legal destination' : ''}`;
          return (
            <S.Cell
              $dark={dark}
              $last={lastMove.includes(index)}
              $selected={selected}
              $target={target}
              aria-label={label}
              aria-pressed={selected}
              disabled={disabled || (!selectable.includes(index) && !target)}
              key={index}
              onClick={() => onSelect(index)}
              type="button"
            >
              {piece !== 0 && (
                <S.Piece $white={piece > 0} aria-hidden="true">
                  {Math.abs(piece) === 2 ? '♛' : ''}
                </S.Piece>
              )}
              <S.Coordinate $dark={dark} aria-hidden="true">
                {cellLabel(index)}
              </S.Coordinate>
            </S.Cell>
          );
        })}
      </S.BoardGrid>
      <S.Legend>
        <span>● Gold dot: legal landing</span>
        <span>♛ Crown: king</span>
        {path.length > 1 && <span>Preview · Confirm to play</span>}
      </S.Legend>
    </S.BoardFrame>
  );
};

export default Board;
