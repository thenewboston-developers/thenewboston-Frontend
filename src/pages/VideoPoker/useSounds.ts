import {useCallback, useMemo, useRef, useState} from 'react';

export const VIDEO_POKER_SOUND_STORAGE_KEY = 'thenewboston.videoPoker.soundEnabled';

type AudioWindow = Window & {webkitAudioContext?: typeof AudioContext};

const readPreference = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(VIDEO_POKER_SOUND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * The square-wave beeps of an old cabinet, synthesized in the browser. Nothing is downloaded and nothing plays until
 * the player turns sound on.
 */
const useSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(readPreference);
  const context = useRef<AudioContext | null>(null);
  const enabled = useRef(soundEnabled);
  enabled.current = soundEnabled;

  const beep = useCallback((frequency: number, duration = 0.06, delay = 0, volume = 0.05) => {
    if (!enabled.current || typeof window === 'undefined') return;
    try {
      if (!context.current) {
        const Context = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
        if (!Context) return;
        context.current = new Context();
      }
      const audio = context.current;
      if (audio.state === 'suspended') audio.resume().catch(() => undefined);
      const start = audio.currentTime + delay;
      const gain = audio.createGain();
      const oscillator = audio.createOscillator();
      oscillator.type = 'square';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.02);
    } catch {
      /* Sound is decoration; the game never depends on it. */
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((previous) => {
      try {
        window.localStorage.setItem(VIDEO_POKER_SOUND_STORAGE_KEY, String(!previous));
      } catch {
        /* The preference simply does not persist. */
      }
      return !previous;
    });
  }, []);

  const sounds = useMemo(
    () => ({
      bet: () => beep(880, 0.05),
      card: () => beep(1320, 0.03, 0, 0.035),
      credit: () => beep(1568, 0.04, 0, 0.04),
      hold: (held: boolean) => beep(held ? 660 : 440, 0.05),
      lose: () => [392, 330, 262].forEach((note, index) => beep(note, 0.12, index * 0.12, 0.04)),
      win: () => [523, 659, 784, 1047, 1319].forEach((note, index) => beep(note, 0.1, index * 0.09)),
    }),
    [beep],
  );

  return {soundEnabled, sounds, toggleSound};
};

export default useSounds;
