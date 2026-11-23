import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import SoundToggle from './SoundToggle';
import useGameSounds, {BACKGAMMON_SOUND_STORAGE_KEY} from './useGameSounds';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

interface TestSource {
  buffer: AudioBuffer | null;
  connect: jest.Mock;
  disconnect: jest.Mock;
  onended: (() => void) | null;
  start: jest.Mock;
  stop: jest.Mock;
}

interface TestGain {
  connect: jest.Mock;
  disconnect: jest.Mock;
  gain: {setValueAtTime: jest.Mock};
}

interface TestContext {
  close: jest.Mock;
  createBuffer: jest.Mock;
  createBufferSource: jest.Mock;
  createGain: jest.Mock;
  currentTime: number;
  destination: object;
  gains: TestGain[];
  resume: jest.Mock;
  sampleRate: number;
  sources: TestSource[];
  state: AudioContextState;
  suspend: jest.Mock;
}

let api: ReturnType<typeof useGameSounds>;
let container: HTMLDivElement;
let contexts: TestContext[];
let hidden: boolean;
let root: Root;
const originalHidden = Object.getOwnPropertyDescriptor(document, 'hidden');
const originalContext = Object.getOwnPropertyDescriptor(window, 'AudioContext');
const originalWebkitContext = Object.getOwnPropertyDescriptor(window, 'webkitAudioContext');

const createContext = () => {
  const context: TestContext = {
    close: jest.fn(() => {
      context.state = 'closed';
      return Promise.resolve();
    }),
    createBuffer: jest.fn((channels: number, length: number, rate: number) => {
      const samples = new Float32Array(length);
      return {duration: length / rate, getChannelData: () => samples};
    }),
    createBufferSource: jest.fn(() => {
      const source: TestSource = {
        buffer: null,
        connect: jest.fn(),
        disconnect: jest.fn(),
        onended: null,
        start: jest.fn(),
        stop: jest.fn(),
      };
      context.sources.push(source);
      return source;
    }),
    createGain: jest.fn(() => {
      const gain = {connect: jest.fn(), disconnect: jest.fn(), gain: {setValueAtTime: jest.fn()}};
      context.gains.push(gain);
      return gain;
    }),
    currentTime: 10,
    destination: {},
    gains: [],
    resume: jest.fn(() => {
      context.state = 'running';
      return Promise.resolve();
    }),
    sampleRate: 12000,
    sources: [],
    state: 'suspended',
    suspend: jest.fn(() => {
      context.state = 'suspended';
      return Promise.resolve();
    }),
  };
  contexts.push(context);
  return context;
};

const Context = jest.fn(createContext);

const Probe = () => {
  api = useGameSounds();
  return <SoundToggle onToggle={api.toggleSound} soundEnabled={api.soundEnabled} />;
};

const render = async () => {
  await act(async () => root.render(<Probe />));
};

const toggle = async () => {
  await act(async () => container.querySelector('button')!.click());
};

