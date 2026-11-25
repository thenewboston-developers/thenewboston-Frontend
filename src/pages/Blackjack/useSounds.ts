import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export const BLACKJACK_SOUND_STORAGE_KEY = 'thenewboston.blackjack.soundEnabled';

type AudioWindow = Window & {webkitAudioContext?: typeof AudioContext};

interface Rig {
  context: AudioContext;
  master: GainNode;
  noise: AudioBuffer;
}

const WIN_NOTES = [523.25, 659.25, 783.99, 1046.5];

const readPreference = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(BLACKJACK_SOUND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * Table sounds synthesized in the browser: cards leaving the shoe and turning over, chips, and a chime for a winning
 * hand. Nothing is downloaded and nothing plays until the player turns sound on.
 */
const useSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(readPreference);
  const enabled = useRef(soundEnabled);
  const rig = useRef<Rig | null>(null);
  enabled.current = soundEnabled;

  const getRig = useCallback((): Rig | null => {
    if (!enabled.current || typeof window === 'undefined') return null;
    if (!rig.current) {
      const Context = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
      if (!Context) return null;
      try {
        const context = new Context();
        const master = context.createGain();
        master.gain.value = 0.5;
        master.connect(context.destination);
        const noise = context.createBuffer(1, context.sampleRate, context.sampleRate);
        const samples = noise.getChannelData(0);
        let seed = 7919;
        for (let index = 0; index < samples.length; index += 1) {
          seed = (seed * 16807) % 2147483647;
          samples[index] = (seed / 2147483647) * 2 - 1;
        }
        rig.current = {context, master, noise};
      } catch {
        return null;
      }
    }
    if (rig.current.context.state === 'suspended') rig.current.context.resume().catch(() => undefined);
    return rig.current;
  }, []);

  // A short band of filtered noise: a chip against a chip, or a card snapping onto the felt
  const click = useCallback(
    (frequency: number, duration: number, level: number, delay = 0, sharpness = 7) => {
      const audio = getRig();
      if (!audio) return;
      const {context, master, noise} = audio;
      const start = context.currentTime + delay;
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const source = context.createBufferSource();
      filter.frequency.value = frequency;
      filter.Q.value = sharpness;
      filter.type = 'bandpass';
      gain.gain.setValueAtTime(level, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      source.buffer = noise;
      source.connect(filter).connect(gain).connect(master);
      source.start(start, Math.random() * 0.5, duration + 0.02);
    },
    [getRig],
  );

  const note = useCallback(
    (frequency: number, duration: number, level: number, delay = 0, type: OscillatorType = 'triangle') => {
      const audio = getRig();
      if (!audio) return;
      const {context, master} = audio;
      const start = context.currentTime + delay;
      const gain = context.createGain();
      const oscillator = context.createOscillator();
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(level, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      oscillator.connect(gain).connect(master);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.03);
    },
    [getRig],
  );

  // A card sliding across the felt: a breath of noise that sweeps upward and stops short
  const slide = useCallback(
    (duration: number, level: number) => {
      const audio = getRig();
      if (!audio) return;
      const {context, master, noise} = audio;
      const start = context.currentTime;
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const source = context.createBufferSource();
      filter.frequency.setValueAtTime(1400, start);
      filter.frequency.exponentialRampToValueAtTime(5200, start + duration);
      filter.Q.value = 0.8;
      filter.type = 'bandpass';
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(level, start + duration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      source.buffer = noise;
      source.connect(filter).connect(gain).connect(master);
      source.start(start, Math.random() * 0.5, duration + 0.02);
    },
    [getRig],
  );

  const sounds = useMemo(
    () => ({
      blackjack: () => {
        [...WIN_NOTES, 1318.5, 1568, 2093].forEach((frequency, index) => {
          note(frequency, 0.55, 0.2, index * 0.08);
          note(frequency * 2, 0.32, 0.05, index * 0.08, 'sine');
        });
      },
      bust: () => {
        note(233.08, 0.24, 0.13, 0, 'sine');
        note(174.61, 0.3, 0.12, 0.12, 'sine');
        note(130.81, 0.46, 0.11, 0.26, 'sine');
      },
      card: () => {
        slide(0.16, 0.34);
        click(2400, 0.04, 0.3, 0.15, 3);
      },
      chip: () => {
        click(2700, 0.05, 0.5);
        click(1750, 0.07, 0.28, 0.028);
      },
      // A stack pushed across the felt
      chips: () => {
        [0, 0.05, 0.1, 0.17].forEach((delay, index) => click(2500 - index * 180, 0.05, 0.36, delay));
      },
      flip: () => {
        click(1900, 0.045, 0.34, 0, 4);
        click(3100, 0.04, 0.3, 0.09, 4);
      },
      lose: () => {
        note(196, 0.32, 0.12, 0, 'sine');
        note(155.56, 0.42, 0.1, 0.14, 'sine');
      },
      push: () => {
        note(392, 0.22, 0.11, 0, 'sine');
        note(392, 0.3, 0.1, 0.16, 'sine');
      },
      // The cards of the last hand swept away
      sweep: () => slide(0.26, 0.22),
      win: () => {
        WIN_NOTES.forEach((frequency, index) => {
          note(frequency, 0.5, 0.2, index * 0.085);
          note(frequency * 2, 0.3, 0.05, index * 0.085, 'sine');
        });
      },
    }),
    [click, note, slide],
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      const next = !current;
      enabled.current = next;
      try {
        window.localStorage.setItem(BLACKJACK_SOUND_STORAGE_KEY, String(next));
      } catch {
        // The preference simply lasts for this visit
      }
      return next;
    });
  }, []);

  useEffect(
    () => () => {
      const audio = rig.current;
      rig.current = null;
      if (!audio) return;
      try {
        audio.context.close().catch(() => undefined);
      } catch {
        // The context is already closed
      }
    },
    [],
  );

  return {soundEnabled, sounds, toggleSound};
};

export type TableSounds = ReturnType<typeof useSounds>['sounds'];

export default useSounds;
