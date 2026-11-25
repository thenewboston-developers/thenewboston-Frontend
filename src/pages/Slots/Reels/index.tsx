import {forwardRef, memo, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react';

import {symbolHref} from '../Symbols';
import {ReelColumn} from '../utils';

import ReelEngine, {CELLS_PER_REEL, ReelElements, StopOptions} from './engine';
import * as S from './Styles';

export interface ReelsHandle {
  highlight(on: boolean): void;
  set(columns: ReelColumn[]): void;
  start(): void;
  stop(columns: ReelColumn[], options?: StopOptions): Promise<void>;
}

interface ReelsProps {
  animate: boolean;
  // The third reel glows while it spins on toward a big win.
  anticipating?: boolean;
  initialColumns: ReelColumn[];
  label: string;
  onLand?: (reel: number) => void;
  result?: string;
}

const REELS = [0, 1, 2];
const CELLS = Array.from({length: CELLS_PER_REEL}, (_, index) => index);

const Reels = forwardRef<ReelsHandle, ReelsProps>(
  ({animate, anticipating, initialColumns, label, onLand, result}, ref) => {
    const [columns] = useState(initialColumns);
    const cells = useRef<HTMLDivElement[][]>(REELS.map(() => []));
    const engine = useRef<ReelEngine | null>(null);
    const landed = useRef(onLand);
    const reels = useRef<HTMLDivElement[]>([]);
    const uses = useRef<SVGUseElement[][]>(REELS.map(() => []));
    const windowRef = useRef<HTMLDivElement>(null);
    landed.current = onLand;

    useLayoutEffect(() => {
      const elements: ReelElements[] = REELS.map((reel) => ({
        cells: cells.current[reel],
        root: reels.current[reel],
        uses: uses.current[reel],
      }));
      const instance = new ReelEngine(elements, columns, {onLand: (reel) => landed.current?.(reel)});
      engine.current = instance;
      const measure = () => instance.measure();
      let observer: ResizeObserver | undefined;
      if (typeof ResizeObserver === 'function') {
        observer = new ResizeObserver(measure);
        observer.observe(reels.current[0]);
      } else {
        window.addEventListener('resize', measure);
      }
      return () => {
        observer?.disconnect();
        window.removeEventListener('resize', measure);
        instance.destroy();
        engine.current = null;
      };
    }, [columns]);

    useImperativeHandle(
      ref,
      () => ({
        highlight(on) {
          windowRef.current?.querySelectorAll('[data-winning]').forEach((cell) => cell.removeAttribute('data-winning'));
          if (on) engine.current?.paylineCells().forEach((cell) => cell?.setAttribute('data-winning', ''));
        },
        set(next) {
          engine.current?.set(next);
        },
        start() {
          if (animate) engine.current?.start();
        },
        stop(next, options) {
          if (!animate || !engine.current) {
            engine.current?.set(next);
            return Promise.resolve();
          }
          return engine.current.stop(next, options);
        },
      }),
      [animate],
    );

    return (
      <S.Window
        aria-label={label}
        data-anticipating={anticipating || undefined}
        data-result={result}
        ref={windowRef}
        role="img"
      >
        {REELS.map((reel) => (
          <S.Reel
            data-reel={reel}
            key={reel}
            ref={(element) => {
              if (element) reels.current[reel] = element;
            }}
          >
            {CELLS.map((cell) => (
              <S.Cell
                key={cell}
                ref={(element) => {
                  if (element) cells.current[reel][cell] = element;
                }}
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100">
                  <use
                    href={symbolHref(columns[reel][1])}
                    ref={(element) => {
                      if (element) uses.current[reel][cell] = element;
                    }}
                  />
                </svg>
              </S.Cell>
            ))}
          </S.Reel>
        ))}
        <S.Payline aria-hidden="true" />
      </S.Window>
    );
  },
);

Reels.displayName = 'Reels';

export default memo(Reels);
