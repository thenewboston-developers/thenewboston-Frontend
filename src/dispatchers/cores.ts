import {getCores as _getCores} from 'api/cores';
import {setCores} from 'store/cores';
import {AppDispatch} from 'types';

export const getCores = () => async (dispatch: AppDispatch) => {
  const responseData = await _getCores();
  dispatch(setCores(responseData));
};
