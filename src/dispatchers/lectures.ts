import {store} from 'store';
import {getLectures as _getLectures, GetLecturesParams} from 'api/lectures';
import {resetLectures as _resetLectures, setLectures, startLoading} from 'store/lectures';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const resetLectures = () => (dispatch: AppDispatch) => {
  dispatch(_resetLectures());
};

export const getLectures = (params?: GetLecturesParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().lectures);
  const responseData = await _getLectures(nextURL, params);

  dispatch(setLectures(responseData));
};
