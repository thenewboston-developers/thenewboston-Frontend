import {createCore as _createCore, getCores as _getCores} from 'api/cores';
import {setCore, setCores} from 'store/cores';
import {AppDispatch, Core} from 'types';

export const createCore = (data: Partial<Core>) => async (dispatch: AppDispatch) => {
  const responseData = await _createCore(data);
  dispatch(setCore(responseData));
};

export const getCores = () => async (dispatch: AppDispatch) => {
  const responseData = await _getCores();
  dispatch(setCores(responseData));
};
