import {
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {Stack} from './Shelves';
import {Place} from './Styles';

const THRESHOLD = 7;

// Carrying a whole stack from one store to the other with a mouse or a pen. A finger keeps scrolling the page and
// taps a good to pick it instead.
export const useStackDrag = ({
  area,
  enabled,
  ghost,
  onDrop,
}: {
  area: RefObject<HTMLElement | null>;
  enabled: boolean;
  ghost: RefObject<HTMLElement | null>;
  onDrop: (stack: Stack, place: Place) => void;
}) => {
  const [carried, setCarried] = useState<Stack | null>(null);
  const [over, setOver] = useState<Place | null>(null);
  const cleanup = useRef<(() => void) | null>(null);
  const latest = useRef({enabled, onDrop});
  const pointer = useRef({x: 0, y: 0});
  const released = useRef(false);
  latest.current = {enabled, onDrop};

  const follow = useCallback(() => {
    const element = ghost.current;
    const origin = area.current?.getBoundingClientRect();
    if (!element || !origin) return;
    const left = pointer.current.x - origin.left - element.offsetWidth / 2;
    const top = pointer.current.y - origin.top - element.offsetHeight / 2;
    element.style.transform = `translate(${left}px, ${top}px)`;
  }, [area, ghost]);

  const handlePress = useCallback(
    (event: ReactPointerEvent<HTMLElement>, stack: Stack) => {
      if (!latest.current.enabled || event.pointerType === 'touch' || event.button !== 0) return;
      const start = {x: event.clientX, y: event.clientY};
      let active = false;
      let hovered: Place | null = null;

      const handleMove = (move: PointerEvent) => {
        if (!active) {
          if (Math.hypot(move.clientX - start.x, move.clientY - start.y) < THRESHOLD) return;
          active = true;
          setCarried(stack);
        }
        pointer.current = {x: move.clientX, y: move.clientY};
        follow();
        const store = document
          .elementFromPoint(move.clientX, move.clientY)
          ?.closest('[data-store]')
          ?.getAttribute('data-store') as Place | null | undefined;
        const next = store && store !== stack.place ? store : null;
        if (next !== hovered) {
          hovered = next;
          setOver(next);
        }
      };

      const handleStop = () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleEnd);
        window.removeEventListener('pointercancel', handleEnd);
        cleanup.current = null;
      };

      function handleEnd(end: PointerEvent) {
        handleStop();
        if (!active) return;
        // The click that follows a drag must not also pick the good
        released.current = true;
        window.setTimeout(() => {
          released.current = false;
        }, 0);
        setCarried(null);
        setOver(null);
        if (end.type === 'pointerup' && hovered && latest.current.enabled) latest.current.onDrop(stack, hovered);
      }

      cleanup.current?.();
      cleanup.current = handleStop;
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleEnd);
      window.addEventListener('pointercancel', handleEnd);
    },
    [follow],
  );

  const wasDragged = useCallback(() => released.current, []);

  // The carried stack appears under the pointer on the frame it is created
  useLayoutEffect(() => {
    if (carried) follow();
  }, [carried, follow]);

  useEffect(() => () => cleanup.current?.(), []);

  return {carried, handlePress, over, wasDragged};
};
