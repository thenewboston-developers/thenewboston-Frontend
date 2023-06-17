import {
  createCore as _createCore,
  deleteCore as _deleteCore,
  getCores as _getCores,
  updateCore as _updateCore,
} from 'api/cores';
import {setCore, setCores, unsetCore} from 'store/cores';
import {AppDispatch} from 'types';

export const createCore = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createCore(data);
  dispatch(setCore(responseData));
};

export const deleteCore = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteCore(id);
  dispatch(unsetCore(id));
};

export const getCores = () => async (dispatch: AppDispatch) => {
  const responseData = await _getCores();
  dispatch(setCores(responseData));
};

export const updateCore = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateCore(id, data);
  dispatch(setCore(responseData));
};
