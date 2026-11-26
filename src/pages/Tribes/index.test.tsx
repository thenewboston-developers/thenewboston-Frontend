import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, useLocation} from 'react-router-dom';

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
let pathname = '';
const LocationProbe = () => {
  pathname = useLocation().pathname;
  return null;
};
const render = async (path = '/tribes/home') =>
  act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={[path]}>
        <Tribes />
        <LocationProbe />
      </MemoryRouter>,
    ),
  );
const type = async (input: HTMLInputElement, value: string) =>
  act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
    input.dispatchEvent(new Event('input', {bubbles: true}));
  });
const startRecruitment = () => {
  state.season = {
    ...state.season,
    ends_at: '2026-12-04T12:00:00Z',
    starts_at: '2026-11-27T12:00:00Z',
    status: 'recruiting',
  };
  state.listings = [];
  state.plots = [];
  state.units = [];
};
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
    uploadEmblem: jest.fn().mockResolvedValue(true),
  };
  jest.mocked(useTribes).mockImplementation(() => game);
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

// jsdom never loads pictures, so a chosen file "loads" with the dimensions a test gives it
const stubPictures = (width: number, height = width) => {
  URL.createObjectURL = jest.fn(() => 'blob:preview');
  URL.revokeObjectURL = jest.fn();
  jest.spyOn(window, 'Image').mockImplementation(() => {
    const picture = {naturalHeight: height, naturalWidth: width} as HTMLImageElement;
    Object.defineProperty(picture, 'src', {set: () => window.setTimeout(() => picture.onload?.(new Event('load')))});
    return picture;
  });
};
const choose = async (scope: Element, file: File) => {
  const input = scope.querySelector('input[type="file"]') as HTMLInputElement;
  Object.defineProperty(input, 'files', {configurable: true, value: [file]});
  await act(async () => {
    input.dispatchEvent(new Event('change', {bubbles: true}));
    await new Promise((resolve) => {
      window.setTimeout(resolve, 5);
    });
  });
};
const emblemFile = () => new File(['picture'], 'otters.png', {type: 'image/png'});

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
  await act(async () => (form.querySelector('[name="plot_id"][value="1"]') as HTMLInputElement).click());
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
  const account = form.querySelector('[name="account"][value="tribe"]') as HTMLInputElement;
  await act(async () => account.click());
  await submit('Buy for 2 TNB');
  expect(action).toHaveBeenCalledWith('fill_listing', {listing_id: 40, quantity: 1, account: 'tribe'});
  expect(account.checked).toBe(true);
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

it('opens a section from its address and moves the address when another section is chosen', async () => {
  await render('/tribes/market');
  expect(container).toHaveTextContent('Every tribe has something to offer.');
  expect(button('Marketplace')).toHaveAttribute('aria-current', 'page');
  await click('Inventory');
  expect(pathname).toBe('/tribes/inventory');
  expect(container).toHaveTextContent('Goods & supplies');
  expect(container).not.toHaveTextContent('Every tribe has something to offer.');
});

it('falls back to the overview for an address that is not a section', async () => {
  await render('/tribes/nowhere');
  expect(button('Overview')).toHaveAttribute('aria-current', 'page');
  expect(container).toHaveTextContent('Make your next hour count.');
});

it('confirms a successful action and stays quiet when the action is rejected', async () => {
  // The confirmation follows the server's answer, which arrives after the submit handler has returned
  const settle = async () =>
    act(async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });
    });
  action.mockResolvedValue(true);
  await render('/tribes/inventory');
  await submit('Deposit TNB');
  await settle();
  expect(container.querySelector('[role="status"]')).toHaveTextContent('Deposited into the treasury.');
  act(() => root.unmount());
  root = createRoot(container);
  action.mockResolvedValue(false);
  await render('/tribes/inventory');
  await submit('Deposit TNB');
  await settle();
  expect(action).toHaveBeenCalledTimes(2);
  expect(container.querySelector('[role="status"]')).toBeNull();
});

it('shows the lobby as the overview during recruitment and explains sections that open with the season', async () => {
  startRecruitment();
  await render();
  expect(container).toHaveTextContent('Find your people.');
  expect(container).toHaveTextContent('Season starts in');
  expect(Array.from(container.querySelectorAll('button')).some((entry) => entry.textContent === 'Rosters')).toBe(false);
  await click('World');
  expect(container).toHaveTextContent('A new world is being drawn');
  await click('Inventory');
  expect(container).toHaveTextContent('Empty shelves, for now');
  expect(Array.from(container.querySelectorAll('button')).some((entry) => entry.textContent === 'Deposit TNB')).toBe(
    false,
  );
});

it('creates a tribe with the name and color chosen in the banner preview', async () => {
  startRecruitment();
  state.viewer = {...state.viewer!, tribe_id: null};
  state.tribes = [state.tribes[1]];
  await render();
  const form = button('Create tribe').closest('form')!;
  await type(form.querySelector('[name="name"]') as HTMLInputElement, 'River Otters');
  await act(async () => (form.querySelector('[aria-label="Use the color #2f7fb8"]') as HTMLButtonElement).click());
  expect(form).toHaveTextContent('River Otters');
  expect(form).toHaveTextContent('A square picture, exactly 512 by 512 pixels.');
  await submit('Create tribe');
  expect(action).toHaveBeenCalledWith('create_tribe', {
    color: '#2f7fb8',
    description: '',
    motto: '',
    name: 'River Otters',
  });
  expect(game.uploadEmblem).not.toHaveBeenCalled();
});

