import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import usePlinkoSounds, {PLINKO_SOUND_STORAGE_KEY} from './usePlinkoSounds';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

interface TestSource {
  connect: jest.Mock;
  disconnect: jest.Mock;
  frequency: {exponentialRampToValueAtTime: jest.Mock; setValueAtTime: jest.Mock};
  onended: (() => void) | null;
  start: jest.Mock;
  stop: jest.Mock;
  type: OscillatorType;
}

interface TestGain {
  connect: jest.Mock;
  disconnect: jest.Mock;
  gain: {exponentialRampToValueAtTime: jest.Mock; linearRampToValueAtTime: jest.Mock; setValueAtTime: jest.Mock};
}

interface TestContext {
  close: jest.Mock;
  createGain: jest.Mock;
  createOscillator: jest.Mock;
  currentTime: number;
  destination: object;
  gains: TestGain[];
  resume: jest.Mock;
  sources: TestSource[];
  state: AudioContextState;
  suspend: jest.Mock;
}

let api: ReturnType<typeof usePlinkoSounds>;
let container: HTMLDivElement;
let contexts: TestContext[];
let hidden: boolean;
let root: Root;
const originalContext = Object.getOwnPropertyDescriptor(window, 'AudioContext');
const originalHidden = Object.getOwnPropertyDescriptor(document, 'hidden');
const originalWebkitContext = Object.getOwnPropertyDescriptor(window, 'webkitAudioContext');

