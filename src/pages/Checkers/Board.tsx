import {PointerEvent as ReactPointerEvent, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {CheckersPiece, CheckersSide} from 'types/checkers';

import * as S from './BoardStyles';
import {
  advanceBoard,
  boardKey,
  captureDelays,
  routeDuration,
  routeKeyframes,
  squarePosition,
  squareTransform,
  trackBoard,
} from './pieces';
import {cellLabel} from './utils';

// Pointer travel (px) before a press on a piece becomes a drag rather than a click
const DRAG_THRESHOLD = 5;
const RETURN_MS = 200;
const SNAP_MS = 150;

interface Props {
  board: CheckersPiece[];
  disabled?: boolean;
  draggable?: number[];
  lastMove?: number[];
  mustCapture?: boolean;
  onDragStart?: (index: number) => void;
  onDrop?: (from: number, to: number) => boolean;
  onSelect: (index: number) => void;
  path: number[];
  routes?: number[][];
  selectable: number[];
  side: CheckersSide;
  targets: number[];
}

interface Drag {
  active: boolean;
  dx: number;
  dy: number;
  from: number;
  grabX: number;
  grabY: number;
  id: number;
  pointerId: number;
  startX: number;
  startY: number;
}

interface Drop {
  dx: number;
  dy: number;
  from: number;
  id: number;
  // The transition this drop was shown for, so later renders keep the same timing
  serial?: number;
  to: number;
}

const canAnimate = (element: HTMLElement | undefined): element is HTMLElement =>
  !!element &&
  typeof element.animate === 'function' &&
  !document.hidden &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const offsetTransform = (index: number, side: CheckersSide, dx: number, dy: number): string => {
  const {column, row} = squarePosition(index, side);
  return `translate(calc(${column * 100}% + ${dx}px), calc(${row * 100}% + ${dy}px))`;
};

const Board = ({
  board,
  disabled = false,
  draggable = [],
  lastMove = [],
  mustCapture = false,
  onDragStart,
  onDrop,
  onSelect,
  path,
  routes = [],
  selectable,
  side,
  targets,
}: Props) => {
  const [dragging, setDragging] = useState<number | null>(null);
  const [hoverSquare, setHoverSquare] = useState<number | null>(null);
  const [tracked, setTracked] = useState(() => trackBoard(board));
  const dragRef = useRef<Drag | null>(null);
  const dropRef = useRef<Drop | null>(null);
  const latest = useRef({disabled, onDragStart, onDrop, side});
  const layerRef = useRef<HTMLDivElement>(null);
  const moveAnimation = useRef<Animation | null>(null);
  const pieceElements = useRef(new Map<number, HTMLDivElement>());
  const suppressClick = useRef(false);
  const cells = Array.from({length: 64}, (_, index) => (side === 'black' ? 63 - index : index));
  const current = path.length ? path[path.length - 1] : null;
  latest.current = {disabled, onDragStart, onDrop, side};

  // Follow each piece from one board to the next so a move travels instead of popping into place
  let display = tracked;
  if (boardKey(board) !== tracked.key) {
    display = advanceBoard(tracked, board, routes);
    setTracked(display);
  }
  const {transition} = display;
  const opponentMove = !!transition && Math.sign(display.board[transition.to]) !== (side === 'white' ? 1 : -1);
  const drop = dropRef.current;
  const snapping =
    !!transition &&
    !!drop &&
    drop.id === transition.id &&
    drop.to === transition.to &&
    (drop.serial === undefined || drop.serial === transition.serial);
  const delays = transition && !snapping ? captureDelays(transition.route, opponentMove) : {};
  let crownDelay = 0;
  if (transition && !snapping) crownDelay = routeDuration(transition.route, opponentMove);
  else if (snapping) crownDelay = SNAP_MS;
  const slots = [
    ...display.board.flatMap((piece, index) => (piece ? [{exiting: false, id: display.ids[index], index, piece}] : [])),
    ...display.exiting.map((piece) => ({...piece, exiting: true})),
  ].sort((first, second) => first.id - second.id);

  const squareAt = useCallback((clientX: number, clientY: number): number | null => {
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect?.width || !rect.height) return null;
    const column = Math.floor(((clientX - rect.left) / rect.width) * 8);
    const row = Math.floor(((clientY - rect.top) / rect.height) * 8);
    if (column < 0 || column > 7 || row < 0 || row > 7) return null;
    return latest.current.side === 'black' ? 63 - (row * 8 + column) : row * 8 + column;
  }, []);

  const releaseDrag = useCallback((drag: Drag, returnToSquare: boolean) => {
    const element = pieceElements.current.get(drag.id);
    element?.style.removeProperty('--drag-x');
    element?.style.removeProperty('--drag-y');
    setDragging(null);
    setHoverSquare(null);
    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    });
    if (returnToSquare && canAnimate(element)) {
      moveAnimation.current = element.animate(
        [
          {transform: offsetTransform(drag.from, latest.current.side, drag.dx, drag.dy)},
          {transform: squareTransform(drag.from, latest.current.side)},
        ],
        {duration: RETURN_MS, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'},
      );
    }
  }, []);

  const cancelDrag = useCallback(() => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag?.active) releaseDrag(drag, true);
  }, [releaseDrag]);

  // Animate the piece that moved: along its route, or a short settle from where it was dropped
  useLayoutEffect(() => {
    if (!transition) return undefined;
    const element = pieceElements.current.get(transition.id);
    const pending = dropRef.current;
    const dropped =
      pending &&
      pending.id === transition.id &&
      pending.to === transition.to &&
      (pending.serial === undefined || pending.serial === transition.serial);
    if (dropped) pending.serial = transition.serial;
    if (!canAnimate(element)) return undefined;
    const {side: currentSide} = latest.current;
    const opponent = Math.sign(display.board[transition.to]) !== (currentSide === 'white' ? 1 : -1);
    const animation = dropped
      ? element.animate(
          [
            {transform: offsetTransform(pending.from, currentSide, pending.dx, pending.dy)},
            {transform: squareTransform(transition.to, currentSide)},
          ],
          {duration: SNAP_MS, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'},
        )
      : element.animate(routeKeyframes(transition.route, currentSide, opponent), {
          duration: routeDuration(transition.route, opponent),
        });
    moveAnimation.current = animation;
    return () => animation.cancel();
    // Only a new transition starts an animation; the board it belongs to arrives with it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition]);

  useEffect(() => {
    if (disabled) cancelDrag();
  }, [cancelDrag, disabled]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') cancelDrag();
    };
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      if (!drag.active) {
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < DRAG_THRESHOLD) return;
        drag.active = true;
        moveAnimation.current?.cancel();
        setDragging(drag.from);
        latest.current.onDragStart?.(drag.from);
      }
      const element = pieceElements.current.get(drag.id);
      const rect = layerRef.current?.getBoundingClientRect();
      if (!element || !rect?.width) return;
      // Measured on every move, so scrolling or the toolbar changing height cannot detach the piece from the pointer
      const size = rect.width / 8;
      const {column, row} = squarePosition(drag.from, latest.current.side);
      drag.dx = event.clientX - rect.left - drag.grabX - column * size;
      drag.dy = event.clientY - rect.top - drag.grabY - row * size;
      element.style.setProperty('--drag-x', `${drag.dx}px`);
      element.style.setProperty('--drag-y', `${drag.dy}px`);
      setHoverSquare(squareAt(event.clientX, event.clientY));
    };
    const handlePointerUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      dragRef.current = null;
      // A press without movement is a click, which the square's own handler plays
      if (!drag.active) return;
      const square = squareAt(event.clientX, event.clientY);
      // Recorded before the drop is reported, so the render it causes settles the piece from where it was let go
      const previous = dropRef.current;
      dropRef.current = {dx: drag.dx, dy: drag.dy, from: drag.from, id: drag.id, to: square ?? -1};
      const accepted =
        square !== null &&
        square !== drag.from &&
        !latest.current.disabled &&
        !!latest.current.onDrop?.(drag.from, square);
      if (!accepted) dropRef.current = previous;
      releaseDrag(drag, !accepted);
    };
    window.addEventListener('blur', cancelDrag);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointercancel', cancelDrag);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('blur', cancelDrag);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointercancel', cancelDrag);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dragRef.current = null;
    };
  }, [cancelDrag, releaseDrag, squareAt]);

  const getSlotLayer = (id: number, index: number, exiting: boolean): number => {
    if (dragging === index && !exiting) return 4;
    if (id === transition?.id) return 3;
    return exiting ? 1 : 2;
  };

  const getSlotState = (id: number, exiting: boolean): 'entering' | 'exiting' | 'idle' => {
    if (exiting) return 'exiting';
    return display.entering.includes(id) ? 'entering' : 'idle';
  };

  const handleCellClick = (index: number) => {
    if (suppressClick.current) return;
    onSelect(index);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    // Touch keeps tap-to-move so a finger on the board can still scroll the page
    if (event.button !== 0 || event.pointerType === 'touch' || disabled || dragRef.current) return;
    if (!draggable.includes(index) || !display.ids[index]) return;
    const rect = layerRef.current?.getBoundingClientRect();
    if (!rect?.width) return;
    const size = rect.width / 8;
    const {column, row} = squarePosition(index, side);
    dragRef.current = {
      active: false,
      dx: 0,
      dy: 0,
      from: index,
      grabX: event.clientX - rect.left - column * size,
      grabY: event.clientY - rect.top - row * size,
      id: display.ids[index],
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  return (
    <S.BoardFrame>
      <S.BoardTitle>
        <strong>8 × 8 · English draughts</strong>
        <span>{side === 'white' ? 'Ivory' : 'Charcoal'} side below</span>
      </S.BoardTitle>
      <S.BoardGrid $dragging={dragging !== null} aria-label="Checkers board" role="group">
        {cells.map((index) => {
          const piece = board[index];
          const dark = (Math.floor(index / 8) + (index % 8)) % 2 === 1;
          const target = targets.includes(index);
          const selected = current === index;
          const movable = !disabled && draggable.includes(index);
          const name = piece ? `${piece > 0 ? 'white' : 'black'} ${Math.abs(piece) === 2 ? 'king' : 'man'}` : 'empty';
          const label = `${cellLabel(index)}: ${name}${selected ? ', selected' : ''}${target ? ', legal destination' : ''}`;
          return (
            <S.Cell
              $dark={dark}
              $dropTarget={dragging !== null && hoverSquare === index && target}
              $last={lastMove.includes(index)}
              $movable={movable}
              $mustCapture={mustCapture && !disabled && !selected && selectable.includes(index)}
              $selected={selected}
              $target={target}
              aria-label={label}
              aria-pressed={selected}
              disabled={disabled || (!selectable.includes(index) && !target && !draggable.includes(index))}
              key={index}
              onClick={() => handleCellClick(index)}
              onPointerDown={(event) => handlePointerDown(event, index)}
              type="button"
            >
              <S.Coordinate $dark={dark} aria-hidden="true">
                {cellLabel(index)}
              </S.Coordinate>
            </S.Cell>
          );
        })}
        <S.PieceLayer aria-hidden="true" ref={layerRef}>
          {slots.map(({exiting, id, index, piece}) => {
            const {column, row} = squarePosition(index, side);
            return (
              <S.PieceSlot
                $delay={exiting ? (delays[index] ?? 0) : 0}
                $state={getSlotState(id, exiting)}
                data-square={exiting ? undefined : index}
                key={id}
                ref={(element: HTMLDivElement | null) => {
                  if (element) pieceElements.current.set(id, element);
                  else if (pieceElements.current.get(id)) pieceElements.current.delete(id);
                }}
                style={{
                  transform: `translate(calc(${column * 100}% + var(--drag-x, 0px)), calc(${row * 100}% + var(--drag-y, 0px)))`,
                  zIndex: getSlotLayer(id, index, exiting),
                }}
              >
                <S.Piece $lifted={!exiting && (dragging === index || current === index)} $white={piece > 0}>
                  {Math.abs(piece) === 2 && (
                    <S.Crown $delay={transition?.crowned && id === transition.id ? crownDelay : null}>♛</S.Crown>
                  )}
                </S.Piece>
              </S.PieceSlot>
            );
          })}
        </S.PieceLayer>
      </S.BoardGrid>
      <S.Legend>
        <span>● Gold dot: legal landing</span>
        <span>♛ Crown: king</span>
      </S.Legend>
    </S.BoardFrame>
  );
};

export default Board;
