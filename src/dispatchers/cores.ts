import {createCore as _createCore, getCores as _getCores, updateCore as _updateCore} from 'api/cores';
import {setCore, setCores} from 'store/cores';
import {AppDispatch} from 'types';

export const createCore = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createCore(data);
  dispatch(setCore(responseData));
};

export const getCores = () => async (dispatch: AppDispatch) => {
  const responseData = await _getCores();
  dispatch(setCores(responseData));
};

export const updateCore = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateCore(id, data);
  dispatch(setCore(responseData));
};
