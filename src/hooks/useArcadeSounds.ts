import {useCallback, useEffect, useRef, useState} from 'react';

export type ArcadeGame = 'checkers' | 'reversi' | 'hex' | 'mancala' | 'dots_and_boxes' | 'connect_five';
export type ArcadeSound =
  | 'move'
  | 'capture'
  | 'win'
  | 'swap'
  | 'flip'
  | 'claim'
  | 'sow'
  | 'extraTurn'
  | 'promote'
  | 'bomb'
  | 'double';

export const getArcadeSoundStorageKey = (game: ArcadeGame) => `thenewboston.${game}.soundEnabled`;

interface Pulse {
  at: number;
  duration: number;
  frequency: number;
  level: number;
  texture: number;
}

interface Voice {
  gain: GainNode;
  source: AudioBufferSourceNode;
}

type AudioWindow = Window & {webkitAudioContext?: typeof AudioContext};

// Small synthesized percussion and musical cues keep every game self-contained.
const SOUNDS: Record<ArcadeSound, Pulse[]> = {
  bomb: [
    {at: 0, duration: 0.3, frequency: 75, level: 0.85, texture: 0.78},
    {at: 0.08, duration: 0.25, frequency: 130, level: 0.45, texture: 0.55},
  ],
  capture: [
    {at: 0, duration: 0.08, frequency: 350, level: 0.8, texture: 0.3},
    {at: 0.06, duration: 0.1, frequency: 620, level: 0.55, texture: 0.15},
  ],
  claim: [
    {at: 0, duration: 0.12, frequency: 660, level: 0.65, texture: 0.03},
    {at: 0.07, duration: 0.16, frequency: 880, level: 0.5, texture: 0.03},
  ],
  double: [
    {at: 0, duration: 0.09, frequency: 420, level: 0.7, texture: 0.2},
    {at: 0.07, duration: 0.1, frequency: 560, level: 0.65, texture: 0.2},
  ],
  extraTurn: [
    {at: 0, duration: 0.12, frequency: 520, level: 0.6, texture: 0.03},
    {at: 0.09, duration: 0.16, frequency: 780, level: 0.55, texture: 0.03},
  ],
  flip: [
    {at: 0, duration: 0.07, frequency: 310, level: 0.7, texture: 0.32},
    {at: 0.045, duration: 0.08, frequency: 470, level: 0.5, texture: 0.25},
    {at: 0.09, duration: 0.09, frequency: 590, level: 0.35, texture: 0.18},
  ],
  move: [{at: 0, duration: 0.09, frequency: 520, level: 0.75, texture: 0.22}],
  promote: [
    {at: 0, duration: 0.15, frequency: 660, level: 0.6, texture: 0.02},
    {at: 0.08, duration: 0.16, frequency: 830, level: 0.5, texture: 0.02},
    {at: 0.16, duration: 0.2, frequency: 990, level: 0.45, texture: 0.02},
  ],
  sow: [
    {at: 0, duration: 0.055, frequency: 620, level: 0.6, texture: 0.45},
    {at: 0.045, duration: 0.06, frequency: 450, level: 0.5, texture: 0.4},
    {at: 0.09, duration: 0.07, frequency: 750, level: 0.4, texture: 0.35},
  ],
  swap: [
    {at: 0, duration: 0.14, frequency: 440, level: 0.55, texture: 0.08},
    {at: 0.08, duration: 0.18, frequency: 660, level: 0.5, texture: 0.04},
  ],
  win: [
    {at: 0, duration: 0.22, frequency: 523.25, level: 0.55, texture: 0.01},
    {at: 0.12, duration: 0.22, frequency: 659.25, level: 0.5, texture: 0.01},
    {at: 0.24, duration: 0.22, frequency: 783.99, level: 0.5, texture: 0.01},
    {at: 0.36, duration: 0.28, frequency: 1046.5, level: 0.5, texture: 0.01},
  ],
};

const createSoundBuffer = (context: AudioContext, sound: ArcadeSound): AudioBuffer => {
  const pulses = SOUNDS[sound];
  const duration = Math.max(...pulses.map((pulse) => pulse.at + pulse.duration));
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const samples = buffer.getChannelData(0);
  let seed = 8271;
  pulses.forEach((pulse) => {
    const start = Math.floor(pulse.at * context.sampleRate);
    const length = Math.floor(pulse.duration * context.sampleRate);
    for (let index = 0; index < length && start + index < samples.length; index += 1) {
      const time = index / context.sampleRate;
      seed = (seed * 16807) % 2147483647;
      const noise = (seed / 2147483647) * 2 - 1;
      const envelope =
        Math.min(1, time / 0.0015) *
        Math.exp((-5 * time) / pulse.duration) *
        Math.min(1, (pulse.duration - time) / 0.006);
      const tone = Math.sin(2 * Math.PI * pulse.frequency * time);
      const overtone = Math.sin(2 * Math.PI * pulse.frequency * 1.48 * time) * 0.18;
      samples[start + index] +=
        pulse.level * envelope * ((tone + overtone) * (1 - pulse.texture) + noise * pulse.texture);
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

const readPreference = (storageKey: string): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(storageKey) === 'true';
  } catch {
    return false;
  }
};

const useArcadeSounds = (game: ArcadeGame) => {
  const storageKey = getArcadeSoundStorageKey(game);
  const [soundEnabled, setSoundEnabled] = useState(() => readPreference(storageKey));
  const audioContext = useRef<AudioContext | null>(null);
  const buffers = useRef<Partial<Record<ArcadeSound, AudioBuffer>>>({});
  const enabled = useRef(soundEnabled);
  const mounted = useRef(true);
  const unlocked = useRef(false);
  const voices = useRef(new Set<Voice>());

  const playSound = useCallback((sound: ArcadeSound, delayMs = 0) => {
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
      gain.gain.setValueAtTime(0.2, context.currentTime);
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(context.destination);
      source.onended = () => {
        voices.current.delete(playingVoice);
        disconnectVoice(playingVoice);
      };
      const start = context.currentTime + Math.max(0, Math.min(Number.isFinite(delayMs) ? delayMs : 0, 1000)) / 1000;
      source.start(start);
      source.stop(start + buffer.duration);
    } catch {
      if (voice) {
        voices.current.delete(voice);
        disconnectVoice(voice);
      }
      // An unavailable audio device must never interrupt a game action.
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
      window.localStorage.setItem(storageKey, String(next));
    } catch {
      // Private browsing or blocked storage still allows a session-only preference.
    }
    if (next) unlockSound();
    else stopSounds();
  }, [storageKey, stopSounds, unlockSound]);

  useEffect(() => {
    mounted.current = true;
    const preference = readPreference(storageKey);
    enabled.current = preference;
    setSoundEnabled(preference);
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
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
  }, [storageKey, stopSounds, unlockSound]);

  return {playSound, soundEnabled, toggleSound, unlockSound};
};

export default useArcadeSounds;
