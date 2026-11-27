import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getTribesState, performTribesAction, uploadTribeEmblem} from 'api/tribes';
import {TribesState} from 'types/tribes';

import {useTribes} from './useTribes';

jest.mock('api/tribes', () => ({
  getTribesState: jest.fn(),
  performTribesAction: jest.fn(),
  uploadTribeEmblem: jest.fn(),
}));
jest.mock('axios', () => ({isAxiosError: (error: {isAxiosError?: boolean}) => !!error?.isAxiosError}));
(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const getState = getTribesState as jest.MockedFunction<typeof getTribesState>;
const postAction = performTribesAction as jest.MockedFunction<typeof performTribesAction>;
const postEmblem = uploadTribeEmblem as jest.MockedFunction<typeof uploadTribeEmblem>;
const requestId = '9f5a7200-4297-4f6e-98c6-714bc3e36c29';
const snapshot = (balance: number, userId = 1, tournamentId = 1) =>
  ({
    tournament: {
      id: tournamentId,
      status: 'active',
      starts_at: '2026-11-26T12:00:00Z',
      ends_at: '2026-12-03T12:00:00Z',
    },
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
let observedTournaments: (number | undefined)[] = [];
const Probe = ({userId = 1, tournamentId = 1}: {userId?: number; tournamentId?: number}) => {
  api = useTribes(userId, tournamentId);
  observedTournaments.push(api.state?.tournament.id);
  return null;
};
const render = async (userId = 1, tournamentId = 1) => {
  await act(async () => root.render(<Probe tournamentId={tournamentId} userId={userId} />));
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  localStorage.clear();
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => requestId}});
  getState.mockResolvedValue(snapshot(1000));
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
  expect(JSON.parse(localStorage.getItem('tribes:tournaments:pending:1:1')!)).toMatchObject({
    request_id: requestId,
    amount: 100,
  });
  // An action that is still on its way is pending, but there is nothing to warn the player about yet
  expect(api.pending?.request_id).toBe(requestId);
  expect(api.busy).toBe(true);
  expect(api.unconfirmed).toBe(false);
  await act(async () => {
    response.resolve(snapshot(900));
    await first;
  });
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).toBeNull();
  expect(api.unconfirmed).toBe(false);
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
  expect(api.unconfirmed).toBe(true);
  await act(async () => root.unmount());
  root = createRoot(container);
  await render();
  expect(api.busy).toBe(true);
  expect(api.unconfirmed).toBe(true);
  // The warning stays up while the retry is on its way, and goes once the receipt is confirmed
  const retried = deferred<TribesState>();
  postAction.mockReturnValueOnce(retried.promise);
  let retry!: Promise<boolean>;
  await act(async () => {
    retry = api.retry();
  });
  expect(api.retrying).toBe(true);
  expect(api.unconfirmed).toBe(true);
  await act(async () => {
    retried.resolve(snapshot(900));
    await retry;
  });
  expect(postAction.mock.calls[1][0]).toEqual(payload);
  expect(api.pending).toBeNull();
  expect(api.unconfirmed).toBe(false);
});

test('an authentication failure preserves an uncertain receipt for authenticated replay', async () => {
  await render();
  postAction.mockRejectedValueOnce({isAxiosError: true, response: {status: 401, data: {}}});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(api.pending?.request_id).toBe(requestId);
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).not.toBeNull();
});

test('a definitive action rejection releases its receipt', async () => {
  await render();
  postAction.mockRejectedValueOnce({isAxiosError: true, response: {status: 400, data: {detail: 'Insufficient TNB.'}}});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  expect(api.pending).toBeNull();
  expect(api.unconfirmed).toBe(false);
  expect(api.error).toBe('Insufficient TNB.');
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).toBeNull();
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
  localStorage.setItem('tribes:tournaments:pending:1:1', '{"request_id":"invalid","amount":100}');
  await render();
  expect(api.pending).toBeNull();
  await act(async () => {
    await api.retry();
  });
  expect(postAction).not.toHaveBeenCalled();
});

test('an emblem upload shows the state it returns and never leaves a receipt behind', async () => {
  await render();
  const image = new File(['picture'], 'emblem.png', {type: 'image/png'});
  const response = deferred<TribesState>();
  postEmblem.mockReturnValue(response.promise);
  let upload!: Promise<boolean>;
  await act(async () => {
    upload = api.uploadEmblem(image);
  });
  expect(api.busy).toBe(true);
  expect(postEmblem).toHaveBeenCalledWith(1, image);
  // A second upload and a payment both wait for the first request
  await act(async () => {
    expect(await api.uploadEmblem(image)).toBe(false);
    expect(await api.act('treasury_deposit', {amount: 100})).toBe(false);
  });
  expect(postEmblem).toHaveBeenCalledTimes(1);
  expect(postAction).not.toHaveBeenCalled();
  // The follow-up read is left unanswered, so what shows is the state the upload itself returned
  getState.mockReturnValue(deferred<TribesState>().promise);
  await act(async () => {
    response.resolve(snapshot(750));
    expect(await upload).toBe(true);
  });
  expect(api.state?.viewer?.wallet_balance).toBe(750);
  expect(api.busy).toBe(false);
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).toBeNull();
});

