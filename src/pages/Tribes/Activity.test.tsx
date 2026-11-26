import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getTribesActivity} from 'api/tribes';
import {TribesState} from 'types/tribes';

import Activity from './Activity';

jest.mock('api/tribes', () => ({getTribesActivity: jest.fn()}));
(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const stateFor = (userId = 7, seasonId = 1, tribeId = 1) =>
  ({
    season: {id: seasonId},
    viewer: {id: userId, tribe_id: tribeId},
    activity: Array.from({length: 200}, (_, index) => ({
      id: 400 - index,
      tribe_id: tribeId,
      user_id: userId,
      username: 'maya',
      text: `Action ${400 - index}`,
      created_at: '2026-11-26T12:00:00Z',
    })),
  }) as TribesState;
const render = async (state: TribesState) => act(async () => root.render(<Activity state={state} />));
const load = async () => act(async () => (container.querySelector('button') as HTMLButtonElement).click());

beforeEach(() => {
  jest.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('loads older permanent records with the oldest cursor and avoids duplicating overlapping events', async () => {
  const state = stateFor();
  jest.mocked(getTribesActivity).mockResolvedValue({
    results: [state.activity[199], {...state.activity[199], id: 199, text: 'Earlier treasury transfer'}],
    next_before: null,
  });
  await render(state);
  await load();
  expect(getTribesActivity).toHaveBeenCalledWith(1, 201, expect.any(AbortSignal));
  expect(container).toHaveTextContent('Earlier treasury transfer');
  expect(container.querySelectorAll('article')).toHaveLength(201);
  expect(container.querySelector('button')).toBeNull();
  const updated = {
    ...state,
    activity: state.activity.map((entry) => ({...entry, id: entry.id + 200, text: `Action ${entry.id + 200}`})),
  };
  await render(updated);
  expect(container).toHaveTextContent('Action 201');
  expect(container).toHaveTextContent('Earlier treasury transfer');
  expect(container.querySelectorAll('article')).toHaveLength(401);
});

it.each(['account', 'season', 'tribe'])('discards a private history response after the %s changes', async (change) => {
  let resolve!: (value: Awaited<ReturnType<typeof getTribesActivity>>) => void;
  jest.mocked(getTribesActivity).mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  const old = stateFor();
  await render(old);
  await load();
  const fresh = stateFor(change === 'account' ? 8 : 7, change === 'season' ? 2 : 1, change === 'tribe' ? 2 : 1);
  fresh.activity = [];
  await render(fresh);
  await act(async () =>
    resolve({results: [{...old.activity[0], id: 199, text: 'Private old treasury transfer'}], next_before: null}),
  );
  expect(container).not.toHaveTextContent('Private old treasury transfer');
  expect(container).not.toHaveTextContent('Action 400');
});
