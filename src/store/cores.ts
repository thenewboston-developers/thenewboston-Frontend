import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CORES} from 'constants/store';
import {Core, Cores} from 'types';

const initialState: Cores = {};

const cores = createSlice({
  initialState,
  name: CORES,
  reducers: {
    setCore: (state: Cores, {payload}: PayloadAction<Core>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setCores: (state: Cores, {payload}: PayloadAction<Core[]>) => {
      return payload.reduce((acc: Cores, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetCore: (state: Cores, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setCore, setCores, unsetCore} = cores.actions;
export default cores.reducer;
