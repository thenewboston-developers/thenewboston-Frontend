import {useCallback, useEffect, useRef, useState} from 'react';

import {MancalaBoard, MancalaMatch, MancalaSide} from 'types/mancala';

import {SowingFrame, sowingFrames, trimBacklog} from './utils';

type PresentationSound = 'capture' | 'extraTurn' | 'sow' | 'win';
interface SoundFrame extends SowingFrame {
  sound?: PresentationSound;
}

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
const usePresentation = (
  match: MancalaMatch | undefined,
  onSound?: (sound: PresentationSound) => void,
  viewerSide: MancalaSide | null = null,
) => {
  const [display, setDisplay] = useState<Display | null>(null);
  const planned = useRef<{
    board: MancalaBoard;
    id: number;
    status: MancalaMatch['status'];
    version: number;
    victory: boolean;
    winner: MancalaSide | null;
  } | null>(null);
  const queue = useRef<SoundFrame[]>([]);
  const sound = useRef(onSound);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const viewer = useRef(viewerSide);

  sound.current = onSound;
  viewer.current = viewerSide;

  const resetPresentation = useCallback((data: MancalaMatch) => {
    if (planned.current?.id === data.id && planned.current.version > data.version) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    queue.current = [];
    planned.current = {
      board: data.board,
      id: data.id,
      status: data.status,
      version: data.version,
      victory: false,
      winner: data.winner,
    };
    setDisplay({board: data.board, frame: null, id: data.id, version: data.version});
  }, []);

  const step = useCallback(() => {
    const target = planned.current;
    if (!target) return;
    const frame = queue.current.shift();
    if (!frame) {
      timer.current = null;
      setDisplay({...target, frame: null});
      if (target.victory && target.winner === viewer.current && !document.hidden) sound.current?.('win');
      target.victory = false;
      return;
    }
    if (frame.sound && !document.hidden) sound.current?.(frame.sound);
    // The version on screen stays behind until the last step, so the board cannot be played mid-move
    setDisplay((current) => ({board: frame.board, frame, id: target.id, version: current?.version ?? 0}));
    timer.current = setTimeout(step, frame.duration);
  }, []);

  useEffect(() => {
    if (!match) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      planned.current = null;
      queue.current = [];
      setDisplay(null);
      return;
    }
    const previous = planned.current;
    if (previous && previous.id === match.id && previous.version >= match.version) return;
    const moves =
      previous && previous.id === match.id
        ? (match.recent_moves ?? []).filter(({version}) => version > previous.version)
        : [];
    const victory =
      !!previous &&
      previous.id === match.id &&
      (previous.victory || (previous.status !== 'finished' && match.status === 'finished' && !!match.winner));
    planned.current = {
      board: match.board,
      id: match.id,
      status: match.status,
      version: match.version,
      victory,
      winner: match.winner,
    };
    if (!moves.length || moves[0].version !== previous!.version + 1 || document.hidden || prefersReducedMotion()) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      queue.current = [];
      setDisplay({board: match.board, frame: null, id: match.id, version: match.version});
      if (!document.hidden) {
        // Reduced motion still gets one current move cue, never a burst of historical stones.
        if (moves.length && moves[0].version === previous!.version + 1 && prefersReducedMotion()) {
          const latest = moves[moves.length - 1];
          let cue: PresentationSound = latest.extra_turn ? 'extraTurn' : 'sow';
          if (latest.captured) cue = 'capture';
          sound.current?.(cue);
        }
        if (victory && match.winner === viewer.current) sound.current?.('win');
      }
      planned.current.victory = false;
      return;
    }
    let {board} = previous!;
    moves.forEach((move) => {
      queue.current.push(
        ...sowingFrames(board, move).map((frame): SoundFrame => {
          if (frame.kind === 'capture' || frame.kind === 'sweep') return {...frame, sound: 'capture'};
          if (frame.kind === 'drop') return {...frame, sound: !frame.hand && move.extra_turn ? 'extraTurn' : 'sow'};
          return frame;
        }),
      );
      ({board} = move);
    });
    queue.current = trimBacklog(queue.current, MAX_BACKLOG_MS);
    if (!timer.current) step();
  }, [match, step]);

  useEffect(() => {
    const skipHiddenReplay = () => {
      if (!document.hidden || !planned.current) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      queue.current = [];
      planned.current.victory = false;
      setDisplay({...planned.current, frame: null});
    };
    document.addEventListener('visibilitychange', skipHiddenReplay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      document.removeEventListener('visibilitychange', skipHiddenReplay);
    };
  }, []);

  const current = match && display?.id === match.id ? display : null;
  return {
    board: current?.board ?? match?.board ?? null,
    frame: current?.frame ?? null,
    isBusy: !!match && !(current && !current.frame && current.version === match.version),
    resetPresentation,
    // The newest move whose stones have landed, so nothing else gives a move away while it is being shown
    shownVersion: current?.frame ? current.frame.version - 1 : (current?.version ?? match?.version ?? 0),
  };
};

export default usePresentation;
