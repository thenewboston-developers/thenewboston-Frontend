import {useCallback, useEffect, useRef, useState} from 'react';

export type SlotSound = 'anticipation' | 'big' | 'click' | 'jackpot' | 'nice' | 'push' | 'spin' | 'stop' | 'win';

export const SLOTS_SOUND_STORAGE_KEY = 'thenewboston.slots.soundEnabled';

type Wave = 'bell' | 'noise' | 'sine' | 'triangle';

interface Tone {
  at: number;
  // Seconds for the level to fall to about a third; long tones ring, short ones knock.
  decay: number;
  duration: number;
  frequency: number;
  level: number;
  sweepTo?: number;
  wave: Wave;
}

interface Voice {
  gain: GainNode;
  source: AudioBufferSourceNode;
}

type AudioWindow = Window & {webkitAudioContext?: typeof AudioContext};

const NOTES = {C6: 1046.5, E6: 1318.5, G6: 1568, C7: 2093, E7: 2637, G5: 784, C5: 523.25, E5: 659.25};

const arpeggio = (frequencies: number[], start: number, gap: number, level = 0.5): Tone[] =>
  frequencies.map((frequency, index) => ({
    at: start + index * gap,
    decay: 0.32,
    duration: 0.6,
    frequency,
    level,
    wave: 'bell',
  }));

const coinShower = (count: number, start: number, span: number): Tone[] =>
  Array.from({length: count}, (_, index) => ({
    at: start + ((index * 7919) % 1000) * (span / 1000),
    decay: 0.08,
    duration: 0.22,
    frequency: 2300 + ((index * 104729) % 1300),
    level: 0.18,
    wave: 'bell' as const,
  }));

// Locally synthesized casino cues: no media downloads, nothing plays until the player turns sound on.
const SOUNDS: Record<SlotSound, Tone[]> = {
  anticipation: [
    {at: 0, decay: 3, duration: 1.15, frequency: 220, level: 0.35, sweepTo: 880, wave: 'triangle'},
    {at: 0, decay: 3, duration: 1.15, frequency: 330, level: 0.18, sweepTo: 1320, wave: 'sine'},
  ],
  big: [
    ...arpeggio([NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6], 0, 0.1, 0.45),
    ...arpeggio([NOTES.E6, NOTES.G6, NOTES.C7], 0.45, 0.09, 0.42),
    {at: 0.75, decay: 0.9, duration: 1.3, frequency: NOTES.C6, level: 0.3, wave: 'triangle'},
    ...coinShower(10, 0.3, 1.1),
  ],
  click: [{at: 0, decay: 0.02, duration: 0.05, frequency: 1800, level: 0.3, wave: 'triangle'}],
  jackpot: [
    ...arpeggio([NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C6, NOTES.E6, NOTES.G6, NOTES.C7], 0, 0.085, 0.45),
    {at: 0.62, decay: 1.6, duration: 2.2, frequency: NOTES.C6, level: 0.3, wave: 'triangle'},
    {at: 0.62, decay: 1.6, duration: 2.2, frequency: NOTES.E6, level: 0.22, wave: 'triangle'},
    {at: 0.62, decay: 1.6, duration: 2.2, frequency: NOTES.G6, level: 0.2, wave: 'triangle'},
    ...arpeggio([NOTES.G6, NOTES.C7, NOTES.E7], 1.25, 0.1, 0.38),
    ...coinShower(26, 0.4, 2.4),
  ],
  nice: [...arpeggio([NOTES.C6, NOTES.E6, NOTES.G6, NOTES.C7], 0, 0.09, 0.45), ...coinShower(5, 0.25, 0.5)],
  push: [{at: 0, decay: 0.35, duration: 0.55, frequency: NOTES.G5, level: 0.32, wave: 'bell'}],
  spin: [
    {at: 0, decay: 0.05, duration: 0.11, frequency: 190, level: 0.55, sweepTo: 80, wave: 'triangle'},
    {at: 0.02, decay: 0.25, duration: 0.38, frequency: 500, level: 0.22, sweepTo: 2600, wave: 'noise'},
  ],
  stop: [
    {at: 0, decay: 0.045, duration: 0.1, frequency: 150, level: 0.7, sweepTo: 70, wave: 'triangle'},
    {at: 0, decay: 0.02, duration: 0.05, frequency: 1400, level: 0.22, wave: 'noise'},
  ],
  win: arpeggio([NOTES.C6, NOTES.E6, NOTES.G6], 0, 0.09, 0.45),
};

const createSoundBuffer = (context: AudioContext, sound: SlotSound): AudioBuffer => {
  const tones = SOUNDS[sound];
  const rate = context.sampleRate;
  const duration = Math.max(...tones.map((tone) => tone.at + tone.duration));
  const buffer = context.createBuffer(1, Math.ceil(rate * duration), rate);
  const samples = buffer.getChannelData(0);
  let seed = 9277;
  tones.forEach((tone) => {
    const start = Math.floor(tone.at * rate);
    const length = Math.floor(tone.duration * rate);
    let phase = 0;
    let filtered = 0;
    for (let index = 0; index < length && start + index < samples.length; index += 1) {
      const time = index / rate;
      const progress = time / tone.duration;
      const frequency = tone.sweepTo ? tone.frequency * (tone.sweepTo / tone.frequency) ** progress : tone.frequency;
      phase += (2 * Math.PI * frequency) / rate;
      let value: number;
      if (tone.wave === 'noise') {
        seed = (seed * 16807) % 2147483647;
        const noise = (seed / 2147483647) * 2 - 1;
        // One-pole low-pass: the sweep opens the filter like air rushing past the reels.
        const coefficient = 1 - Math.exp((-2 * Math.PI * frequency) / rate);
        filtered += coefficient * (noise - filtered);
        value = filtered * 1.6;
      } else if (tone.wave === 'bell') {
        value = Math.sin(phase) + 0.45 * Math.sin(phase * 2.76) + 0.22 * Math.sin(phase * 5.4);
        value *= 0.6;
      } else if (tone.wave === 'triangle') {
        value = (2 / Math.PI) * Math.asin(Math.sin(phase));
      } else {
        value = Math.sin(phase);
      }
      const envelope =
        Math.min(1, time / 0.004) * Math.exp(-time / tone.decay) * Math.min(1, (tone.duration - time) / 0.012);
      samples[start + index] += tone.level * envelope * value;
    }
  });
  return buffer;
};