it('uploads the chosen picture as the emblem once the tribe is created', async () => {
  stubPictures(512);
  action.mockResolvedValue(true);
  startRecruitment();
  state.viewer = {...state.viewer!, tribe_id: null};
  state.tribes = [state.tribes[1]];
  await render();
  const form = button('Create tribe').closest('form')!;
  await type(form.querySelector('[name="name"]') as HTMLInputElement, 'River Otters');
  const file = emblemFile();
  await choose(form, file);
  expect(form.querySelector('img')).toHaveAttribute('src', 'blob:preview');
  expect(form).toHaveTextContent('otters.png becomes your emblem when you create the tribe.');
  expect(game.uploadEmblem).not.toHaveBeenCalled();
  await submit('Create tribe');
  expect(action).toHaveBeenCalledWith('create_tribe', expect.objectContaining({name: 'River Otters'}));
  expect(game.uploadEmblem).toHaveBeenCalledWith(file);
  expect(container).toHaveTextContent('Your emblem is flying.');
});

it('keeps the emblem back when the tribe itself could not be saved', async () => {
  stubPictures(512);
  action.mockResolvedValue(false);
  startRecruitment();
  await render();
  const form = button('Save tribe').closest('form')!;
  await choose(form, emblemFile());
  await submit('Save tribe');
  expect(action).toHaveBeenCalledWith('update_tribe', expect.objectContaining({name: 'Iron Wolves'}));
  expect(game.uploadEmblem).not.toHaveBeenCalled();
  expect(form).toHaveTextContent('otters.png becomes your emblem when you save.');
  await click('Undo');
  expect(form).toHaveTextContent('A square picture, exactly 512 by 512 pixels.');
});

it('refuses an emblem that is not 512 pixels square', async () => {
  stubPictures(640, 480);
  startRecruitment();
  await render();
  const form = button('Save tribe').closest('form')!;
  await choose(form, emblemFile());
  expect(form.querySelector('[role="alert"]')).toHaveTextContent(
    'The emblem must be exactly 512 by 512 pixels. This picture is 640 by 480.',
  );
  expect(form).not.toHaveTextContent('otters.png');
  await submit('Save tribe');
  expect(game.uploadEmblem).not.toHaveBeenCalled();
});

it('lets only the founder change the emblem from the tribe page, also after the season started', async () => {
  stubPictures(512);
  await render('/tribes/tribe');
  const file = emblemFile();
  expect(container).toHaveTextContent('Upload emblem');
  await choose(container, file);
  expect(game.uploadEmblem).toHaveBeenCalledWith(file);
  act(() => root.unmount());
  root = createRoot(container);
  state.tribes[0].founder_id = 8;
  state.tribes[0].emblem_image = 'https://media.example/wolves.png';
  await render('/tribes/tribe');
  expect(container).toHaveTextContent('Iron Wolves');
  expect(container.querySelector('input[type="file"]')).toBeNull();
});

it('shows uploaded emblems and player avatars in place of the emoji and the initial', async () => {
  startRecruitment();
  state.tribes[0].emblem_image = 'https://media.example/wolves.png';
  state.tribes[0].members[0].avatar = 'https://media.example/maya.png';
  await render();
  const card = Array.from(container.querySelectorAll('article')).find(
    (entry) => entry.querySelector('h3')!.textContent === 'Iron Wolves',
  )!;
  expect(card.querySelector('img[src="https://media.example/wolves.png"]')).not.toBeNull();
  expect(card).not.toHaveTextContent('🐺');
  const roster = card.querySelector('[role="img"]')!;
  expect(roster.querySelector('[title="maya"] img')).toHaveAttribute('src', 'https://media.example/maya.png');
  expect(roster.querySelector('[title="alex"]')).toHaveTextContent('a');
  expect(roster.querySelector('[title="alex"] img')).toBeNull();
  // The same picture stands beside the name in the viewer's own roster
  expect(container.querySelectorAll('img[src="https://media.example/maya.png"]').length).toBeGreaterThan(1);
  // A tribe without a picture keeps its shield and emoji
  const rival = Array.from(container.querySelectorAll('article')).find(
    (entry) => entry.querySelector('h3')!.textContent === 'Golden Owls',
  )!;
  expect(rival).toHaveTextContent('🦉');
  // A picture that fails to load falls back to the initial instead of a broken image
  await act(async () => {
    roster.querySelector('[title="maya"] img')!.dispatchEvent(new Event('error'));
  });
  expect(roster.querySelector('[title="maya"]')).toHaveTextContent('m');
});

it('marks the selected plot on the map and lets an adjacent unowned plot be purchased from the treasury', async () => {
  state.plots.push({buildings: [], id: 3, price: 40, terrain: 'forest', tribe_id: null, x: 0, y: 1});
  await render('/tribes/world');
  const plot = container.querySelector('[data-plot="3"]') as HTMLButtonElement;
  await act(async () => plot.click());
  expect(plot).toHaveAttribute('aria-pressed', 'true');
  await click('Purchase land');
  expect(action).toHaveBeenCalledWith('purchase_land', {plot_id: 3});
});

it('writes a lone tribe, player and plot in the singular', async () => {
  startRecruitment();
  state.tribes = [state.tribes[1]];
  await render();
  expect(container).toHaveTextContent('1 tribe');
  expect(container).toHaveTextContent('1 player');
  expect(container).not.toHaveTextContent('1 tribes');
  expect(container).not.toHaveTextContent('1 players');
});
