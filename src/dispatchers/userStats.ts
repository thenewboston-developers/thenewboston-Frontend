import {getUserStats as _getUserStats} from 'api/userStats';
import {setUserStats} from 'store/userStats';
import {AppDispatch} from 'types';

export const getUserStats = (id: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getUserStats(id);
  dispatch(setUserStats(responseData));
};