beforeEach(() => {
  contexts = [];
  hidden = false;
  Context.mockImplementation(createContext);
  localStorage.clear();
  Object.defineProperty(window, 'AudioContext', {configurable: true, value: Context});
  Object.defineProperty(window, 'webkitAudioContext', {configurable: true, value: undefined});
  Object.defineProperty(document, 'hidden', {configurable: true, get: () => hidden});
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

afterAll(() => {
  if (originalContext) Object.defineProperty(window, 'AudioContext', originalContext);
  else Reflect.deleteProperty(window, 'AudioContext');
  if (originalWebkitContext) Object.defineProperty(window, 'webkitAudioContext', originalWebkitContext);
  else Reflect.deleteProperty(window, 'webkitAudioContext');
  if (originalHidden) Object.defineProperty(document, 'hidden', originalHidden);
  else Reflect.deleteProperty(document, 'hidden');
});

describe('optional backgammon sounds', () => {
  it('starts silent without constructing an audio context and exposes an accessible toggle', async () => {
    await render();
    expect(api.soundEnabled).toBe(false);
    expect(container.querySelector('button')).toHaveAttribute('aria-label', 'Game sound');
    expect(container.querySelector('button')).toHaveAttribute('aria-pressed', 'false');
    expect(container.textContent).toContain('Sound off');
    api.playSound('dice');
    api.unlockSound();
    expect(Context).not.toHaveBeenCalled();
  });

  it('persists the choice and plays short synthesized sounds after a user gesture', async () => {
    await render();
    await toggle();
    expect(localStorage.getItem(BACKGAMMON_SOUND_STORAGE_KEY)).toBe('true');
    expect(container.querySelector('button')).toHaveAttribute('aria-pressed', 'true');
    expect(container.textContent).toContain('Sound on');
    expect(contexts[0].sources).toHaveLength(0);
    api.playSound('dice');
    api.playSound('move');
    api.playSound('capture');
    api.playSound('bearOff');
    expect(contexts[0].sources).toHaveLength(4);
    contexts[0].sources.forEach((source) => {
      expect(source.start).toHaveBeenCalledWith(10);
      expect(source.buffer!.duration).toBeGreaterThan(0);
      expect(source.buffer!.duration).toBeLessThan(0.5);
      expect(Array.from(source.buffer!.getChannelData(0)).some((sample) => sample !== 0)).toBe(true);
    });
    expect(contexts[0].gains[0].gain.setValueAtTime).toHaveBeenCalledWith(0.2, 10);
  });

  it('requires a fresh gesture for a remembered on preference and never replays dropped events', async () => {
    localStorage.setItem(BACKGAMMON_SOUND_STORAGE_KEY, 'true');
    await render();
    expect(api.soundEnabled).toBe(true);
    api.playSound('dice');
    expect(Context).not.toHaveBeenCalled();
    await act(async () => document.dispatchEvent(new Event('pointerdown')));
    expect(contexts[0].resume).toHaveBeenCalled();
    expect(contexts[0].sources).toHaveLength(0);
    api.playSound('move');
    expect(contexts[0].sources).toHaveLength(1);
  });

  it('mutes active and scheduled sounds immediately', async () => {
    await render();
    await toggle();
    api.playSound('dice');
    api.playSound('bearOff', 500);
    expect(contexts[0].sources[1].start).toHaveBeenCalledWith(10.5);
    await toggle();
    contexts[0].sources.forEach((source) => {
      expect(source.stop).toHaveBeenLastCalledWith();
      expect(source.disconnect).toHaveBeenCalled();
      expect(source.onended).toBeNull();
    });
    expect(localStorage.getItem(BACKGAMMON_SOUND_STORAGE_KEY)).toBe('false');
    api.playSound('move');
    expect(contexts[0].sources).toHaveLength(2);
  });

  it('stops sound when hidden and drops hidden events until another gesture', async () => {
    await render();
    await toggle();
    api.playSound('dice', 250);
    hidden = true;
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(contexts[0].sources[0].stop).toHaveBeenLastCalledWith();
    api.playSound('move');
    hidden = false;
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    api.playSound('capture');
    expect(contexts[0].sources).toHaveLength(1);
    await act(async () => document.dispatchEvent(new Event('keydown')));
    expect(contexts[0].sources).toHaveLength(1);
    api.playSound('bearOff');
    expect(contexts[0].sources).toHaveLength(2);
  });

  it('syncs storage changes across tabs without unlocking audio automatically', async () => {
    await render();
    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {key: BACKGAMMON_SOUND_STORAGE_KEY, newValue: 'true'}));
    });
    expect(api.soundEnabled).toBe(true);
    api.playSound('move');
    expect(Context).not.toHaveBeenCalled();
    await act(async () => api.unlockSound());
    api.playSound('move');
    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {key: BACKGAMMON_SOUND_STORAGE_KEY, newValue: 'false'}));
    });
    expect(api.soundEnabled).toBe(false);
    expect(contexts[0].sources[0].stop).toHaveBeenLastCalledWith();
    act(() => window.dispatchEvent(new StorageEvent('storage', {key: 'unrelated', newValue: 'true'})));
    expect(api.soundEnabled).toBe(false);
  });

  it('treats clearing storage in another tab as sound off', async () => {
    await render();
    await toggle();
    act(() => window.dispatchEvent(new StorageEvent('storage', {key: null})));
    expect(api.soundEnabled).toBe(false);
  });

  it('supports Safari-prefixed AudioContext', async () => {
    Object.defineProperty(window, 'AudioContext', {configurable: true, value: undefined});
    Object.defineProperty(window, 'webkitAudioContext', {configurable: true, value: Context});
    await render();
    await toggle();
    api.playSound('move');
    expect(contexts[0].sources).toHaveLength(1);
  });

  it('works without an audio implementation or available persistent storage', async () => {
    Object.defineProperty(window, 'AudioContext', {configurable: true, value: undefined});
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    await render();
    expect(api.soundEnabled).toBe(false);
    await toggle();
    expect(api.soundEnabled).toBe(true);
    expect(() => api.playSound('dice')).not.toThrow();
    await toggle();
    expect(api.soundEnabled).toBe(false);
  });

  it('ignores device errors without interrupting a game', async () => {
    await render();
    await toggle();
    contexts[0].createBuffer.mockImplementation(() => {
      throw new Error('Device unavailable');
    });
    expect(() => api.playSound('move')).not.toThrow();
    contexts[0].resume.mockRejectedValue(new Error('Playback denied'));
    contexts[0].state = 'suspended';
    await act(async () => api.unlockSound());
    expect(() => api.playSound('capture')).not.toThrow();
  });

  it('does not replay audio when a pending resume resolves after mute', async () => {
    localStorage.setItem(BACKGAMMON_SOUND_STORAGE_KEY, 'true');
    await render();
    await act(async () => api.unlockSound());
    let resolveResume: () => void = () => undefined;
    contexts[0].state = 'suspended';
    contexts[0].resume.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveResume = () => {
            contexts[0].state = 'running';
            resolve();
          };
        }),
    );
    act(() => api.unlockSound());
    api.playSound('dice');
    await toggle();
    await act(async () => resolveResume());
    expect(contexts[0].state).toBe('suspended');
    expect(contexts[0].sources).toHaveLength(0);
  });

  it('releases finished nodes and closes audio resources on unmount', async () => {
    await render();
    await toggle();
    api.playSound('move');
    contexts[0].sources[0].onended!();
    expect(contexts[0].sources[0].disconnect).toHaveBeenCalled();
    api.playSound('dice', 500);
    await act(async () => root.unmount());
    expect(contexts[0].sources[1].stop).toHaveBeenLastCalledWith();
    expect(contexts[0].close).toHaveBeenCalledTimes(1);
    expect(() => api.playSound('move')).not.toThrow();
    expect(contexts[0].sources).toHaveLength(2);
    root = createRoot(container);
  });

  it('keeps callbacks stable when the preference changes', async () => {
    await render();
    const previous = api;
    await toggle();
    expect(api.playSound).toBe(previous.playSound);
    expect(api.toggleSound).toBe(previous.toggleSound);
    expect(api.unlockSound).toBe(previous.unlockSound);
  });
});
