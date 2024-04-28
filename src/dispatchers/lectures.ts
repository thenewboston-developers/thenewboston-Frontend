import {store} from 'store';
import {
  createLecture as _createLecture,
  deleteLecture as _deleteLecture,
  getLectures as _getLectures,
  GetLecturesParams,
  updateLecture as _updateLecture,
} from 'api/lectures';
import {resetLectures as _resetLectures, setLecture, setLectures, startLoading, unsetLecture} from 'store/lectures';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createLecture = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createLecture(data);
  dispatch(setLecture(responseData));
};

export const deleteLecture = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteLecture(id);
  dispatch(unsetLecture(id));
};

export const getLectures = (params?: GetLecturesParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().lectures);
  const responseData = await _getLectures(nextURL, params);
  dispatch(setLectures(responseData));
};

export const resetLectures = () => (dispatch: AppDispatch) => {
  dispatch(_resetLectures());
};

export const updateLecture = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateLecture(id, data);
  dispatch(setLecture(responseData));
};
