import {createUser as _createUser, updateUser as _updateUser} from 'api/users';
import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {AppDispatch, CreateUserRequest} from 'types';

export const createUser = (data: CreateUserRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createUser(data);

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
};

export const updateUser = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateUser(id, data);
  dispatch(setSelf(responseData));
};
