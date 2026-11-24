import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import useGameEventSounds from './useGameEventSounds';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

interface Snapshot {
  id: number;
  server_time: string;
  status: string;
  version: number;
}

let api: ReturnType<typeof useGameEventSounds<Snapshot>>;
let container: HTMLDivElement;
let root: Root;
const playSound = jest.fn();
const snapshot = (version: number, overrides: Partial<Snapshot> = {}): Snapshot => ({
  id: 1,
  server_time: new Date().toISOString(),
  status: 'active',
  version,
  ...overrides,
});

const Probe = () => {
  api = useGameEventSounds<Snapshot>(playSound, (before, next) =>
    next.status === 'finished' ? ['move', 'win'] : ['move'],
  );
  return null;
};

beforeEach(async () => {
  jest.useFakeTimers();
  playSound.mockReset();
  container = document.createElement('div');
  root = createRoot(container);
  await act(async () => root.render(<Probe />));
});

afterEach(() => {
  act(() => root.unmount());
  jest.useRealTimers();
});

it('baselines existing history and sounds a fresh move and result once', () => {
  api.observeSoundEvents(snapshot(20));
  expect(playSound).not.toHaveBeenCalled();
  api.observeSoundEvents(snapshot(21, {status: 'finished'}));
  expect(playSound.mock.calls).toEqual([
    ['move', 0],
    ['win', 160],
  ]);
  api.observeSoundEvents(snapshot(21, {status: 'finished'}));
  api.observeSoundEvents(snapshot(20));
  expect(playSound).toHaveBeenCalledTimes(2);
});

it('ignores duplicate, stale and skipped versions while keeping the latest baseline', () => {
  api.observeSoundEvents(snapshot(1));
  api.observeSoundEvents(snapshot(1));
  api.observeSoundEvents(snapshot(0));
  api.observeSoundEvents(snapshot(4));
  expect(playSound).not.toHaveBeenCalled();
  api.observeSoundEvents(snapshot(2));
  api.observeSoundEvents(snapshot(5));
  expect(playSound).toHaveBeenCalledTimes(1);
});

it('treats reconnects and new matches as silent baselines', () => {
  api.observeSoundEvents(snapshot(1));
  api.observeSoundEvents(snapshot(2), true);
  api.resetSoundEvents();
  api.observeSoundEvents(snapshot(3));
  api.observeSoundEvents(snapshot(4, {id: 2}));
  expect(playSound).not.toHaveBeenCalled();
  api.observeSoundEvents(snapshot(5, {id: 2}));
  expect(playSound).toHaveBeenCalledTimes(1);
});

it('does not replay a transition after a long suspension or from a closed match', () => {
  api.observeSoundEvents(snapshot(1));
  jest.advanceTimersByTime(16000);
  api.observeSoundEvents(snapshot(2));
  api.observeSoundEvents(snapshot(3, {status: 'pending'}), true);
  api.observeSoundEvents(snapshot(4));
  expect(playSound).not.toHaveBeenCalled();
});

it('advances past hidden events without playing them after visibility returns', () => {
  const original = Object.getOwnPropertyDescriptor(document, 'hidden');
  api.observeSoundEvents(snapshot(1));
  Object.defineProperty(document, 'hidden', {configurable: true, value: true});
  api.observeSoundEvents(snapshot(2));
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
  api.observeSoundEvents(snapshot(2));
  expect(playSound).not.toHaveBeenCalled();
  api.observeSoundEvents(snapshot(3));
  expect(playSound).toHaveBeenCalledTimes(1);
  if (original) Object.defineProperty(document, 'hidden', original);
  else Reflect.deleteProperty(document, 'hidden');
});
