import {createUser as _createUser} from 'api/users';
import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {AppDispatch, CreateUserRequest} from 'types';

export const createUser = (data: CreateUserRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createUser(data);

  const {
    authentication: {access_token, refresh_token},
    deposit_account: {account_number},
    user: {id, username},
  } = responseData;

  dispatch(
    setAuthentication({
      accessToken: access_token,
      refreshToken: refresh_token,
    }),
  );

  dispatch(setSelf({deposit_account_number: account_number, id, username}));
};
