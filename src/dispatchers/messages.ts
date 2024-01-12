import {createMessage as _createMessage} from 'api/messages';
import {setMessage} from 'store/messages';
import {AppDispatch, CreateMessageRequest} from 'types';

export const createMessage = (data: CreateMessageRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createMessage(data);
  dispatch(setMessage(responseData));
  return responseData;
};
