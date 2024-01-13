import {
  createMessage as _createMessage,
  deleteMessage as _deleteMessage,
  updateMessage as _updateMessage,
} from 'api/messages';
import {setMessage, unsetMessage} from 'store/messages';
import {AppDispatch, CreateMessageRequest} from 'types';

export const createMessage = (data: CreateMessageRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createMessage(data);
  dispatch(setMessage(responseData));
  return responseData;
};

export const deleteMessage = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteMessage(id);
  dispatch(unsetMessage(id));
};

export const updateMessage = (id: number, data: Partial<CreateMessageRequest>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateMessage(id, data);
  dispatch(setMessage(responseData));
};
