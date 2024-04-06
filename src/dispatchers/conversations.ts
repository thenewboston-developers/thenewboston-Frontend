import {
  createConversation as _createConversation,
  deleteConversation as _deleteConversation,
  getConversations as _getConversations,
  GetConversationsParams,
  updateConversation as _updateConversation,
} from 'api/conversations';
import {setConversation, setConversations, unsetConversation} from 'store/conversations';
import {AppDispatch, CreateConversationRequest} from 'types';

export const createConversation = (data: CreateConversationRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createConversation(data);
  dispatch(setConversation(responseData));
  return responseData;
};

export const deleteConversation = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteConversation(id);
  dispatch(unsetConversation(id));
};

export const getConversations = (params?: GetConversationsParams) => async (dispatch: AppDispatch) => {
  const responseData = await _getConversations(params);
  dispatch(setConversations(responseData));
};

export const updateConversation =
  (id: number, data: Partial<CreateConversationRequest>) => async (dispatch: AppDispatch) => {
    const responseData = await _updateConversation(id, data);
    dispatch(setConversation(responseData));
  };
