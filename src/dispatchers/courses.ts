import {store} from 'store';
import {
  createCourse as _createCourse,
  getCourses as _getCourses,
  updateCourse as _updateCourse,
  GetCoursesParams,
} from 'api/courses';
import {resetCourses as _resetCourses, setCourse, setCourses, startLoading} from 'store/courses';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createCourse = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createCourse(data);
  dispatch(setCourse(responseData));
};

export const updateCourse = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateCourse(id, data);
  dispatch(setCourse(responseData));
};

export const resetCourses = () => (dispatch: AppDispatch) => {
  dispatch(_resetCourses());
};

export const getCourses = (params?: GetCoursesParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().courses);
  const responseData = await _getCourses(nextURL, params);

  dispatch(setCourses(responseData));
};
