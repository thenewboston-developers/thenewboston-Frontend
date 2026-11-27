import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getTribesState, performTribesAction} from 'api/tribes';
import {TribesState} from 'types/tribes';

import {errorMessage, useTribes} from './useTribes';

jest.mock('api/tribes', () => ({
  getTribesState: jest.fn(),
  performTribesAction: jest.fn(),
}));
jest.mock('axios', () => ({isAxiosError: (error: {isAxiosError?: boolean}) => !!error?.isAxiosError}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
const requestId = '549f17a4-6395-4de1-91d7-e8c86bb5d56a';
const snapshot = {
  tournament: {id: 1, status: 'active', starts_at: '2026-11-26T12:00:00Z', ends_at: '2026-12-03T12:00:00Z'},
  server_time: '2026-11-26T13:00:00Z',
  viewer: {id: 1, wallet_balance: 1000},
} as TribesState;
let api: ReturnType<typeof useTribes>;
let container: HTMLDivElement;
let observedViewers: (number | undefined)[];
let root: Root;

const Probe = ({userId = 1}: {userId?: number | null}) => {
  api = useTribes(userId, 1);
  observedViewers.push(api.state?.viewer?.id);
  return null;
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  observedViewers = [];
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => requestId}});
  jest.mocked(getTribesState).mockResolvedValue(snapshot);
  jest.mocked(performTribesAction).mockResolvedValue(snapshot);
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

test('a confirmed gameplay permission rejection releases its receipt and allows another action', async () => {
  await act(async () => root.render(<Probe />));
  jest.mocked(performTribesAction).mockRejectedValueOnce({
    isAxiosError: true,
    response: {
      status: 403,
      data: {code: 'tribes_action_forbidden', detail: 'Only the current controller can change this unit.'},
    },
  });
  await act(async () => {
    await api.act('deploy', {unit_id: 10, plot_id: 1, target_id: null});
  });
  expect(api.pending).toBeNull();
  expect(api.busy).toBe(false);
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).toBeNull();
  expect(api.error).toBe('Only the current controller can change this unit.');
  await act(async () => {
    expect(await api.act('treasury_deposit', {amount: 1})).toBe(true);
  });
  expect(performTribesAction).toHaveBeenCalledTimes(2);
});

test('an unmarked authentication or proxy 403 preserves an uncertain receipt', async () => {
  await act(async () => root.render(<Probe />));
  jest.mocked(performTribesAction).mockRejectedValueOnce({
    isAxiosError: true,
    response: {status: 403, data: {detail: {code: 'not_authenticated', message: 'Sign in again.'}}},
  });
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(api.pending?.request_id).toBe(requestId);
  expect(api.busy).toBe(true);
  expect(api.error).toBe('Sign in again.');
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).not.toBeNull();
});

test('a successful refresh clears a recovered read error', async () => {
  await act(async () => root.render(<Probe />));
  jest.mocked(getTribesState).mockRejectedValueOnce({isAxiosError: true});
  await act(async () => {
    await api.refresh();
  });
  expect(api.error).toContain('connection was interrupted');
  await act(async () => {
    await api.refresh();
  });
  expect(api.error).toBe('');
});

test('successful polling does not erase the explanation for a rejected action', async () => {
  await act(async () => root.render(<Probe />));
  jest.mocked(performTribesAction).mockRejectedValueOnce({
    isAxiosError: true,
    response: {status: 400, data: [{code: 'invalid', message: 'Not enough iron ingot.'}]},
  });
  await act(async () => {
    await api.act('queue', {kind: 'craft', item: 'catapult', quantity: 1, plot_id: 1});
  });
  await act(async () => {
    await api.refresh();
  });
  expect(api.error).toBe('Not enough iron ingot.');
});

test('account switches never expose the previous private state even before effects run', async () => {
  await act(async () => root.render(<Probe />));
  expect(api.state?.viewer?.id).toBe(1);
  observedViewers = [];
  jest.mocked(getTribesState).mockResolvedValue({...snapshot, viewer: null});
  await act(async () => root.render(<Probe userId={null} />));
  expect(observedViewers.length).toBeGreaterThan(0);
  expect(observedViewers.every((viewer) => viewer === undefined)).toBe(true);
  expect(api.state?.viewer).toBeNull();
});

test.each([
  [[{code: 'invalid', message: 'Insufficient TNB in your app wallet.'}], 'Insufficient TNB in your app wallet.'],
  [
    {detail: {code: 'permission_denied', message: 'Only the captain can change the tribe emblem.'}},
    'Only the captain can change the tribe emblem.',
  ],
  [{quantity: [{code: 'invalid', message: 'Quantity must be a whole number.'}]}, 'Quantity must be a whole number.'],
  [{detail: 'This tournament has ended.'}, 'This tournament has ended.'],
])('displays the API error message from %j', (data, expected) => {
  expect(errorMessage({isAxiosError: true, response: {status: 400, data}})).toBe(expected);
});
