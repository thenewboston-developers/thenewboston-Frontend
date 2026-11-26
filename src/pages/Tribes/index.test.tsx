import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import {getTribesSeasons} from 'api/tribes';
import {TribesState} from 'types/tribes';

import Tribes from './index';
import {useTribes} from './useTribes';

jest.mock('api/tribes', () => ({
  getTribesActivity: jest.fn(),
  getTribesMessages: jest.fn(),
  getTribesSeasons: jest.fn(),
}));
let mockUserId = 7;
jest.mock('react-redux', () => ({useSelector: () => ({id: mockUserId})}));
jest.mock('selectors/state', () => ({getSelf: jest.fn()}));
jest.mock('utils/authentication', () => ({getAuthenticationPath: (path: string) => path}));
jest.mock('./useTribes', () => ({useTribes: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
const now = new Date('2026-11-26T12:00:00Z').getTime();
const makeState = (): TribesState => ({
  activity: [],
  applications: [],
  battle: null,
  catalog: {
    building_capacity: 3,
    buildings: {workshop: {land: ['forest'], resource: null}},
    currency: 'TNB',
    defenses: {barricade: 30},
    gather_capacity: 5,
    gather_rate: 10,
    items: ['timber', 'lumber', 'catapult'],
    land: {forest: {price: 40, resource: 'timber'}},
    max_members: 8,
    queue_seconds: 86400,
    recipes: {
      lumber: {inputs: {timber: 2}, seconds: 120, facility: null},
      catapult: {inputs: {lumber: 20}, seconds: 7200, facility: 'workshop'},
    },
    trade_items: ['timber', 'lumber'],
    unit_capacity: 100,
    units: {catapult: {damage: 80, range: 2}},
  },
  invitations: [],
  jobs: [],
  listings: [
    {account: 'personal', id: 40, item: 'timber', kind: 'sell', price: 2, quantity: 100, tribe_id: null, user_id: null},
  ],
  messages: [],
  plots: [
    {id: 1, x: 0, y: 0, terrain: 'forest', tribe_id: 1, price: 40, buildings: ['workshop']},
    {id: 2, x: 1, y: 0, terrain: 'forest', tribe_id: 2, price: 40, buildings: []},
  ],
  season: {id: 1, status: 'active', starts_at: '2026-11-25T12:00:00Z', ends_at: '2026-12-02T12:00:00Z'},
  server_time: '2026-11-26T12:00:00Z',
  tribes: [
    {
      id: 1,
      name: 'Iron Wolves',
      emblem: '🐺',
      color: '#43654b',
      description: 'Builders',
      motto: 'Together',
      founder_id: 7,
      members: [
        {id: 7, username: 'maya'},
        {id: 8, username: 'alex'},
      ],
      treasury: 200,
      inventory: {timber: 30},
    },
    {
      id: 2,
      name: 'Golden Owls',
      emblem: '🦉',
      color: '#876634',
      description: 'Neighbors',
      motto: 'Watchful',
      founder_id: 9,
      members: [{id: 9, username: 'sam'}],
      treasury: null,
      inventory: null,
    },
  ],
  units: [
    {
      id: 10,
      tribe_id: 1,
      controller_id: 7,
      item: 'catapult',
      quantity: 2,
      plot_id: 1,
      target_id: 2,
      valid_target_ids: [2],
    },
    {
      id: 11,
      tribe_id: 1,
      controller_id: 8,
      item: 'catapult',
      quantity: 1,
      plot_id: 1,
      target_id: null,
      valid_target_ids: [2],
    },
    {id: 12, tribe_id: 2, controller_id: 9, item: 'catapult', quantity: 1, plot_id: 2, valid_target_ids: [1]},
  ],
  viewer: {
    id: 7,
    username: 'maya',
    tribe_id: 1,
    wallet_balance: 500,
    inventory: {timber: 12},
    production: {timber: 12},
    experience: {},
  },
  work_orders: [],
});
let container: HTMLDivElement;
let root: Root;
let state: TribesState;
let game: ReturnType<typeof useTribes>;
const action = jest.fn().mockResolvedValue(true);
const button = (text: string) =>
  Array.from(container.querySelectorAll('button')).find((entry) => entry.textContent === text)!;
const click = async (text: string) => act(async () => button(text).click());
const render = async () =>
  act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Tribes />
      </MemoryRouter>,
    ),
  );
const submit = async (text: string) =>
  act(async () =>
    button(text)
      .closest('form')!
      .dispatchEvent(new Event('submit', {bubbles: true, cancelable: true})),
  );

beforeEach(() => {
  mockUserId = 7;
  state = makeState();
  action.mockClear();
  game = {
    act: action,
    busy: false,
    error: '',
    loading: false,
    now,
    pending: null,
    refresh: jest.fn(),
    retry: jest.fn().mockResolvedValue(true),
    retrying: false,
    seasons: [state.season],
    state,
  };
  jest.mocked(useTribes).mockImplementation(() => game);
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('uses real wallet and treasury balances and submits a deposit without a seasonal currency grant', async () => {
  await render();
  await click('Inventory');
  expect(container).toHaveTextContent('500 TNB');
  expect(container).toHaveTextContent('200 TNB');
  const form = button('Deposit TNB').closest('form')!;
  (form.querySelector('[name="amount"]') as HTMLInputElement).value = '25';
  await submit('Deposit TNB');
  expect(action).toHaveBeenCalledWith('treasury_deposit', {amount: 25});
  expect(container).toHaveTextContent('All members can spend or withdraw shared TNB');
});

it('queues a worker assignment against a selected owned plot with an explicit destination', async () => {
  await render();
  await click('Production');
  const form = button('Queue gathering').closest('form')!;
  (form.querySelector('[name="plot_id"]') as HTMLSelectElement).value = '1';
  await submit('Queue gathering');
  expect(action).toHaveBeenCalledWith('queue', {kind: 'gather', plot_id: 1, hours: 4, destination: 'tribe'});
});

it('allows only the creator to retarget and submits an explicit null when clearing a target', async () => {
  await render();
  await click('Military');
  expect(
    Array.from(container.querySelectorAll('button')).filter((entry) => entry.textContent === 'Save deployment'),
  ).toHaveLength(1);
  expect(container).toHaveTextContent('Only the controlling player can change this deployment.');
  const form = button('Save deployment').closest('form')!;
  (form.querySelector('[name="target_id"]') as HTMLSelectElement).value = '';
  await submit('Save deployment');
  expect(action).toHaveBeenCalledWith('deploy', {unit_id: 10, plot_id: 1, target_id: null});
});

it('shows rival military targets as classified in public intelligence', async () => {
  await render();
  await click('World');
  await act(async () => (container.querySelector('[aria-label*="Golden Owls"]') as HTMLButtonElement).click());
  expect(container).toHaveTextContent('Target classified');
});

it('stops economic mutations at the cutoff even before the server marks the season finished', async () => {
  game.now = new Date(state.season.ends_at).getTime();
  await render();
  await click('Inventory');
  expect(button('Deposit TNB')).toBeDisabled();
  await submit('Deposit TNB');
  expect(action).not.toHaveBeenCalled();
  expect(container).toHaveTextContent('The final battle cutoff has passed.');
});

it('keeps uncertain transactions retryable and prevents a new economic action', async () => {
  game.busy = true;
  game.pending = {action: 'treasury_deposit', amount: 25, season_id: 1, request_id: 'pending-receipt'};
  await render();
  await click('Inventory');
  expect(button('Deposit TNB')).toBeDisabled();
  await click('Retry last action');
  expect(game.retry).toHaveBeenCalledTimes(1);
  expect(container).toHaveTextContent('same transaction receipt prevents duplicate charges');
});

it('displays an actual TNB purchase total and lets the buyer choose their account', async () => {
  await render();
  await click('Marketplace');
  await submit('Buy for 2 TNB');
  expect(action).toHaveBeenCalledWith('fill_listing', {listing_id: 40, quantity: 1, account: 'personal'});
});

it('supports buying military batches with a required destination plot', async () => {
  state.listings = [
    {account: 'personal', id: 40, item: 'catapult', kind: 'sell', price: 12, quantity: 2, tribe_id: 2, user_id: 9},
  ];
  await render();
  await click('Marketplace');
  const form = button('Buy for 12 TNB').closest('form')!;
  (form.querySelector('[name="plot_id"]') as HTMLSelectElement).value = '1';
  await submit('Buy for 12 TNB');
  expect(action).toHaveBeenCalledWith('fill_listing', {listing_id: 40, quantity: 1, account: 'personal', plot_id: 1});
});

it('reveals finished standings and personal contributions without enabling stale actions', async () => {
  state.season.status = 'finished';
  state.battle = {
    standings: [
      {
        tribe_id: 1,
        name: 'Iron Wolves',
        outgoing: 160,
        incoming: 80,
        raw_incoming: 100,
        blocked: 20,
        defense: 20,
        score: 80,
        rank: 1,
        attacks: [],
      },
    ],
    attacks: [{unit_id: 10, tribe_id: 1, target_id: 2, controller_id: 7, raw_damage: 160, effective_damage: 160}],
  };
  await render();
  expect(container).toHaveTextContent('The targeting reveal');
  expect(container).toHaveTextContent('Your economic contribution');
  expect(container).toHaveTextContent('+80');
  await click('Inventory');
  expect(button('Deposit TNB')).toBeDisabled();
});

it('preserves the chosen payment account after buying goods', async () => {
  await render();
  await click('Marketplace');
  const form = button('Buy for 2 TNB').closest('form')!;
  const account = form.querySelector('[name="account"]') as HTMLSelectElement;
  account.value = 'tribe';
  await submit('Buy for 2 TNB');
  expect(action).toHaveBeenCalledWith('fill_listing', {listing_id: 40, quantity: 1, account: 'tribe'});
  expect(account.value).toBe('tribe');
});

it('prevents teammates from filling their own shared treasury listing', async () => {
  state.listings[0] = {...state.listings[0], user_id: 8, tribe_id: 1, account: 'tribe'};
  await render();
  await click('Marketplace');
  expect(button('Buy for 2 TNB')).toBeDisabled();
  expect(container).toHaveTextContent('Your tribe owns this listing');
});

it('loads older seasons and ignores a response after the account changes', async () => {
  game.seasons = Array.from({length: 100}, (_, index) => ({...state.season, id: 200 - index}));
  let resolve!: (value: typeof game.seasons) => void;
  jest.mocked(getTribesSeasons).mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  await render();
  await click('Load older seasons');
  expect(getTribesSeasons).toHaveBeenCalledWith(expect.any(AbortSignal), 101);
  mockUserId = 8;
  state = {...state, viewer: {...state.viewer!, id: 8}};
  game.state = state;
  await render();
  await act(async () => resolve([{...state.season, id: 100}]));
  expect(container.querySelector('option[value="100"]')).toBeNull();
});

it('tracks military work orders automatically without manual goods contribution', async () => {
  state.work_orders = [
    {
      id: 77,
      tribe_id: 1,
      title: 'Prepare catapults',
      item: 'catapult',
      quantity: 10,
      contributed: 2,
      description: 'Defend our borders',
      status: 'open',
    },
  ];
  await render();
  await click('Tribe');
  expect(container).toHaveTextContent('Tracked automatically as tribe production completes.');
  expect(
    Array.from(container.querySelectorAll('button')).some((entry) => entry.textContent === 'Contribute supplies'),
  ).toBe(false);
  await click('Cancel project & release supplies');
  expect(action).toHaveBeenCalledWith('cancel_work_order', {work_order_id: 77});
});
