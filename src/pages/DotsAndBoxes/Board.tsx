import {DotsAndBoxesOwner, DotsAndBoxesSide} from 'types/dotsAndBoxes';

import * as S from './BoardStyles';
import {dotLabel, horizontalLine, lineLabel, verticalLine} from './utils';

interface Props {
  boxes: DotsAndBoxesOwner[];
  disabled?: boolean;
  lines: DotsAndBoxesOwner[];
  names: Record<DotsAndBoxesSide, string>;
  onSelect: (line: number) => void;
  recent?: number[];
  selected?: number | null;
  side: DotsAndBoxesSide;
  size: number;
}

const OWNERS: Record<number, DotsAndBoxesSide> = {1: 'blue', 2: 'red'};

const Board = ({boxes, disabled = false, lines, names, onSelect, recent = [], selected = null, side, size}: Props) => {
  const indexes = Array.from({length: size + 1}, (_, index) => index);

  const renderLine = (line: number, row: number, column: number, vertical: boolean) => {
    const owner = OWNERS[lines[line]];
    const isSelected = selected === line;
    let state = owner ? `drawn by ${names[owner]}` : 'open';
    if (isSelected) state = 'selected, press again to draw';
    return (
      <S.Line
        $owner={owner}
        $preview={isSelected ? side : undefined}
        $recent={recent.includes(line)}
        $vertical={vertical}
        aria-label={`Line ${lineLabel(size, line)}: ${state}`}
        aria-pressed={owner ? undefined : isSelected}
        disabled={disabled || !!owner}
        key={`line-${line}`}
        onClick={() => onSelect(line)}
        style={
          vertical
            ? {gridColumn: 2 * column + 1, gridRow: `${2 * row + 1} / span 3`}
            : {gridColumn: `${2 * column + 1} / span 3`, gridRow: 2 * row + 1}
        }
        type="button"
      >
        <S.Stroke />
      </S.Line>
    );
  };

  return (
    <S.BoardFrame>
      <S.BoardTitle>
        <strong>DOTS AND BOXES</strong>
        <span>
          {size} × {size} boxes
        </span>
      </S.BoardTitle>
      <S.Paper>
        <S.BoardGrid $size={size} aria-label="Dots and Boxes board" role="group">
          {boxes.map((value, box) => {
            const owner = OWNERS[value];
            const row = Math.floor(box / size);
            const column = box % size;
            return (
              <S.Box
                $owner={owner}
                aria-label={`Box ${dotLabel(row, column)}: ${owner ? `claimed by ${names[owner]}` : 'unclaimed'}`}
                key={`box-${box}`}
                role="img"
                style={{gridColumn: 2 * column + 2, gridRow: 2 * row + 2}}
              >
                {owner && <span aria-hidden="true">{names[owner].charAt(0).toUpperCase()}</span>}
              </S.Box>
            );
          })}
          {indexes.map((row) =>
            indexes.slice(0, size).map((column) => renderLine(horizontalLine(size, row, column), row, column, false)),
          )}
          {indexes
            .slice(0, size)
            .map((row) => indexes.map((column) => renderLine(verticalLine(size, row, column), row, column, true)))}
          {indexes.map((row) =>
            indexes.map((column) => (
              <S.Dot
                aria-hidden="true"
                key={`dot-${row}-${column}`}
                style={{gridColumn: 2 * column + 1, gridRow: 2 * row + 1}}
              />
            )),
          )}
        </S.BoardGrid>
      </S.Paper>
      <S.Legend>
        <S.LegendItem $side="blue">{names.blue}</S.LegendItem>
        <S.LegendItem $side="red">{names.red}</S.LegendItem>
        {selected !== null && <span>Preview · press the line again to draw it</span>}
      </S.Legend>
    </S.BoardFrame>
  );
};

export default Board;
