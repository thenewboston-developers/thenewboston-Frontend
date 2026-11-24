import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {
  getConnectFiveChallenges,
  getConnectFiveEloSnapshots,
  getConnectFiveLeaderboard,
  getConnectFiveMatches,
} from 'api/connectFive';
import {useIsAuthenticated} from 'hooks';

import Home from './index';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/connectFive', () => ({
  getConnectFiveChallenges: jest.fn(),
  getConnectFiveEloSnapshots: jest.fn(),
  getConnectFiveLeaderboard: jest.fn(),
  getConnectFiveMatches: jest.fn(),
}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('components/GameEarningsLeaderboard', () => () => <div>Top earners</div>);
jest.mock('components/AuthButtons', () => () => <div>Sign in</div>);
jest.mock('components/BannerArt', () => ({
  __esModule: true,
  default: () => <div />,
  BANNER_ART_ACCENTS: {board: '#000'},
}));
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));
jest.mock('./ComputerSetup', () => () => <div>Computer setup</div>);

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
let selfId: number;
const dispatch = jest.fn();
const privateMatch = {
  id: 99,
  mode: 'computer',
  status: 'active',
  player_a: {id: 11, username: 'Alice'},
  player_b: null,
  created_date: new Date(),
  difficulty: 'normal',
};
const emptyPage = {results: [], count: 0, next: null, previous: null};
const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Home />
      </MemoryRouter>,
    ),
  );
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  selfId = 11;
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({
      self: {id: selfId, username: 'Member', avatar: null},
      connectFive: {
        activeMatches: [privateMatch],
        completedMatches: [],
        incomingChallenges: [],
        outgoingChallenges: [],
      },
    }),
  );
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (getConnectFiveChallenges as jest.Mock).mockResolvedValue(emptyPage);
  (getConnectFiveEloSnapshots as jest.Mock).mockResolvedValue([]);
  (getConnectFiveLeaderboard as jest.Mock).mockResolvedValue(emptyPage);
  (getConnectFiveMatches as jest.Mock).mockResolvedValue(emptyPage);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('discards deferred private matches from an old viewer and filters cached matches for the current account', async () => {
  let resolveOld: (value: unknown) => void = () => undefined;
  (getConnectFiveMatches as jest.Mock).mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolveOld = resolve;
      }),
  );
  await render();
  selfId = 22;
  await render();
  expect(container.querySelector('[aria-label="Open match 99"]')).toBeNull();
  dispatch.mockClear();
  await act(async () => resolveOld({...emptyPage, results: [privateMatch]}));
  expect(dispatch).not.toHaveBeenCalled();
  expect(container.querySelector('[aria-label="Open match 99"]')).toBeNull();
});
