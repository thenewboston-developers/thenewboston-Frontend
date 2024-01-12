import {createConversation as _createConversation} from 'api/conversations';
import {setConversation} from 'store/conversations';
import {AppDispatch, CreateConversationRequest} from 'types';

export const createConversation = (data: CreateConversationRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createConversation(data);
  dispatch(setConversation(responseData));
  return responseData;
};
