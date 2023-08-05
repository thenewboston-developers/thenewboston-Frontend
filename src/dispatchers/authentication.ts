import {login as _login} from 'api/authentication';
import {persistor} from 'store';
import {logoutUser} from 'store/actions';
import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {AppDispatch, LoginRequest} from 'types';

export const login = (data: LoginRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _login(data);

  const {
    authentication: {access_token, refresh_token},
    user,
  } = responseData;

  dispatch(
    setAuthentication({
      accessToken: access_token,
      refreshToken: refresh_token,
    }),
  );

  dispatch(setSelf(user));

  return user;
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(logoutUser());
  persistor.purge();
};
