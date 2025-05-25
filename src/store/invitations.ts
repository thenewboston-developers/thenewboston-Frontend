import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {INVITATIONS} from 'constants/store';
import {Invitation, Invitations} from 'types';

const initialState: Invitations = {};

const invitations = createSlice({
  initialState,
  name: INVITATIONS,
  reducers: {
    setInvitation: (state: Invitations, {payload}: PayloadAction<Invitation>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setInvitations: (state: Invitations, {payload}: PayloadAction<Invitation[]>) => {
      return payload.reduce((acc: Invitations, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetInvitation: (state: Invitations, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setInvitation, setInvitations, unsetInvitation} = invitations.actions;
export default invitations.reducer;
