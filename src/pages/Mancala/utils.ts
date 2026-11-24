import axios from 'axios';

import {MancalaBoard, MancalaMatch, MancalaMove, MancalaRecentMove, MancalaSide} from 'types/mancala';

export const PITS = 6;
export const BOARD_SIZE = 14;
export const STORE: Record<MancalaSide, number> = {host: 6, guest: 13};
export const INITIAL_BOARD: MancalaBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

export interface SowingFrame {
  board: MancalaBoard;
  // How long this step stays on screen before the next one
  duration: number;
  // Stones the mover is still holding
  hand: number;
  kind: 'lift' | 'drop' | 'capture' | 'sweep';
  // Board indexes to draw attention to: the pit that just received a stone, or the two pits a capture emptied
  marked: number[];
  side: MancalaSide;
  // Board index of the pit that was played
  source: number;
  // Version of the match once this move is complete
  version: number;
}

export const opponent = (side: MancalaSide): MancalaSide => (side === 'host' ? 'guest' : 'host');

export const pitIndex = (side: MancalaSide, pit: number): number => (side === 'host' ? pit : pit + PITS + 1);

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) return 'The match changed. We refreshed the board; please try again.';
    if (error.response?.status === 404)
      return 'This match is unavailable. Invitations and guest games are only visible to their players.';
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      const messages = Object.values(data)
        .flat()
        .filter((value) => typeof value === 'string');
      if (messages.length) return messages.join(' ');
    }
  }
  return 'We could not reach the game. Please try again.';
};

export const getPlayerName = (match: MancalaMatch, side: MancalaSide): string =>
  side === 'host' ? match.host.username : (match.guest?.username ?? 'Computer');

/** The side a signed-in member plays, judged by their own account. */
export const getPlayerSide = (match: MancalaMatch, selfId?: number | null): MancalaSide | null => {
  if (!selfId || match.guest_mode) return null;
  if (selfId === match.host.id) return 'host';
  if (selfId === match.guest?.id) return 'guest';
  return null;
};

export const describeMove = (match: MancalaMatch, move: MancalaMove): string => {
  const parts = [
    `${getPlayerName(match, move.side)} sowed ${move.stones} from pit ${move.pit + 1}`,
    move.captured ? `captured ${move.captured}` : '',
    move.extra_turn ? 'plays again' : '',
    move.swept ? 'ended the game' : '',
  ];
  return parts.filter(Boolean).join(' · ');
};

/**
 * The steps that take a board through one move, a stone at a time. Only for showing a move the server already
 * accepted: the last step is always the server's own board.
 */
export const sowingFrames = (board: MancalaBoard, move: MancalaRecentMove): SowingFrame[] => {
  const {side, version} = move;
  const source = pitIndex(side, move.pit);
  const skipped = STORE[opponent(side)];
  const stones = board[source];
  const shared = {side, source, version};
  let current = [...board];
  current[source] = 0;
  const frames: SowingFrame[] = [{...shared, board: current, duration: 260, hand: stones, kind: 'lift', marked: []}];
  // Big pits are sown faster so one move never takes much more than a couple of seconds
  const dropDuration = Math.round(Math.min(240, Math.max(90, 1800 / Math.max(stones, 1))));
  let index = source;
  for (let hand = stones - 1; hand >= 0; hand -= 1) {
    index = (index + 1) % BOARD_SIZE;
    if (index === skipped) index = (index + 1) % BOARD_SIZE;
    current = [...current];
    current[index] += 1;
    frames.push({...shared, board: current, duration: dropDuration, hand, kind: 'drop', marked: [index]});
  }
  if (move.captured) {
    const opposite = 2 * PITS - index;
    current = [...current];
    current[STORE[side]] += current[index] + current[opposite];
    current[index] = 0;
    current[opposite] = 0;
    frames.push({...shared, board: current, duration: 700, hand: 0, kind: 'capture', marked: [index, opposite]});
  }
  if (move.swept) {
    const marked = [STORE.host, STORE.guest];
    frames.push({...shared, board: move.board, duration: 700, hand: 0, kind: 'sweep', marked});
  }
  const last = frames[frames.length - 1];
  frames[frames.length - 1] = {...last, board: move.board, duration: Math.max(last.duration, 450)};
  return frames;
};

/**
 * Moves can arrive faster than they can be shown, for example when watching two quick players. Keeps the newest moves
 * that fit in the time allowed, and always the newest one; the board jumps to where the first kept move starts.
 */
export const trimBacklog = (frames: SowingFrame[], limit: number): SowingFrame[] => {
  let start = frames.length;
  let total = 0;
  while (start > 0) {
    const {version} = frames[start - 1];
    let first = start - 1;
    while (first > 0 && frames[first - 1].version === version) first -= 1;
    const duration = frames.slice(first, start).reduce((sum, frame) => sum + frame.duration, 0);
    if (start < frames.length && total + duration > limit) break;
    total += duration;
    start = first;
  }
  return frames.slice(start);
};
