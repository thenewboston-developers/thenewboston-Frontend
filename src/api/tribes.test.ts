import axios from 'axios';

import {
  getTribesActivity,
  getTribesCatalog,
  getTribesMessages,
  getTribesState,
  getTribesTournaments,
  performTribesAction,
  uploadTribeEmblem,
} from './tribes';

jest.mock('axios', () => ({get: jest.fn(), post: jest.fn()}));
jest.mock('utils/authentication', () => ({authorizationHeaders: () => ({headers: {Authorization: 'Bearer test'}})}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(axios.get).mockResolvedValue({data: {}});
  jest.mocked(axios.post).mockResolvedValue({data: {}});
});

test('the public catalog needs neither authentication headers nor a tournament', async () => {
  const {signal} = new AbortController();
  const catalog = {land: {}, recipes: {}};
  jest.mocked(axios.get).mockResolvedValueOnce({data: catalog});
  expect(await getTribesCatalog(signal)).toEqual(catalog);
  expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/tribes\/catalog$/), {signal});
});

test('game reads and private pagination always carry the selected tournament ID', async () => {
  const {signal} = new AbortController();
  await getTribesState(8, signal);
  expect(axios.get).toHaveBeenLastCalledWith(
    expect.stringMatching(/\/tribes\/state$/),
    expect.objectContaining({params: {tournament_id: 8}, signal}),
  );
  await getTribesActivity(9, 42, signal);
  expect(axios.get).toHaveBeenLastCalledWith(
    expect.stringMatching(/\/tribes\/activity$/),
    expect.objectContaining({params: {tournament_id: 9, before: 42}, signal}),
  );
  await getTribesMessages(10, 23, signal);
  expect(axios.get).toHaveBeenLastCalledWith(
    expect.stringMatching(/\/tribes\/messages$/),
    expect.objectContaining({params: {tournament_id: 10, before: 23}, signal}),
  );
});

test('discovery is independent of any selected world and supports pagination', async () => {
  await getTribesTournaments(undefined, 100);
  expect(axios.get).toHaveBeenLastCalledWith(
    expect.stringMatching(/\/tribes\/tournaments$/),
    expect.objectContaining({params: {before: 100}}),
  );
});

test('an action and emblem upload retain explicit tournament scope', async () => {
  const payload = {action: 'treasury_deposit', amount: 15, tournament_id: 12, request_id: 'receipt'};
  await performTribesAction(payload);
  expect(axios.post).toHaveBeenLastCalledWith(expect.stringMatching(/\/tribes\/actions$/), payload, expect.any(Object));
  const image = new File(['image'], 'tribe.png', {type: 'image/png'});
  await uploadTribeEmblem(14, image);
  const form = jest.mocked(axios.post).mock.calls[1][1] as FormData;
  expect(Array.from(form.keys()).sort()).toEqual(['image', 'tournament_id']);
  expect(form.get('tournament_id')).toBe('14');
  expect(form.get('image')).toBe(image);
});
