import {login as _login} from 'api/authentication';
import {resetAuthentication, setAuthentication} from 'store/authentication';
import {resetSelf, setSelf} from 'store/self';
import {AppDispatch, LoginRequest} from 'types';

export const login = (data: LoginRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _login(data);

  const {
    authentication: {access_token, refresh_token},
    user: {id, username},
  } = responseData;

  dispatch(
    setAuthentication({
      accessToken: access_token,
      refreshToken: refresh_token,
    }),
  );

  dispatch(setSelf({id, username}));
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(resetAuthentication());
  dispatch(resetSelf());
};