const createContext = () => {
  const context: TestContext = {
    close: jest.fn(() => {
      context.state = 'closed';
      return Promise.resolve();
    }),
    createGain: jest.fn(() => {
      const gain: TestGain = {
        connect: jest.fn(),
        disconnect: jest.fn(),
        gain: {
          exponentialRampToValueAtTime: jest.fn(),
          linearRampToValueAtTime: jest.fn(),
          setValueAtTime: jest.fn(),
        },
      };
      context.gains.push(gain);
      return gain;
    }),
    createOscillator: jest.fn(() => {
      const source: TestSource = {
        connect: jest.fn(),
        disconnect: jest.fn(),
        frequency: {exponentialRampToValueAtTime: jest.fn(), setValueAtTime: jest.fn()},
        onended: null,
        start: jest.fn(),
        stop: jest.fn(),
        type: 'sine',
      };
      context.sources.push(source);
      return source;
    }),
    currentTime: 10,
    destination: {},
    gains: [],
    resume: jest.fn(() => {
      context.state = 'running';
      return Promise.resolve();
    }),
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
  api = usePlinkoSounds();
  return null;
};
const render = async () => {
  await act(async () => root.render(<Probe />));
};
const toggle = async () => {
  await act(async () => api.toggleSound());
};

beforeEach(() => {
  jest.clearAllMocks();
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
  if (originalHidden) Object.defineProperty(document, 'hidden', originalHidden);
  else Reflect.deleteProperty(document, 'hidden');
  if (originalWebkitContext) Object.defineProperty(window, 'webkitAudioContext', originalWebkitContext);
  else Reflect.deleteProperty(window, 'webkitAudioContext');
});

it('defaults to sound off without creating audio resources', async () => {
  await render();
  expect(api.soundEnabled).toBe(false);
  api.unlockSound();
  api.playDrop();
  api.playPeg(1);
  api.playLanding(50);
  expect(Context).not.toHaveBeenCalled();
});

it('persists the choice and synthesizes distinct quiet drop, peg, landing and winning cues', async () => {
  await render();
  await toggle();
  expect(api.soundEnabled).toBe(true);
  expect(localStorage.getItem(PLINKO_SOUND_STORAGE_KEY)).toBe('true');
  expect(contexts[0].sources).toHaveLength(0);
  api.playDrop();
  api.playPeg(4);
  api.playLanding(1);
  api.playLanding(3);
  const {gains, sources} = contexts[0];
  expect(sources).toHaveLength(6);
  expect(sources[0].type).toBe('triangle');
  expect(sources.map((source) => source.frequency.setValueAtTime.mock.calls[0][0])).toEqual([
    360, 1080, 330, 660, 830, 990,
  ]);
  sources.forEach((source) => {
    expect(source.start.mock.calls[0][0]).toBeGreaterThanOrEqual(10);
    expect(source.stop.mock.calls[0][0] - source.start.mock.calls[0][0]).toBeLessThan(0.3);
  });
  gains.forEach((gain) => expect(gain.gain.linearRampToValueAtTime.mock.calls[0][0]).toBeLessThanOrEqual(0.04));
});

it('requires a gesture for a remembered preference without replaying missed cues', async () => {
  localStorage.setItem(PLINKO_SOUND_STORAGE_KEY, 'true');
  await render();
  expect(api.soundEnabled).toBe(true);
  api.playDrop();
  api.playLanding(50);
  expect(Context).not.toHaveBeenCalled();
  await act(async () => document.dispatchEvent(new Event('pointerdown')));
  expect(contexts[0].resume).toHaveBeenCalled();
  expect(contexts[0].sources).toHaveLength(0);
  api.playPeg(0);
  expect(contexts[0].sources).toHaveLength(1);
});

it('caps overlapping voices at eight and reuses capacity only after a voice ends', async () => {
  await render();
  await toggle();
  for (let index = 0; index < 24; index += 1) api.playDrop();
  expect(contexts[0].sources).toHaveLength(8);
  const first = contexts[0].sources[0];
  first.onended!();
  expect(first.disconnect).toHaveBeenCalled();
  expect(contexts[0].gains[0].disconnect).toHaveBeenCalled();
  api.playDrop();
  api.playDrop();
  expect(contexts[0].sources).toHaveLength(9);
  expect(contexts[0].sources.filter((source) => source.onended !== null)).toHaveLength(8);
});

it('throttles peg chatter across simultaneous balls without queuing it', async () => {
  await render();
  await toggle();
  for (let row = 0; row < 12; row += 1) api.playPeg(row);
  expect(contexts[0].sources).toHaveLength(1);
  contexts[0].currentTime = 10.02;
  api.playPeg(3);
  expect(contexts[0].sources).toHaveLength(1);
  contexts[0].currentTime = 10.05;
  api.playPeg(4);
  expect(contexts[0].sources).toHaveLength(2);
  expect(contexts[0].sources[1].frequency.setValueAtTime).toHaveBeenCalledWith(1080, 10.05);
});

it('immediately mutes active and scheduled win tones', async () => {
  await render();
  await toggle();
  api.playDrop();
  api.playLanding(50);
  expect(contexts[0].sources[3].start).toHaveBeenCalledWith(10.11);
  await toggle();
  expect(localStorage.getItem(PLINKO_SOUND_STORAGE_KEY)).toBe('false');
  contexts[0].sources.forEach((source) => {
    expect(source.stop).toHaveBeenLastCalledWith();
    expect(source.disconnect).toHaveBeenCalled();
    expect(source.onended).toBeNull();
  });
  expect(contexts[0].suspend).toHaveBeenCalled();
  api.playLanding(50);
  expect(contexts[0].sources).toHaveLength(4);
});

it('stops hidden-tab sounds and requires a fresh gesture when the tab returns', async () => {
  await render();
  await toggle();
  api.playPeg(0);
  hidden = true;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(contexts[0].sources[0].stop).toHaveBeenLastCalledWith();
  api.playDrop();
  hidden = false;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  api.playLanding(3);
  expect(contexts[0].sources).toHaveLength(1);
  await act(async () => document.dispatchEvent(new Event('keydown')));
  expect(contexts[0].sources).toHaveLength(1);
  api.playPeg(0);
  expect(contexts[0].sources).toHaveLength(2);
});

it('syncs preferences across tabs without treating storage events as audio gestures', async () => {
  await render();
  act(() => window.dispatchEvent(new StorageEvent('storage', {key: PLINKO_SOUND_STORAGE_KEY, newValue: 'true'})));
  expect(api.soundEnabled).toBe(true);
  api.playDrop();
  expect(Context).not.toHaveBeenCalled();
  await act(async () => api.unlockSound());
  api.playDrop();
  act(() => window.dispatchEvent(new StorageEvent('storage', {key: 'other', newValue: 'false'})));
  expect(api.soundEnabled).toBe(true);
  act(() => window.dispatchEvent(new StorageEvent('storage', {key: null})));
  expect(api.soundEnabled).toBe(false);
  expect(contexts[0].sources[0].stop).toHaveBeenLastCalledWith();
});

it('releases nodes, closes the context and ignores stale callbacks after unmount', async () => {
  await render();
  await toggle();
  api.playLanding(18);
  act(() => root.render(null));
  contexts[0].sources.forEach((source) => expect(source.stop).toHaveBeenLastCalledWith());
  expect(contexts[0].close).toHaveBeenCalledTimes(1);
  await act(async () => document.dispatchEvent(new Event('pointerdown')));
  api.unlockSound();
  api.playDrop();
  expect(Context).toHaveBeenCalledTimes(1);
  expect(contexts[0].sources).toHaveLength(3);
});

it('keeps every integration callback stable across preference changes', async () => {
  await render();
  const previous = api;
  await toggle();
  expect(api.playDrop).toBe(previous.playDrop);
  expect(api.playPeg).toBe(previous.playPeg);
  expect(api.playLanding).toBe(previous.playLanding);
  expect(api.toggleSound).toBe(previous.toggleSound);
  expect(api.unlockSound).toBe(previous.unlockSound);
});

it('supports Safari-prefixed audio contexts', async () => {
  Object.defineProperty(window, 'AudioContext', {configurable: true, value: undefined});
  Object.defineProperty(window, 'webkitAudioContext', {configurable: true, value: Context});
  await render();
  await toggle();
  api.playDrop();
  expect(contexts[0].sources).toHaveLength(1);
});

it('keeps a session preference when storage or Web Audio is unavailable', async () => {
  Object.defineProperty(window, 'AudioContext', {configurable: true, value: undefined});
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Blocked storage');
  });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Blocked storage');
  });
  await render();
  expect(api.soundEnabled).toBe(false);
  await toggle();
  expect(api.soundEnabled).toBe(true);
  expect(() => api.playDrop()).not.toThrow();
  await toggle();
  expect(api.soundEnabled).toBe(false);
});

