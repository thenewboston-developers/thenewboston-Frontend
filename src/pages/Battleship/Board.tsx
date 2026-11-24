import {Fragment, useEffect, useRef, useState} from 'react';

import {Cell, Ship, Shot} from 'types/battleship';

import * as S from './Styles';
import {canPlaceShip, cellLabel, shipCells} from './utils';

const SHOT_LABELS = {hit: 'Direct hit!', miss: 'Splash. Open water.', sunk: 'Ship sunk!'};

interface Props {
  disabled?: boolean;
  label: string;
  onSelect?: (cell: Cell) => void;
  placement?: Pick<Ship, 'id' | 'orientation'>;
  selected?: Cell | null;
  ships?: Ship[];
  shots?: Shot[];
  subtitle?: string;
}

const Board = ({disabled = false, label, onSelect, placement, selected, ships = [], shots = [], subtitle}: Props) => {
  const [effects, setEffects] = useState<Shot[]>([]);
  const [hovered, setHovered] = useState<Cell | null>(null);
  const previousShots = useRef(new Set(shots.map(cellLabel)));
  const occupied = new Set(ships.flatMap(shipCells).map(cellLabel));
  const preview = placement && hovered ? {...placement, ...hovered} : null;
  const previewCells = new Set(preview ? shipCells(preview).map(cellLabel) : []);
  const previewValid = preview ? canPlaceShip(preview, ships) : true;
  const shotMap = new Map(shots.map((shot) => [cellLabel(shot), shot]));
  const sunk = new Set(
    ships
      .filter((ship) =>
        shipCells(ship).every((cell) => {
          const shot = shotMap.get(cellLabel(cell));
          return shot && shot.result !== 'miss';
        }),
      )
      .flatMap(shipCells)
      .map(cellLabel),
  );

  useEffect(() => {
    const added = shots.filter((shot) => !previousShots.current.has(cellLabel(shot)));
    previousShots.current = new Set(shots.map(cellLabel));
    if (added.length) setEffects((current) => [...current, ...added]);
  }, [shots]);

  useEffect(() => {
    if (!effects.length) return undefined;
    const timer = setTimeout(() => setEffects([]), 1500);
    return () => clearTimeout(timer);
  }, [effects]);

  return (
    <S.BoardFrame>
      <S.BoardTitle>
        <h2>{label}</h2>
        <span>{subtitle}</span>
      </S.BoardTitle>
      <S.BoardGrid aria-label={label} onMouseLeave={() => setHovered(null)} role="group">
        <span />
        {Array.from({length: 10}, (_, column) => (
          <S.BoardLabel key={column}>{column + 1}</S.BoardLabel>
        ))}
        {Array.from({length: 10}, (_, row) => (
          <Fragment key={row}>
            <S.BoardLabel>{String.fromCharCode(65 + row)}</S.BoardLabel>
            {Array.from({length: 10}, (__, column) => {
              const cell = {row, column};
              const coordinate = cellLabel(cell);
              const shot = shotMap.get(coordinate);
              const state = sunk.has(coordinate)
                ? 'sunk'
                : (shot?.result ?? (occupied.has(coordinate) ? 'ship' : 'water'));
              let marker = '';
              if (state === 'miss') marker = '•';
              if (state === 'hit' || state === 'sunk') marker = '×';
              const isSelected = selected?.row === row && selected.column === column;
              const effect = effects.find((event) => cellLabel(event) === coordinate);
              return (
                <S.Cell
                  $invalid={previewCells.has(coordinate) && !previewValid}
                  $preview={previewCells.has(coordinate)}
                  $selected={isSelected}
                  $state={state}
                  aria-label={`${coordinate}: ${state}${isSelected ? ', selected' : ''}`}
                  aria-pressed={placement ? isSelected : undefined}
                  disabled={disabled || !onSelect || (!placement && !!shot)}
                  key={column}
                  onClick={() => onSelect?.(cell)}
                  onFocus={() => setHovered(cell)}
                  onMouseEnter={() => setHovered(cell)}
                  type="button"
                >
                  <span aria-hidden="true">{marker}</span>
                  {effect && (
                    <S.ShotEffect $result={effect.result} aria-hidden="true" data-shot-effect={effect.result}>
                      <span />
                      <span />
                      <span />
                    </S.ShotEffect>
                  )}
                </S.Cell>
              );
            })}
          </Fragment>
        ))}
      </S.BoardGrid>
      <S.ShotReport aria-live="polite">
        {effects.length > 0 &&
          `${cellLabel(effects[effects.length - 1])} · ${SHOT_LABELS[effects[effects.length - 1].result]}`}
      </S.ShotReport>
      <S.Legend>
        <span>• Miss</span>
        <span>× Hit</span>
        <span>Rust red · Sunk</span>
        {ships.length > 0 && <span>Blue · Ship</span>}
      </S.Legend>
    </S.BoardFrame>
  );
};

export default Board;
