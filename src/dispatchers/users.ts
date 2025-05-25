import {
  createUser as _createUser,
  getUser as _getUser,
  getUsers as _getUsers,
  updateUser as _updateUser,
} from 'api/users';
import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {setUser, setUsers} from 'store/users';
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

export const getUsers = () => async (dispatch: AppDispatch) => {
  const responseData = await _getUsers();
  dispatch(setUsers(responseData));
};

export const updateUser = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateUser(id, data);
  dispatch(setSelf(responseData));
};
