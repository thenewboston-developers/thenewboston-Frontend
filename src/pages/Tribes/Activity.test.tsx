import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getTribesActivity} from 'api/tribes';
import {TribesState} from 'types/tribes';

import Activity, {reword} from './Activity';

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

it('rewords records that still carry internal account codes and leaves every other record alone', () => {
  const state = {
    ...stateFor(),
    tribes: [
      {
        id: 1,
        members: [
          {id: 7, username: 'maya'},
          {id: 8, username: 'alex'},
        ],
        name: 'Iron Wolves',
      },
      {id: 2, members: [], name: 'Golden Owls'},
    ],
  } as unknown as TribesState;
  const shown = (text: string) => reword({...state.activity[0], text}, state);
  expect(shown('Transferred 30 iron_ore to Iron Wolves (tribe, player 7).')).toBe(
    'Stored 30 iron ore in the warehouse.',
  );
  expect(shown('Transferred 12 timber to Iron Wolves (personal, player 7).')).toBe('Took 12 timber into their pack.');
  expect(shown('Transferred 5 timber to Iron Wolves (personal, player 8).')).toBe('Gave 5 timber to alex.');
  expect(shown('Transferred 9 timber to Golden Owls (tribe, player 7).')).toBe('Sent 9 timber to Golden Owls.');
  expect(shown('treasury deposit: 600 TNB.')).toBe('Deposited 600 TNB from their wallet into the treasury.');
  expect(shown('treasury withdraw: 40 TNB.')).toBe('Withdrew 40 TNB from the treasury into their wallet.');
  expect(shown('Listed sell order #5: 10 timber at 3 TNB each from personal.')).toBe(
    'Listed sell order #5: 10 timber at 3 TNB each, using their pack and wallet.',
  );
  expect(shown('Cancelled order #5: 3 timber at 3 TNB each; escrow returned to tribe.')).toBe(
    'Cancelled order #5: 3 timber at 3 TNB each; escrow returned.',
  );
  expect(shown('Filled order #5 with Golden Owls: 4 timber at 3 TNB each (12 TNB, tribe).')).toBe(
    'Filled order #5 with Golden Owls: 4 timber at 3 TNB each (12 TNB, using the warehouse and treasury).',
  );
  expect(shown('Order #5 filled by Golden Owls: 4 timber for 12 TNB (personal).')).toBe(
    'Order #5 filled by Golden Owls: 4 timber for 12 TNB (using the owner’s pack and wallet).',
  );
  const current = 'Stored 12 iron ore from their pack in the warehouse.';
  expect(shown(current)).toBe(current);
  expect(shown('Purchased land (3, 4) for 40 TNB.')).toBe('Purchased land (3, 4) for 40 TNB.');
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