it('contains constructor, resume and partial voice creation failures', async () => {
  Context.mockImplementationOnce(() => {
    throw new Error('Device unavailable');
  });
  await render();
  await toggle();
  expect(api.soundEnabled).toBe(true);
  await act(async () => api.unlockSound());
  const context = contexts[0];
  context.createGain.mockImplementationOnce(() => {
    throw new Error('Cannot allocate gain');
  });
  expect(() => api.playDrop()).not.toThrow();
  expect(context.sources[0].disconnect).toHaveBeenCalled();
  api.playDrop();
  expect(context.sources[1].start).toHaveBeenCalled();
  context.state = 'suspended';
  context.resume.mockRejectedValue(new Error('Playback denied'));
  await act(async () => api.unlockSound());
  expect(() => api.playLanding(3)).not.toThrow();
  expect(context.sources).toHaveLength(2);
});

it('contains failures after a voice has connected and releases its capacity', async () => {
  await render();
  await toggle();
  const context = contexts[0];
  const createOscillator = context.createOscillator.getMockImplementation()!;
  context.createOscillator.mockImplementationOnce(() => {
    const source = createOscillator() as TestSource;
    source.start.mockImplementation(() => {
      throw new Error('Playback unavailable');
    });
    return source;
  });
  expect(() => api.playDrop()).not.toThrow();
  expect(context.sources[0].onended).toBeNull();
  expect(context.sources[0].disconnect).toHaveBeenCalled();
  expect(context.gains[0].disconnect).toHaveBeenCalled();
  for (let index = 0; index < 8; index += 1) api.playDrop();
  expect(context.sources).toHaveLength(9);
});

it('does not play delayed cues when resume resolves after muting', async () => {
  await render();
  await toggle();
  const context = contexts[0];
  let resolveResume = () => undefined;
  context.state = 'suspended';
  context.resume.mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        resolveResume = () => {
          context.state = 'running';
          resolve();
        };
      }),
  );
  act(() => api.unlockSound());
  api.playDrop();
  await toggle();
  await act(async () => resolveResume());
  expect(context.state).toBe('suspended');
  expect(context.sources).toHaveLength(0);
});
