import {
  createInvitation as _createInvitation,
  deleteInvitation as _deleteInvitation,
  getInvitations as _getInvitations,
  updateInvitation as _updateInvitation,
} from 'api/invitations';
import {setInvitation, setInvitations, unsetInvitation} from 'store/invitations';
import {AppDispatch, CreateInvitationRequest} from 'types';

export const createInvitation = (data: CreateInvitationRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createInvitation(data);
  dispatch(setInvitation(responseData));
};

export const deleteInvitation = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteInvitation(id);
  dispatch(unsetInvitation(id));
};

export const getInvitations = () => async (dispatch: AppDispatch) => {
  const responseData = await _getInvitations();
  dispatch(setInvitations(responseData));
};

export const updateInvitation = (id: number, data: CreateInvitationRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _updateInvitation(id, data);
  dispatch(setInvitation(responseData));
};
