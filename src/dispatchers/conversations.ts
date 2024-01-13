import {
  createConversation as _createConversation,
  getConversations as _getConversations,
  GetConversationsParams,
} from 'api/conversations';
import {setConversation, setConversations} from 'store/conversations';
import {AppDispatch, CreateConversationRequest} from 'types';

export const createConversation = (data: CreateConversationRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createConversation(data);
  dispatch(setConversation(responseData));
  return responseData;
};

export const getConversations = (params?: GetConversationsParams) => async (dispatch: AppDispatch) => {
  const responseData = await _getConversations(params);
  dispatch(setConversations(responseData));
};
