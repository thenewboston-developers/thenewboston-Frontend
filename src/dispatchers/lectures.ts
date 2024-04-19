import {store} from 'store';
import {getLectures as _getLectures} from 'api/lectures';
import {resetLectures as _resetLectures, setLectures, startLoading} from 'store/lectures';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const resetLectures = () => (dispatch: AppDispatch) => {
  dispatch(_resetLectures());
};

export const getLectures = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().lectures);
  const responseData = await _getLectures(nextURL);

  dispatch(setLectures(responseData));
};
