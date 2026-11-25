import {CSSProperties, MouseEvent, useState} from 'react';

import Chip from '../Chip';
import {
  COLUMN_SPOTS,
  describeSpot,
  DOZEN_SPOTS,
  EVEN_MONEY_SPOTS,
  formatTnb,
  getPocketColor,
  NUMBER_SPOTS,
  Spot,
  spotCovers,
} from '../utils';

import * as S from './Styles';

export type FeltFlash = 'lost' | 'won' | null;

interface FeltProps {
  amount: number;
  disabled: boolean;
  // Set for a few seconds after a result, while the table shows what won and what happened to the player's chips
  flash: FeltFlash;
  onPlace(spot: Spot): void;
  onRemove(spot: Spot): void;
  // What the bet paid, shown rising off the chips while the win is flashing
  payout: number;
  spotId: string | null;
  winning: number | null;
}

interface Placement {
  column: number;
  columnSpan?: number;
  row: number;
  rowSpan?: number;
}

// Where a spot sits on the wide table (numbers run left to right) and on the tall one used on narrow screens
const getPlacements = (spot: Spot, index: number): {tall: Placement; wide: Placement} => {
  const value = spot.value ?? 0;
  switch (spot.type) {
    case 'number':
      if (value === 0) return {tall: {column: 3, columnSpan: 3, row: 1}, wide: {column: 1, row: 1, rowSpan: 3}};
      return {
        tall: {column: 3 + ((value - 1) % 3), row: Math.ceil(value / 3) + 1},
        wide: {column: Math.ceil(value / 3) + 1, row: 3 - ((value - 1) % 3)},
      };
    case 'column':
      return {tall: {column: 2 + value, row: 14}, wide: {column: 14, row: 4 - value}};
    case 'dozen':
      return {
        tall: {column: 2, row: (value - 1) * 4 + 2, rowSpan: 4},
        wide: {column: (value - 1) * 4 + 2, columnSpan: 4, row: 4},
      };
    default:
      return {tall: {column: 1, row: index * 2 + 2, rowSpan: 2}, wide: {column: index * 2 + 2, columnSpan: 2, row: 5}};
  }
};

const getPlacementStyle = (spot: Spot, index: number) => {
  const {tall, wide} = getPlacements(spot, index);
  return {
    '--tall-column': `${tall.column} / span ${tall.columnSpan ?? 1}`,
    '--tall-row': `${tall.row} / span ${tall.rowSpan ?? 1}`,
    '--wide-column': `${wide.column} / span ${wide.columnSpan ?? 1}`,
    '--wide-row': `${wide.row} / span ${wide.rowSpan ?? 1}`,
  } as CSSProperties;
};

const getTone = (spot: Spot): S.SpotTone => {
  if (spot.type === 'number') return getPocketColor(spot.value!);
  return 'outside';
};

/**
 * The betting layout. Every place a chip can go is a real button, so the table works with a keyboard and a screen
 * reader; the wide and tall arrangements are the same buttons placed by CSS grid.
 */
const Felt = ({amount, disabled, flash, onPlace, onRemove, payout, spotId, winning}: FeltProps) => {
  const [hovered, setHovered] = useState<Spot | null>(null);

  const handleContextMenu = (event: MouseEvent, spot: Spot) => {
    event.preventDefault();
    if (!disabled && spot.id === spotId) onRemove(spot);
  };

  const renderSpot = (spot: Spot, index: number) => {
    const isNumber = spot.type === 'number';
    const isSelected = spot.id === spotId && amount > 0;
    const isWinner = winning !== null && (isNumber ? spot.value === winning : spotCovers(spot, winning));
    const isCovered = !!hovered && hovered.type !== 'number' && isNumber && spotCovers(hovered, spot.value!);
    const isVertical = spot.type === 'dozen' || EVEN_MONEY_SPOTS.includes(spot);
    let lift: S.LabelLift = null;
    if (isSelected) lift = isNumber ? 'corner' : 'up';
    let state: S.SpotState = 'idle';
    if (winning !== null) state = isWinner ? 'won' : 'dimmed';
    return (
      <S.Spot
        $compact={spot.type === 'column'}
        $covered={isCovered}
        $selected={isSelected}
        $state={state}
        $tone={getTone(spot)}
        $vertical={isVertical}
        aria-label={`${describeSpot(spot)}, returns ${spot.multiplier}×${isSelected ? `, ${formatTnb(amount)} placed` : ''}`}
        aria-pressed={isSelected}
        data-spot={spot.id}
        disabled={disabled}
        key={spot.id}
        onBlur={() => setHovered(null)}
        onClick={() => onPlace(spot)}
        onContextMenu={(event) => handleContextMenu(event, spot)}
        onFocus={() => setHovered(spot)}
        onMouseEnter={() => setHovered(spot)}
        onMouseLeave={() => setHovered(null)}
        style={getPlacementStyle(spot, index)}
        type="button"
      >
        <S.SpotLabel $lift={lift}>
          {(spot.type === 'red' || spot.type === 'black') && <S.Gem $color={spot.type} aria-hidden="true" />}
          {spot.label}
        </S.SpotLabel>
        {!isNumber && !isSelected && <S.Pays aria-hidden="true">{spot.multiplier}×</S.Pays>}
        {isWinner && isNumber && <S.Dolly aria-hidden="true" />}
        {isSelected && flash === 'won' && payout > 0 && (
          <S.Payout aria-hidden="true">+{payout.toLocaleString()}</S.Payout>
        )}
        {isSelected && (
          <S.Seat $flash={flash} $outside={!isNumber} $vertical={isVertical} key={`${amount}-${flash ?? 'set'}`}>
            <Chip amount={amount} stacked />
          </S.Seat>
        )}
      </S.Spot>
    );
  };

  return (
    <S.Frame>
      <S.Felt $locked={disabled} aria-label="Roulette table" role="group">
        {NUMBER_SPOTS.map(renderSpot)}
        {COLUMN_SPOTS.map(renderSpot)}
        {DOZEN_SPOTS.map(renderSpot)}
        {EVEN_MONEY_SPOTS.map(renderSpot)}
      </S.Felt>
    </S.Frame>
  );
};

export default Felt;
