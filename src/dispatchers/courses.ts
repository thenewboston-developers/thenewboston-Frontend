import {store} from 'store';
import {
  createCourse as _createCourse,
  deleteCourse as _deleteCourse,
  getCourses as _getCourses,
  GetCoursesParams,
  updateCourse as _updateCourse,
} from 'api/courses';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/urls';
import {resetCourses as _resetCourses, setCourse, setCourses, startLoading, unsetCourse} from 'store/courses';

export const createCourse = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createCourse(data);
  dispatch(setCourse(responseData));
};

export const deleteCourse = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteCourse(id);
  dispatch(unsetCourse(id));
};

export const getCourses = (params?: GetCoursesParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().courses);
  const responseData = await _getCourses(nextURL, params);

  dispatch(setCourses(responseData));
};

export const resetCourses = () => (dispatch: AppDispatch) => {
  dispatch(_resetCourses());
};

export const updateCourse = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateCourse(id, data);
  dispatch(setCourse(responseData));
};
