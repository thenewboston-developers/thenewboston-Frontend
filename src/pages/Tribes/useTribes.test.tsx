import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getTribesSeasons, getTribesState, performTribesAction} from 'api/tribes';
import {TribesState} from 'types/tribes';

import {useTribes} from './useTribes';

jest.mock('api/tribes', () => ({
  getTribesSeasons: jest.fn(),
  getTribesState: jest.fn(),
  performTribesAction: jest.fn(),
}));
jest.mock('axios', () => ({isAxiosError: (error: {isAxiosError?: boolean}) => !!error?.isAxiosError}));
(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const getState = getTribesState as jest.MockedFunction<typeof getTribesState>;
const getSeasons = getTribesSeasons as jest.MockedFunction<typeof getTribesSeasons>;
const postAction = performTribesAction as jest.MockedFunction<typeof performTribesAction>;
const requestId = '9f5a7200-4297-4f6e-98c6-714bc3e36c29';
const snapshot = (balance: number, userId = 1) =>
  ({
    season: {id: 1, status: 'active', starts_at: '2026-11-26T12:00:00Z', ends_at: '2026-12-03T12:00:00Z'},
    server_time: '2026-11-26T13:00:00Z',
    viewer: {id: userId, wallet_balance: balance},
  }) as TribesState;
const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return {promise, resolve};
};
let api: ReturnType<typeof useTribes>;
let container: HTMLDivElement;
let root: Root;
const Probe = ({userId = 1}: {userId?: number}) => {
  api = useTribes(userId);
  return null;
};
const render = async (userId = 1) => {
  await act(async () => root.render(<Probe userId={userId} />));
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  localStorage.clear();
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => requestId}});
  getState.mockResolvedValue(snapshot(1000));
  getSeasons.mockResolvedValue([]);
  postAction.mockResolvedValue(snapshot(900));
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test('a rapid double click sends one payment request', async () => {
  await render();
  const response = deferred<TribesState>();
  postAction.mockReturnValue(response.promise);
  let first!: Promise<boolean>;
  await act(async () => {
    first = api.act('treasury_deposit', {amount: 100});
    expect(await api.act('treasury_deposit', {amount: 100})).toBe(false);
  });
  expect(postAction).toHaveBeenCalledTimes(1);
  expect(JSON.parse(localStorage.getItem('tribes:pending:1')!)).toMatchObject({request_id: requestId, amount: 100});
  await act(async () => {
    response.resolve(snapshot(900));
    await first;
  });
  expect(localStorage.getItem('tribes:pending:1')).toBeNull();
});

test('a read begun before a payment cannot overwrite its completed result', async () => {
  await render();
  const oldRead = deferred<TribesState>();
  const afterPayment = deferred<TribesState>();
  getState.mockReturnValueOnce(oldRead.promise).mockReturnValueOnce(afterPayment.promise);
  let refresh!: Promise<void>;
  await act(async () => {
    refresh = api.refresh();
  });
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(api.state?.viewer?.wallet_balance).toBe(900);
  await act(async () => {
    oldRead.resolve(snapshot(1000));
    await refresh;
  });
  expect(api.state?.viewer?.wallet_balance).toBe(900);
  await act(async () => {
    afterPayment.resolve(snapshot(900));
  });
});

test('out-of-order polls keep the newer response', async () => {
  await render();
  const older = deferred<TribesState>();
  const newer = deferred<TribesState>();
  getState.mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);
  let first!: Promise<void>;
  let second!: Promise<void>;
  await act(async () => {
    first = api.refresh();
    second = api.refresh();
  });
  await act(async () => {
    newer.resolve(snapshot(600));
    await second;
  });
  await act(async () => {
    older.resolve(snapshot(800));
    await first;
  });
  expect(api.state?.viewer?.wallet_balance).toBe(600);
});

test('an interrupted payment survives remount and retries its exact receipt', async () => {
  await render();
  postAction.mockRejectedValueOnce({isAxiosError: true});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  const payload = postAction.mock.calls[0][0];
  expect(api.pending).toEqual(payload);
  await act(async () => root.unmount());
  root = createRoot(container);
  await render();
  expect(api.busy).toBe(true);
  await act(async () => {
    await api.retry();
  });
  expect(postAction.mock.calls[1][0]).toEqual(payload);
  expect(api.pending).toBeNull();
});

test('an authentication failure preserves an uncertain receipt for authenticated replay', async () => {
  await render();
  postAction.mockRejectedValueOnce({isAxiosError: true, response: {status: 401, data: {}}});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(api.pending?.request_id).toBe(requestId);
  expect(localStorage.getItem('tribes:pending:1')).not.toBeNull();
});

test('a definitive action rejection releases its receipt', async () => {
  await render();
  postAction.mockRejectedValueOnce({isAxiosError: true, response: {status: 400, data: {detail: 'Insufficient TNB.'}}});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(api.pending).toBeNull();
  expect(api.error).toBe('Insufficient TNB.');
  expect(localStorage.getItem('tribes:pending:1')).toBeNull();
});

test('account switching drops old responses and leaves no private state behind', async () => {
  await render();
  const oldPayment = deferred<TribesState>();
  postAction.mockReturnValueOnce(oldPayment.promise);
  let payment!: Promise<boolean>;
  await act(async () => {
    payment = api.act('treasury_deposit', {amount: 100});
  });
  getState.mockResolvedValue(snapshot(2000, 2));
  await render(2);
  expect(api.state?.viewer?.id).toBe(2);
  await act(async () => {
    oldPayment.resolve(snapshot(900));
    expect(await payment).toBe(false);
  });
  expect(api.state?.viewer?.id).toBe(2);
  expect(api.state?.viewer?.wallet_balance).toBe(2000);
  expect(api.pending).toBeNull();
});

test('a payment is not sent when the browser cannot persist a receipt', async () => {
  await render();
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('storage unavailable');
  });
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(postAction).not.toHaveBeenCalled();
  expect(api.error).toContain('cannot save a transaction receipt');
});

test('malformed saved data is never submitted as a payment', async () => {
  localStorage.setItem('tribes:pending:1', '{"request_id":"invalid","amount":100}');
  await render();
  expect(api.pending).toBeNull();
  await act(async () => {
    await api.retry();
  });
  expect(postAction).not.toHaveBeenCalled();
});
