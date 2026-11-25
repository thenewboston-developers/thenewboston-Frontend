import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export const ROULETTE_SOUND_STORAGE_KEY = 'thenewboston.roulette.soundEnabled';

type AudioWindow = Window & {webkitAudioContext?: typeof AudioContext};

interface Rig {
  context: AudioContext;
  master: GainNode;
  noise: AudioBuffer;
  roll?: {gain: GainNode; source: AudioBufferSourceNode};
}

const WIN_NOTES = [523.25, 659.25, 783.99, 1046.5];

const readPreference = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(ROULETTE_SOUND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * Table sounds synthesized in the browser: chips, the ball on the track, its clicks over the frets, and a win chime.
 * Nothing is downloaded and nothing plays until the player turns sound on.
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
        master.gain.value = 0.55;
        master.connect(context.destination);
        const noise = context.createBuffer(1, context.sampleRate, context.sampleRate);
        const samples = noise.getChannelData(0);
        let seed = 4271;
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

  // A short band of filtered noise: the click of a chip or of the ball against a fret
  const click = useCallback(
    (frequency: number, duration: number, level: number, delay = 0) => {
      const audio = getRig();
      if (!audio) return;
      const {context, master, noise} = audio;
      const start = context.currentTime + delay;
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      const source = context.createBufferSource();
      filter.frequency.value = frequency;
      filter.Q.value = 7;
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

  const sounds = useMemo(
    () => ({
      chip: () => {
        click(2700, 0.05, 0.5);
        click(1750, 0.07, 0.28, 0.028);
      },
      // The ball clicking over a fret; strength is 0 to 1
      fret: (strength: number) => click(2200 - 500 * strength, 0.035, 0.18 + 0.4 * strength),
      land: () => {
        click(1500, 0.08, 0.55);
        click(1150, 0.1, 0.32, 0.09);
      },
      lose: () => {
        note(196, 0.32, 0.12, 0, 'sine');
        note(155.56, 0.42, 0.1, 0.14, 'sine');
      },
      // The ball running around the track: 0 is silent, 1 is full speed
      roll: (level: number) => {
        const audio = level > 0 ? getRig() : rig.current;
        if (!audio) return;
        const {context, master, noise} = audio;
        if (!audio.roll) {
          if (level <= 0) return;
          const filter = context.createBiquadFilter();
          const gain = context.createGain();
          const source = context.createBufferSource();
          filter.frequency.value = 880;
          filter.Q.value = 0.9;
          filter.type = 'bandpass';
          gain.gain.value = 0;
          source.buffer = noise;
          source.loop = true;
          source.connect(filter).connect(gain).connect(master);
          source.start();
          audio.roll = {gain, source};
        }
        audio.roll.gain.gain.setTargetAtTime(Math.max(0, Math.min(1, level)) * 0.2, context.currentTime, 0.06);
      },
      spin: () => click(520, 0.22, 0.22),
      // A rising chime; larger returns ring longer and higher
      win: (multiplier: number) => {
        const notes =
          multiplier >= 36 ? [...WIN_NOTES, 1318.5, 1568, 2093] : WIN_NOTES.slice(0, multiplier >= 3 ? 4 : 3);
        notes.forEach((frequency, index) => {
          note(frequency, 0.5, 0.2, index * 0.085);
          note(frequency * 2, 0.3, 0.05, index * 0.085, 'sine');
        });
      },
    }),
    [click, getRig, note],
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      const next = !current;
      enabled.current = next;
      try {
        window.localStorage.setItem(ROULETTE_SOUND_STORAGE_KEY, String(next));
      } catch {
        // The preference simply lasts for this visit
      }
      if (!next && rig.current?.roll) rig.current.roll.gain.gain.value = 0;
      return next;
    });
  }, []);

  useEffect(
    () => () => {
      const audio = rig.current;
      rig.current = null;
      if (!audio) return;
      try {
        audio.roll?.source.stop();
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