test('a refused emblem reports the reason and leaves the game usable', async () => {
  await render();
  postEmblem.mockRejectedValue({
    isAxiosError: true,
    response: {
      data: {image: [{code: 'invalid', message: 'Image must be exactly 512x512 pixels. Got 64x64.'}]},
      status: 400,
    },
  });
  await act(async () => {
    expect(await api.uploadEmblem(new File(['picture'], 'emblem.png'))).toBe(false);
  });
  expect(api.error).toBe('Image must be exactly 512x512 pixels. Got 64x64.');
  expect(api.busy).toBe(false);
  expect(api.pending).toBeNull();
  await act(async () => {
    expect(await api.act('treasury_deposit', {amount: 100})).toBe(true);
  });
});

test('tournament switches hide the previous world before effects run and reject late polls', async () => {
  await render();
  const oldRead = deferred<TribesState>();
  getState.mockReturnValueOnce(oldRead.promise);
  let refresh!: Promise<void>;
  await act(async () => {
    refresh = api.refresh();
  });
  getState.mockResolvedValue(snapshot(2000, 1, 2));
  observedTournaments = [];
  await render(1, 2);
  expect(getState).toHaveBeenLastCalledWith(2, expect.any(AbortSignal));
  expect(observedTournaments.every((id) => id === undefined || id === 2)).toBe(true);
  await act(async () => {
    oldRead.resolve(snapshot(100));
    await refresh;
  });
  expect(api.state?.tournament.id).toBe(2);
  expect(api.state?.viewer?.wallet_balance).toBe(2000);
});

test('each tournament retains its own interrupted action and retries only the selected receipt', async () => {
  await render();
  postAction.mockRejectedValueOnce({isAxiosError: true});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 100});
  });
  const first = postAction.mock.calls[0][0];
  getState.mockResolvedValue(snapshot(1000, 1, 2));
  await render(1, 2);
  expect(api.pending).toBeNull();
  postAction.mockRejectedValueOnce({isAxiosError: true});
  await act(async () => {
    await api.act('treasury_deposit', {amount: 20});
  });
  const second = postAction.mock.calls[1][0];
  expect(first.tournament_id).toBe(1);
  expect(second.tournament_id).toBe(2);
  expect(JSON.parse(localStorage.getItem('tribes:tournaments:pending:1:1')!)).toEqual(first);
  expect(JSON.parse(localStorage.getItem('tribes:tournaments:pending:1:2')!)).toEqual(second);
  getState.mockResolvedValue(snapshot(1000));
  await render();
  expect(api.pending).toEqual(first);
  await act(async () => {
    await api.retry();
  });
  expect(postAction).toHaveBeenLastCalledWith(first);
  expect(localStorage.getItem('tribes:tournaments:pending:1:1')).toBeNull();
  expect(JSON.parse(localStorage.getItem('tribes:tournaments:pending:1:2')!)).toEqual(second);
});

test('a completed action from a previous tournament cannot replace the selected world', async () => {
  await render();
  const response = deferred<TribesState>();
  postAction.mockReturnValueOnce(response.promise);
  let payment!: Promise<boolean>;
  await act(async () => {
    payment = api.act('treasury_deposit', {amount: 100});
  });
  getState.mockResolvedValue(snapshot(2000, 1, 2));
  await render(1, 2);
  await act(async () => {
    response.resolve(snapshot(900));
    expect(await payment).toBe(false);
  });
  expect(api.state?.tournament.id).toBe(2);
  expect(api.state?.viewer?.wallet_balance).toBe(2000);
  expect(api.pending).toBeNull();
});

test('retired receipts and receipts filed under the wrong tournament are never replayed', async () => {
  const legacy = {action: 'treasury_deposit', amount: 100, season_id: 1, request_id: requestId};
  localStorage.setItem('tribes:pending:1', JSON.stringify(legacy));
  localStorage.setItem('tribes:tournaments:pending:1:1', JSON.stringify(legacy));
  await render();
  expect(api.pending).toBeNull();
  await act(async () => {
    await api.retry();
  });
  expect(postAction).not.toHaveBeenCalled();
  localStorage.setItem(
    'tribes:tournaments:pending:1:2',
    JSON.stringify({action: 'queue', tournament_id: 1, request_id: requestId}),
  );
  getState.mockResolvedValue(snapshot(1000, 1, 2));
  await render(1, 2);
  expect(api.pending).toBeNull();
  await act(async () => {
    await api.retry();
  });
  expect(postAction).not.toHaveBeenCalled();
});

test('a late emblem upload cannot update a different tournament', async () => {
  await render();
  const response = deferred<TribesState>();
  postEmblem.mockReturnValueOnce(response.promise);
  let upload!: Promise<boolean>;
  await act(async () => {
    upload = api.uploadEmblem(new File(['picture'], 'emblem.png'));
  });
  getState.mockResolvedValue(snapshot(2000, 1, 2));
  await render(1, 2);
  await act(async () => {
    response.resolve(snapshot(900));
    expect(await upload).toBe(false);
  });
  expect(api.state?.tournament.id).toBe(2);
  expect(api.busy).toBe(false);
});
