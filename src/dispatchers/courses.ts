import {store} from 'store';
import {getCourses as _getCourses, GetCoursesParams} from 'api/courses';
import {resetCourses as _resetCourses, setCourses, startLoading} from 'store/courses';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const resetCourses = () => (dispatch: AppDispatch) => {
  dispatch(_resetCourses());
};

export const getCourses = (params?: GetCoursesParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().courses);
  const responseData = await _getCourses(nextURL, params);

  dispatch(setCourses(responseData));
};
