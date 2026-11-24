import {createUser as _createUser, getUser as _getUser, updateUser as _updateUser} from 'api/users';
import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {setUser} from 'store/users';
import {AppDispatch, CreateUserRequest} from 'types';
import {syncAnalyticsIdentity} from 'utils/analytics';
import {clearGameAttribution} from 'utils/gameAnalytics';

export const createUser = (data: CreateUserRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createUser(data);

  const {
    authentication: {access_token, refresh_token},
    user,
  } = responseData;

  // Link the anonymous game history before authenticated navigation or further API requests.
  syncAnalyticsIdentity(String(user.id), !!user.is_staff);
  clearGameAttribution();

  dispatch(
    setAuthentication({
      accessToken: access_token,
      refreshToken: refresh_token,
    }),
  );

  dispatch(setSelf(user));

  return user;
};

export const getUser = (id: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getUser(id);
  dispatch(setUser(responseData));
};

export const updateUser = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateUser(id, data);
  dispatch(setSelf(responseData));
};
