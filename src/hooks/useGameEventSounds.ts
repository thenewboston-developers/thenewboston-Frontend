import {useCallback, useRef} from 'react';

import {ArcadeSound} from './useArcadeSounds';

interface SoundSnapshot {
  id: number;
  server_time: string;
  status: string;
  version: number;
}

// An accepted snapshot advances the baseline even when muted or hidden. A reconnect,
// version gap or old response never turns a backlog of game history into new sounds.
const useGameEventSounds = <T extends SoundSnapshot>(
  playSound: (sound: ArcadeSound, delayMs?: number) => void,
  getSounds: (previous: T, next: T) => ArcadeSound[],
) => {
  const previous = useRef<{data: T; receivedAt: number} | null>(null);
  const soundsForTransition = useRef(getSounds);
  soundsForTransition.current = getSounds;

  const observeSoundEvents = useCallback(
    (data: T, silent = false) => {
      const before = previous.current;
      if (before?.data.id === data.id && before.data.version > data.version) return;
      if (
        before?.data.id === data.id &&
        before.data.version === data.version &&
        Date.parse(before.data.server_time) > Date.parse(data.server_time)
      )
        return;
      previous.current = {data, receivedAt: Date.now()};
      if (
        silent ||
        document.hidden ||
        !before ||
        before.data.id !== data.id ||
        before.data.status !== 'active' ||
        data.version !== before.data.version + 1 ||
        Date.now() - before.receivedAt > 15000
      )
        return;
      soundsForTransition.current(before.data, data).forEach((sound, index) => playSound(sound, index * 160));
    },
    [playSound],
  );

  const resetSoundEvents = useCallback(() => {
    previous.current = null;
  }, []);

  return {observeSoundEvents, resetSoundEvents};
};

export default useGameEventSounds;
