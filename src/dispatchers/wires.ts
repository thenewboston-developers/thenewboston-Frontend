import {getWires as _getWires} from 'api/wires';
import {setWires} from 'store/wires';
import {AppDispatch} from 'types';

export const getWires = () => async (dispatch: AppDispatch) => {
  const responseData = await _getWires();
  dispatch(setWires(responseData));
};
