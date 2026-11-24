import {login as loginRequest} from 'api/authentication';
import {createUser as createUserRequest} from 'api/users';
import {syncAnalyticsIdentity} from 'utils/analytics';
import {clearGameAttribution} from 'utils/gameAnalytics';

import {login, logout} from './authentication';
import {createUser} from './users';

jest.mock('api/authentication', () => ({login: jest.fn()}));
jest.mock('api/users', () => ({createUser: jest.fn()}));
jest.mock('store', () => ({persistor: {purge: jest.fn()}}));
jest.mock('utils/analytics', () => ({syncAnalyticsIdentity: jest.fn()}));
jest.mock('utils/gameAnalytics', () => ({clearGameAttribution: jest.fn()}));

const response = {authentication: {access_token: 'private', refresh_token: 'private'}, user: {id: 42, is_staff: false}};

it('identifies signup only after server success and before authenticated navigation', async () => {
  (createUserRequest as jest.Mock).mockResolvedValue(response);
  const dispatch = jest.fn();
  await createUser({agree_to_terms: true, invitation_code: '', password: 'private', username: 'private'})(dispatch);
  expect(syncAnalyticsIdentity).toHaveBeenCalledWith('42', false);
  expect(clearGameAttribution).toHaveBeenCalledTimes(1);
  expect((syncAnalyticsIdentity as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan(
    dispatch.mock.invocationCallOrder[0],
  );
});

it('keeps anonymous identity and attribution after failed signup', async () => {
  (createUserRequest as jest.Mock).mockRejectedValue(new Error('failed'));
  await expect(
    createUser({agree_to_terms: true, invitation_code: '', password: 'private', username: 'private'})(jest.fn()),
  ).rejects.toThrow('failed');
  expect(syncAnalyticsIdentity).not.toHaveBeenCalled();
  expect(clearGameAttribution).not.toHaveBeenCalled();
});

it('clears attribution on login and logout to prevent cross-account conversion links', async () => {
  (loginRequest as jest.Mock).mockResolvedValue(response);
  const dispatch = jest.fn();
  await login({password: 'private', username: 'private'})(dispatch);
  expect(syncAnalyticsIdentity).toHaveBeenCalledWith('42', false);
  logout()(dispatch);
  expect(clearGameAttribution).toHaveBeenCalledTimes(2);
  expect(syncAnalyticsIdentity).toHaveBeenLastCalledWith(null);
});
