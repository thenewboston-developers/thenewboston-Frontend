import {useCallback, useEffect, useRef, useState} from 'react';

export type GameSound = 'dice' | 'move' | 'capture' | 'bearOff';

export const BACKGAMMON_SOUND_STORAGE_KEY = 'thenewboston.backgammon.soundEnabled';

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

const SOUNDS: Record<GameSound, Pulse[]> = {
  bearOff: [
    {at: 0, duration: 0.11, frequency: 660, level: 0.7, texture: 0.08},
    {at: 0.065, duration: 0.14, frequency: 880, level: 0.48, texture: 0.04},
  ],
  capture: [
    {at: 0, duration: 0.075, frequency: 390, level: 0.9, texture: 0.3},
    {at: 0.055, duration: 0.09, frequency: 620, level: 0.62, texture: 0.2},
  ],
  dice: [
    {at: 0, duration: 0.05, frequency: 620, level: 0.6, texture: 0.7},
    {at: 0.035, duration: 0.055, frequency: 410, level: 0.75, texture: 0.65},
    {at: 0.08, duration: 0.05, frequency: 760, level: 0.65, texture: 0.7},
    {at: 0.13, duration: 0.06, frequency: 480, level: 0.7, texture: 0.6},
    {at: 0.2, duration: 0.07, frequency: 590, level: 0.5, texture: 0.55},
    {at: 0.29, duration: 0.075, frequency: 440, level: 0.4, texture: 0.5},
  ],
  move: [{at: 0, duration: 0.09, frequency: 520, level: 0.8, texture: 0.22}],
};

const createSoundBuffer = (context: AudioContext, sound: GameSound): AudioBuffer => {
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

const readPreference = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(BACKGAMMON_SOUND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const useGameSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(readPreference);
  const audioContext = useRef<AudioContext | null>(null);
  const buffers = useRef<Partial<Record<GameSound, AudioBuffer>>>({});
  const enabled = useRef(soundEnabled);
  const mounted = useRef(true);
  const unlocked = useRef(false);
  const voices = useRef(new Set<Voice>());

  const playSound = useCallback((sound: GameSound, delayMs = 0) => {
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
      window.localStorage.setItem(BACKGAMMON_SOUND_STORAGE_KEY, String(next));
    } catch {
      // Private browsing or blocked storage still allows a session-only preference.
    }
    if (next) unlockSound();
    else stopSounds();
  }, [stopSounds, unlockSound]);

  useEffect(() => {
    mounted.current = true;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== BACKGAMMON_SOUND_STORAGE_KEY && event.key !== null) return;
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

export default useGameSounds;
