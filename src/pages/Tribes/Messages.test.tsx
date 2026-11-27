import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getTribesMessages} from 'api/tribes';
import {Tribe, TribesState} from 'types/tribes';

import Messages from './Messages';

jest.mock('api/tribes', () => ({getTribesMessages: jest.fn()}));
(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const tribe = {id: 1, name: 'Iron Wolves', members: []} as unknown as Tribe;
const stateFor = (userId = 7, tournamentId = 1, tribeId = 1) =>
  ({
    tournament: {id: tournamentId, status: 'active', ends_at: '2026-12-01T12:00:00Z'},
    viewer: {id: userId, tribe_id: tribeId},
    tribes: [{...tribe, id: tribeId}],
    messages: Array.from({length: 200}, (_, index) => ({
      id: 101 + index,
      from_tribe_id: tribeId,
      to_tribe_id: tribeId,
      user_id: userId,
      username: 'maya',
      text: `Letter ${101 + index}`,
      created_at: '2026-11-26T12:00:00Z',
    })),
  }) as TribesState;
const render = async (state: TribesState) =>
  act(async () =>
    root.render(
      <Messages
        act={jest.fn()}
        busy={false}
        canPlay
        now={new Date('2026-11-26T12:00:00Z').getTime()}
        state={state}
        tribe={state.tribes[0]}
      />,
    ),
  );
const load = async () =>
  act(async () =>
    Array.from(container.querySelectorAll('button'))
      .find((button) => button.textContent === 'Load earlier correspondence')!
      .click(),
  );

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

it('loads and deduplicates earlier private correspondence in chronological order', async () => {
  const state = stateFor();
  jest.mocked(getTribesMessages).mockResolvedValue({
    results: [state.messages[0], {...state.messages[0], id: 100, text: 'Earlier agreement'}],
    next_before: null,
  });
  await render(state);
  await load();
  expect(getTribesMessages).toHaveBeenCalledWith(1, 101, expect.any(AbortSignal));
  expect(container.querySelectorAll('article')).toHaveLength(201);
  expect(container.querySelector('article')).toHaveTextContent('Earlier agreement');
});

it.each(['account', 'tournament', 'tribe'])('discards private correspondence when the %s changes', async (change) => {
  let resolve!: (value: Awaited<ReturnType<typeof getTribesMessages>>) => void;
  jest.mocked(getTribesMessages).mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  const old = stateFor();
  await render(old);
  await load();
  const fresh = stateFor(change === 'account' ? 8 : 7, change === 'tournament' ? 2 : 1, change === 'tribe' ? 2 : 1);
  fresh.messages = [];
  await render(fresh);
  await act(async () =>
    resolve({results: [{...old.messages[0], id: 100, text: 'Secret old agreement'}], next_before: null}),
  );
  expect(container).not.toHaveTextContent('Secret old agreement');
  expect(container).not.toHaveTextContent('Letter 101');
});
