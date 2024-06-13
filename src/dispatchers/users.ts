import {createUser as _createUser, getUser as _getUser, updateUser as _updateUser, filterUserList as _filterUserList} from 'api/users';
import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {setUser} from 'store/users';
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
export const filterUserList = (ussername: string) => async (dispatch: AppDispatch) => {
  const responseData = await _filterUserList(ussername);
  dispatch(setSelf(responseData));
};
