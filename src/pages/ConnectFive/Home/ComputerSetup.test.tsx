import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createConnectFiveComputerMatch} from 'api/connectFive';

import ComputerSetup from './ComputerSetup';
import Hero from './Hero';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/connectFive', () => ({createConnectFiveComputerMatch: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('utils/forms', () => ({handleFormikAPIError: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const requestId = '11111111-1111-4111-8111-111111111111';
const choose = async (selector: string) => {
  await act(async () => (container.querySelector(selector) as HTMLInputElement).click());
};
const submit = async () => {
  const button = container.querySelector('button[type="submit"]') as HTMLButtonElement;
  expect(button).toBeEnabled();
  await act(async () => button.click());
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: 11}}));
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => requestId}});
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('creates a free computer game and keeps the request ID stable after an ambiguous failure', async () => {
  (createConnectFiveComputerMatch as jest.Mock).mockRejectedValue(new Error('Lost connection'));
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ComputerSetup />
      </MemoryRouter>,
    ),
  );
  await submit();
  await submit();
  expect((createConnectFiveComputerMatch as jest.Mock).mock.calls).toEqual([
    [{request_id: requestId, difficulty: 'normal', time_limit_seconds: 900}],
    [{request_id: requestId, difficulty: 'normal', time_limit_seconds: 900}],
  ]);
  expect(container).toHaveTextContent('No stakes or paid purchases');
});

it('starts a free computer game without a signed-in user', async () => {
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  (createConnectFiveComputerMatch as jest.Mock).mockResolvedValue({id: 42, guest_mode: true});
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ComputerSetup />
      </MemoryRouter>,
    ),
  );
  await submit();
  expect(createConnectFiveComputerMatch).toHaveBeenCalledWith({
    request_id: requestId,
    difficulty: 'normal',
    time_limit_seconds: 900,
  });
});

it('starts a computer game with the difficulty and clock chosen in the panel', async () => {
  (createConnectFiveComputerMatch as jest.Mock).mockResolvedValue({id: 42});
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ComputerSetup />
      </MemoryRouter>,
    ),
  );
  expect(container.querySelector('#computer-difficulty-normal')).toBeChecked();
  expect(container.querySelector('#computer-time-900')).toBeChecked();
  await choose('#computer-difficulty-hard');
  await choose('#computer-time-300');
  expect(container.querySelector('#computer-difficulty-hard')).toBeChecked();
  expect(container.querySelector('#computer-difficulty-normal')).not.toBeChecked();
  await submit();
  expect(createConnectFiveComputerMatch).toHaveBeenCalledWith({
    request_id: requestId,
    difficulty: 'hard',
    time_limit_seconds: 300,
  });
});

it.each([null, 11])(
  'starts a default game from the hero for viewer %s and blocks duplicate creation',
  async (viewerId) => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: viewerId}}));
    (createConnectFiveComputerMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending while checking the shared submission lock.
      }),
    );
    await act(async () =>
      root.render(
        <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
          <ComputerSetup>
            {({isCreating, onPlay, panel}) => (
              <>
                <Hero isCreating={isCreating} onPlay={onPlay} />
                {panel}
              </>
            )}
          </ComputerSetup>
        </MemoryRouter>,
      ),
    );
    await choose('#computer-difficulty-hard');
    await choose('#computer-time-300');
    const heroButton = container.querySelector('[aria-label="Connect Five overview"] button') as HTMLButtonElement;
    await act(async () => {
      heroButton.click();
      heroButton.click();
    });
    expect(createConnectFiveComputerMatch).toHaveBeenCalledTimes(1);
    expect(createConnectFiveComputerMatch).toHaveBeenCalledWith({
      request_id: requestId,
      difficulty: 'normal',
      time_limit_seconds: 900,
    });
    expect(heroButton).toBeDisabled();
    expect(container.querySelector('button[type="submit"]')).toBeDisabled();
  },
);
