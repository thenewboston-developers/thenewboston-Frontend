import {useCallback, useEffect, useRef, useState} from 'react';

import {MancalaBoard, MancalaMatch} from 'types/mancala';

import {SowingFrame, sowingFrames, trimBacklog} from './utils';

interface Display {
  board: MancalaBoard;
  frame: SowingFrame | null;
  id: number;
  version: number;
}

// The longest the board on screen may trail the real one
const MAX_BACKLOG_MS = 5000;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Shows each newly committed move one stone at a time, including moves the computer made between two polls. The first
 * snapshot of a match, a hidden tab, reduced motion, and gaps the server no longer describes all show the board as it
 * is. `isBusy` stays true until the board on screen is the match's current board. A viewer who falls behind skips
 * ahead to the newest moves.
 */
const usePresentation = (match: MancalaMatch | undefined) => {
  const [display, setDisplay] = useState<Display | null>(null);
  const planned = useRef<{board: MancalaBoard; id: number; version: number} | null>(null);
  const queue = useRef<SowingFrame[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = useCallback(() => {
    const target = planned.current;
    if (!target) return;
    const frame = queue.current.shift();
    if (!frame) {
      timer.current = null;
      setDisplay({...target, frame: null});
      return;
    }
    // The version on screen stays behind until the last step, so the board cannot be played mid-move
    setDisplay((current) => ({board: frame.board, frame, id: target.id, version: current?.version ?? 0}));
    timer.current = setTimeout(step, frame.duration);
  }, []);

  useEffect(() => {
    if (!match) return;
    const previous = planned.current;
    if (previous && previous.id === match.id && previous.version === match.version) return;
    const moves =
      previous && previous.id === match.id
        ? (match.recent_moves ?? []).filter(({version}) => version > previous.version)
        : [];
    planned.current = {board: match.board, id: match.id, version: match.version};
    if (!moves.length || moves[0].version !== previous!.version + 1 || document.hidden || prefersReducedMotion()) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      queue.current = [];
      setDisplay({board: match.board, frame: null, id: match.id, version: match.version});
      return;
    }
    let {board} = previous!;
    moves.forEach((move) => {
      queue.current.push(...sowingFrames(board, move));
      ({board} = move);
    });
    queue.current = trimBacklog(queue.current, MAX_BACKLOG_MS);
    if (!timer.current) step();
  }, [match, step]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    },
    [],
  );

  const current = match && display?.id === match.id ? display : null;
  return {
    board: current?.board ?? match?.board ?? null,
    frame: current?.frame ?? null,
    isBusy: !!match && !(current && !current.frame && current.version === match.version),
    // The newest move whose stones have landed, so nothing else gives a move away while it is being shown
    shownVersion: current?.frame ? current.frame.version - 1 : (current?.version ?? match?.version ?? 0),
  };
};

export default usePresentation;
