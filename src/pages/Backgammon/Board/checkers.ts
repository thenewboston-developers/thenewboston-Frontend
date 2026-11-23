import {BackgammonBoard, BackgammonSide} from 'types/backgammon';

export type CheckerLocation = number | 'bar' | 'off';

export interface Checker {
  id: string;
  location: CheckerLocation;
  moved: boolean;
  side: BackgammonSide;
  slot: number;
  x: number;
  y: number;
}

const SIDES: BackgammonSide[] = ['white', 'black'];
const LOCATIONS: CheckerLocation[] = [...Array.from({length: 24}, (_, index) => index), 'bar', 'off'];

export const boardSignature = (board: BackgammonBoard): string => {
  return `${board.points.join(',')}|${board.bar.white},${board.bar.black}|${board.off.white},${board.off.black}`;
};

export const checkerPosition = (
  side: BackgammonSide,
  location: CheckerLocation,
  slot: number,
  perspective: BackgammonSide,
): {x: number; y: number} => {
  if (location === 'bar') return {x: 446, y: side === perspective ? 413 : 227};
  if (location === 'off') return {x: 929, y: side === perspective ? 442 : 146};

  const displayedPoint = perspective === 'white' ? location : 23 - location;
  const top = displayedPoint >= 12;
  const column = top ? displayedPoint - 12 : 11 - displayedPoint;
  // Overflow checkers share the fifth visible position; the separate count label still shows the full stack.
  const visibleSlot = Math.min(slot, 4);
  return {x: 65 + column * 64 + (column >= 6 ? 52 : 0), y: top ? 81 + visibleSlot * 46 : 559 - visibleSlot * 46};
};

const countAt = (board: BackgammonBoard, side: BackgammonSide, location: CheckerLocation): number => {
  if (location === 'bar' || location === 'off') return board[location][side];
  const value = board.points[location];
  return Math.max(0, side === 'white' ? value : -value);
};

/**
 * The API sends counts, not checker identities. Keep every checker that can remain on its point, then move only
 * the surplus top checkers into the vacancies. This works in reverse for undo, and for multi-checker server turns.
 * IDs remain stable so the browser retargets an in-flight transform instead of creating animation ghosts.
 */
export const reconcileCheckers = (
  previous: Checker[],
  board: BackgammonBoard,
  perspective: BackgammonSide,
): Checker[] => {
  const next: Checker[] = [];

  SIDES.forEach((side) => {
    const existing = previous.filter((checker) => checker.side === side);
    const surplus: Checker[] = [];
    const vacancies: {location: CheckerLocation; slot: number}[] = [];
    let nextId = existing.reduce((maximum, checker) => Math.max(maximum, Number(checker.id.split('-')[1]) + 1), 0);

    LOCATIONS.forEach((location) => {
      const current = existing
        .filter((checker) => checker.location === location)
        .sort((left, right) => left.slot - right.slot);
      const count = countAt(board, side, location);
      const retained = current.slice(0, count);
      retained.forEach((checker, slot) =>
        next.push({...checker, moved: false, slot, ...checkerPosition(side, location, slot, perspective)}),
      );
      surplus.push(...current.slice(count));
      for (let slot = retained.length; slot < count; slot += 1) vacancies.push({location, slot});
    });

    vacancies.forEach(({location, slot}) => {
      // Local previews have one origin. For a whole opponent turn, pair the closest positions along the track.
      const nearest = surplus.reduce((best, checker, index) => {
        if (best < 0) return index;
        const destination = trackPosition(side, location);
        const distance = Math.abs(trackPosition(side, checker.location) - destination);
        const bestDistance = Math.abs(trackPosition(side, surplus[best].location) - destination);
        return distance < bestDistance ? index : best;
      }, -1);
      const moving = nearest < 0 ? null : surplus.splice(nearest, 1)[0];
      const id = moving?.id ?? `${side}-${nextId}`;
      if (!moving) nextId += 1;
      next.push({id, location, moved: !!moving, side, slot, ...checkerPosition(side, location, slot, perspective)});
    });
  });

  // Keep DOM order fixed: moving an SVG node to the front can cancel its first CSS transition.
  return next.sort((left, right) => left.id.localeCompare(right.id));
};

const trackPosition = (side: BackgammonSide, location: CheckerLocation): number => {
  if (location === 'bar') return 24;
  if (location === 'off') return -1;
  return side === 'white' ? location : 23 - location;
};
