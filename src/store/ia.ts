import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IA} from 'constants/store';
import {IaReadSerializer} from 'types';

interface IaState {
  ia: IaReadSerializer | null;
}

export const initialState: IaState = {
  ia: null,
};

const ia = createSlice({
  initialState,
  name: IA,
  reducers: {
    setIa: (state: IaState, {payload}: PayloadAction<IaReadSerializer>) => {
      state.ia = payload;
    },
  },
});

export const {setIa} = ia.actions;
export default ia.reducer;