const disconnectVoice = ({gain, source}: Voice) => {
  source.onended = null;
  try {
    source.disconnect();
    gain.disconnect();
  } catch {
    // Audio resources may already have been released by the browser.
  }
};

const readPreference = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(SLOTS_SOUND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const useSlotSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(readPreference);
  const audioContext = useRef<AudioContext | null>(null);
  const buffers = useRef<Partial<Record<SlotSound, AudioBuffer>>>({});
  const enabled = useRef(soundEnabled);
  const mounted = useRef(true);
  const unlocked = useRef(false);
  const voices = useRef(new Set<Voice>());

  const playSound = useCallback((sound: SlotSound) => {
    const context = audioContext.current;
    // Never queue audio while locked or hidden: a later gesture must not replay old events.
    if (!mounted.current || !enabled.current || !unlocked.current || document.hidden || context?.state !== 'running')
      return;
    let voice: Voice | undefined;
    try {
      const buffer = buffers.current[sound] ?? createSoundBuffer(context, sound);
      buffers.current[sound] = buffer;
      const gain = context.createGain();
      const source = context.createBufferSource();
      voice = {gain, source};
      const playingVoice = voice;
      voices.current.add(voice);
      gain.gain.setValueAtTime(0.22, context.currentTime);
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(context.destination);
      source.onended = () => {
        voices.current.delete(playingVoice);
        disconnectVoice(playingVoice);
      };
      source.start();
    } catch {
      if (voice) {
        voices.current.delete(voice);
        disconnectVoice(voice);
      }
      // An unavailable audio device must never interrupt a spin.
    }
  }, []);

  const stopSounds = useCallback(() => {
    voices.current.forEach((voice) => {
      try {
        voice.source.stop();
      } catch {
        // A source can finish between the mute action and this cleanup.
      }
      disconnectVoice(voice);
    });
    voices.current.clear();
    unlocked.current = false;
    const context = audioContext.current;
    if (context && context.state !== 'closed') {
      try {
        context.suspend().catch(() => undefined);
      } catch {
        // Older Web Audio implementations may throw synchronously.
      }
    }
  }, []);

  const unlockSound = useCallback(() => {
    if (!mounted.current || !enabled.current || document.hidden) return;
    try {
      if (!audioContext.current || audioContext.current.state === 'closed') {
        const Context = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
        if (!Context) return;
        audioContext.current = new Context();
        buffers.current = {};
      }
      const context = audioContext.current;
      unlocked.current = true;
      if (context.state !== 'running') {
        context
          .resume()
          .then(() => {
            // A pending resume can resolve after mute, a hidden tab, or unmount.
            if (!mounted.current || !enabled.current || document.hidden || !unlocked.current) {
              if (context.state !== 'closed') context.suspend().catch(() => undefined);
            }
          })
          .catch(() => undefined);
      }
    } catch {
      // Keep the preference; another user gesture may be able to enable audio.
    }
  }, []);

  const toggleSound = useCallback(() => {
    const next = !enabled.current;
    enabled.current = next;
    setSoundEnabled(next);
    try {
      window.localStorage.setItem(SLOTS_SOUND_STORAGE_KEY, String(next));
    } catch {
      // Private browsing or blocked storage still allows a session-only preference.
    }
    if (next) unlockSound();
    else stopSounds();
  }, [stopSounds, unlockSound]);

  useEffect(() => {
    mounted.current = true;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== SLOTS_SOUND_STORAGE_KEY && event.key !== null) return;
      const next = event.key !== null && event.newValue === 'true';
      enabled.current = next;
      setSoundEnabled(next);
      // Changes from another tab never count as this page's audio-unlock gesture.
      stopSounds();
    };
    const handleVisibility = () => {
      if (document.hidden) stopSounds();
    };
    document.addEventListener('keydown', unlockSound);
    document.addEventListener('pointerdown', unlockSound);
    document.addEventListener('touchend', unlockSound);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('storage', handleStorage);
    return () => {
      mounted.current = false;
      document.removeEventListener('keydown', unlockSound);
      document.removeEventListener('pointerdown', unlockSound);
      document.removeEventListener('touchend', unlockSound);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('storage', handleStorage);
      stopSounds();
      const context = audioContext.current;
      audioContext.current = null;
      buffers.current = {};
      if (context && context.state !== 'closed') {
        try {
          context.close().catch(() => undefined);
        } catch {
          // A device or browser may have already closed the context.
        }
      }
    };
  }, [stopSounds, unlockSound]);

  return {playSound, soundEnabled, toggleSound, unlockSound};
};

export default useSlotSounds;
