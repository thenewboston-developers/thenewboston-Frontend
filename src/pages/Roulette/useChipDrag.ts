import {PointerEvent, useCallback, useEffect, useRef, useState} from 'react';

// Chips picked up from the rack (`fromId` null) or a stack lifted off a spot
export interface DragSource {
  fromId: string | null;
  value: number;
}

interface Press {
  active: boolean;
  pointerId: number;
  source: DragSource;
  startX: number;
  startY: number;
}

interface ChipDragOptions {
  disabled: boolean;
  // Called when dragged chips are let go: over a spot, or over nothing (`spotId` null)
  onDrop(source: DragSource, spotId: string | null): void;
}

// Pointer travel (px) before a press on a chip becomes a drag rather than a click
const DRAG_THRESHOLD = 5;

const getSpotAt = (x: number, y: number): string | null => {
  const element = document.elementFromPoint?.(x, y);
  return (element?.closest('[data-spot]') as HTMLElement | null)?.dataset.spot ?? null;
};

/**
 * Dragging chips with a mouse or a pen: from the rack onto a spot, from one spot to another, or off the table. A touch
 * keeps its taps and its scrolling, so phones place chips by tapping. The chip in the player's hand is one element
 * moved straight from the pointer events; React only hears when a drag starts, changes target or ends.
 */
const useChipDrag = ({disabled, onDrop}: ChipDragOptions) => {
  const [drag, setDrag] = useState<DragSource | null>(null);
  const [dropId, setDropId] = useState<string | null>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const justDropped = useRef(false);
  const latest = useRef({onDrop});
  const press = useRef<Press | null>(null);
  latest.current = {onDrop};

  const cancelDrag = useCallback(() => {
    press.current = null;
    setDrag(null);
    setDropId(null);
  }, []);

  // The browser still sends a click after a drag that ends where it began; the table must not read it as a tap
  const consumeDrop = useCallback(() => {
    const dropped = justDropped.current;
    justDropped.current = false;
    return dropped;
  }, []);

  const pressChips = useCallback(
    (event: PointerEvent<HTMLElement>, source: DragSource) => {
      if (disabled || event.button !== 0 || event.pointerType === 'touch' || source.value <= 0) return;
      press.current = {
        active: false,
        pointerId: event.pointerId,
        source,
        startX: event.clientX,
        startY: event.clientY,
      };
    },
    [disabled],
  );

  useEffect(() => {
    if (disabled) cancelDrag();
  }, [cancelDrag, disabled]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') cancelDrag();
    };

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const {current} = press;
      if (!current || event.pointerId !== current.pointerId) return;
      if (!current.active) {
        if (Math.hypot(event.clientX - current.startX, event.clientY - current.startY) < DRAG_THRESHOLD) return;
        current.active = true;
        setDrag(current.source);
      }
      if (ghost.current) {
        ghost.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -60%)`;
      }
      const spotId = getSpotAt(event.clientX, event.clientY);
      setDropId((previous) => (previous === spotId ? previous : spotId));
    };

    const handlePointerUp = (event: globalThis.PointerEvent) => {
      const {current} = press;
      if (!current || event.pointerId !== current.pointerId) return;
      press.current = null;
      if (!current.active) return;
      justDropped.current = true;
      // Only the click that this release itself produces is swallowed
      setTimeout(() => {
        justDropped.current = false;
      }, 0);
      setDrag(null);
      setDropId(null);
      latest.current.onDrop(current.source, getSpotAt(event.clientX, event.clientY));
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
      press.current = null;
    };
  }, [cancelDrag]);

  return {consumeDrop, drag, dropId, ghost, pressChips};
};

export default useChipDrag;
