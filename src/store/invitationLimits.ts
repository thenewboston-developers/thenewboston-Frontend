import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INVITATION_LIMITS} from 'constants/store';
import {InvitationLimit, InvitationLimits} from 'types';

const initialState: InvitationLimits = {};

const invitationLimits = createSlice({
  initialState,
  name: INVITATION_LIMITS,
  reducers: {
    setInvitationLimit: (state: InvitationLimits, {payload}: PayloadAction<InvitationLimit>) => {
      const {id} = payload;
      state[id] = payload;
    },
  },
});

export const {setInvitationLimit} = invitationLimits.actions;
export default invitationLimits.reducer;
