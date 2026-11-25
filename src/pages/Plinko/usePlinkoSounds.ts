import {useCallback, useEffect, useRef, useState} from 'react';

export const PLINKO_SOUND_STORAGE_KEY = 'thenewboston.plinko.soundEnabled';

const MAX_VOICES = 8;
const PEG_INTERVAL = 0.045;
type AudioWindow = Window & {webkitAudioContext?: typeof AudioContext};

interface Voice {
  gain: GainNode;
  source: OscillatorNode;
}

const disconnect = (node?: AudioNode) => {
  try {
    node?.disconnect();
  } catch {
    // The browser may already have released the device.
  }
};

const releaseVoice = ({gain, source}: Voice, stop = false) => {
  source.onended = null;
  if (stop) {
    try {
      source.stop();
    } catch {
      // A voice can finish before mute or cleanup reaches it.
    }
  }
  disconnect(source);
  disconnect(gain);
};

const readPreference = () => {
  try {
    return typeof window !== 'undefined' && localStorage.getItem(PLINKO_SOUND_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

// Short synthesized cues, bounded to eight quiet voices even when several balls share the board.
const usePlinkoSounds = () => {
  const [soundEnabled, setSoundEnabled] = useState(readPreference);
  const audioContext = useRef<AudioContext | null>(null);
  const enabled = useRef(soundEnabled);
  const lastPeg = useRef(-Infinity);
  const mounted = useRef(true);
  const unlocked = useRef(false);
  const voices = useRef(new Set<Voice>());

  const playTone = useCallback((frequency: number, duration: number, level: number, offset = 0, drop = false) => {
    const context = audioContext.current;
    // Drop unavailable cues; a later gesture must never replay a hidden or muted ball's events.
    if (
      !mounted.current ||
      !enabled.current ||
      !unlocked.current ||
      document.hidden ||
      context?.state !== 'running' ||
      voices.current.size >= MAX_VOICES
    )
      return;
    let gain: GainNode | undefined;
    let source: OscillatorNode | undefined;
    let voice: Voice | undefined;
    try {
      source = context.createOscillator();
      gain = context.createGain();
      voice = {gain, source};
      const playingVoice = voice;
      const start = context.currentTime + offset;
      source.type = drop ? 'triangle' : 'sine';
      source.frequency.setValueAtTime(frequency, start);
      source.frequency.exponentialRampToValueAtTime(frequency * (drop ? 0.55 : 0.92), start + duration);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(level, start + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      source.connect(gain);
      gain.connect(context.destination);
      source.onended = () => {
        voices.current.delete(playingVoice);
        releaseVoice(playingVoice);
      };
      voices.current.add(voice);
      source.start(start);
      source.stop(start + duration + 0.01);
    } catch {
      if (voice) {
        voices.current.delete(voice);
        releaseVoice(voice, true);
      } else {
        disconnect(source);
        disconnect(gain);
      }
      // Sound is optional; device errors must never interrupt a wager or its animation.
    }
  }, []);

  const playDrop = useCallback(() => playTone(360, 0.12, 0.035, 0, true), [playTone]);

  const playLanding = useCallback(
    (multiplier: number) => {
      if (multiplier > 1) {
        [660, 830, 990].forEach((frequency, index) => playTone(frequency, 0.24, 0.035, index * 0.055));
      } else playTone(330, 0.16, 0.04);
    },
    [playTone],
  );

  const playPeg = useCallback(
    (row = 0) => {
      const context = audioContext.current;
      if (context?.state !== 'running' || context.currentTime - lastPeg.current < PEG_INTERVAL) return;
      lastPeg.current = context.currentTime;
      const boundedRow = Number.isFinite(row) ? Math.max(0, Math.min(11, Math.floor(row))) : 0;
      playTone(900 + boundedRow * 45, 0.065, 0.025);
    },
    [playTone],
  );

  const stopSounds = useCallback(() => {
    voices.current.forEach((voice) => releaseVoice(voice, true));
    voices.current.clear();
    lastPeg.current = -Infinity;
    unlocked.current = false;
    const context = audioContext.current;
    if (context && context.state !== 'closed') {
      try {
        context.suspend().catch(() => undefined);
      } catch {
        // Some devices throw synchronously when unavailable.
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
        lastPeg.current = -Infinity;
      }
      const context = audioContext.current;
      unlocked.current = true;
      if (context.state !== 'running') {
        context
          .resume()
          .then(() => {
            if (!mounted.current || !enabled.current || document.hidden || !unlocked.current) {
              if (context.state !== 'closed') context.suspend().catch(() => undefined);
            }
          })
          .catch(() => undefined);
      }
    } catch {
      // Retain the preference so another user gesture can retry an unavailable device.
    }
  }, []);

  const toggleSound = useCallback(() => {
    const next = !enabled.current;
    enabled.current = next;
    setSoundEnabled(next);
    try {
      localStorage.setItem(PLINKO_SOUND_STORAGE_KEY, String(next));
    } catch {
      // Storage may be blocked; the choice still works for this visit.
    }
    if (next) unlockSound();
    else stopSounds();
  }, [stopSounds, unlockSound]);

  useEffect(() => {
    mounted.current = true;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== PLINKO_SOUND_STORAGE_KEY && event.key !== null) return;
      const next = event.key !== null && event.newValue === 'true';
      enabled.current = next;
      setSoundEnabled(next);
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
      if (context && context.state !== 'closed') {
        try {
          context.close().catch(() => undefined);
        } catch {
          // A closed or unavailable device needs no further cleanup.
        }
      }
    };
  }, [stopSounds, unlockSound]);

  return {playDrop, playLanding, playPeg, soundEnabled, toggleSound, unlockSound};
};

export default usePlinkoSounds;
