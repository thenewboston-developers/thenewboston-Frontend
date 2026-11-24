import {useEffect, useRef} from 'react';

import {ConnectFiveMatchStatus} from 'enums';
import useArcadeSounds from 'hooks/useArcadeSounds';
import {ConnectFiveMatch} from 'types';
import {isOlderConnectFiveMatch} from 'utils/connectFive';

const useMatchSounds = (match: ConnectFiveMatch | null | undefined, ready: boolean, viewerId?: number | null) => {
  const previous = useRef<{match: ConnectFiveMatch; ready: boolean; viewerId?: number | null} | null>(null);
  const sounds = useArcadeSounds('connect_five');
  const {playSound, soundEnabled} = sounds;

  useEffect(() => {
    const reset = () => {
      previous.current = null;
    };
    // A page restored from the background or an offline connection starts with a fresh baseline.
    document.addEventListener('visibilitychange', reset);
    window.addEventListener('offline', reset);
    window.addEventListener('online', reset);
    return () => {
      document.removeEventListener('visibilitychange', reset);
      window.removeEventListener('offline', reset);
      window.removeEventListener('online', reset);
    };
  }, []);

  useEffect(() => {
    if (!match) {
      previous.current = null;
      return;
    }
    const last = previous.current;
    const sameViewer = last?.match.id === match.id && last.viewerId === viewerId;
    if (sameViewer && isOlderConnectFiveMatch(last.match, match)) return;
    previous.current = {match, ready, viewerId};
    if (!sameViewer || !ready || !last.ready || !soundEnabled || document.hidden || !navigator.onLine) return;
    if (last.match.status !== ConnectFiveMatchStatus.ACTIVE) return;
    const finished =
      match.status !== ConnectFiveMatchStatus.ACTIVE && match.status !== ConnectFiveMatchStatus.CANCELLED;
    const turns = match.turn_number - last.match.turn_number;
    // Polling/reconnect snapshots can contain several past moves. Never narrate that catch-up as a fresh action.
    if (turns !== 1 && !(finished && turns === 0)) return;
    if (match.mode === 'computer' && match.version !== last.match.version + 1) return;
    let added = 0;
    let removed = 0;
    const placedColors = new Set<number>();
    match.board_state.forEach((row, y) =>
      row.forEach((value, x) => {
        const before = last.match.board_state[y]?.[x];
        if (before === value) return;
        if (value === 0) removed += 1;
        else {
          added += 1;
          placedColors.add(value);
        }
      }),
    );
    if (removed && !added) playSound('bomb');
    else if (!removed && placedColors.size === 1 && added === 2) playSound('double');
    else if (!removed && added === 1) playSound('move');
    const won = match.mode === 'computer' ? match.winner_side === 'a' : viewerId != null && match.winner === viewerId;
    if (finished && won) playSound('win', added || removed ? 180 : 0);
  }, [match, playSound, ready, soundEnabled, viewerId]);

  return sounds;
};

export default useMatchSounds;
