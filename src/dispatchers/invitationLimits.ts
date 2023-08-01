import {getInvitationLimit as _getInvitationLimit} from 'api/invitationLimits';
import {setInvitationLimit} from 'store/invitationLimits';
import {AppDispatch} from 'types';

export const getInvitationLimit = (id: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getInvitationLimit(id);
  dispatch(setInvitationLimit(responseData));
};
