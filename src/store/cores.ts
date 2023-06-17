import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CORES} from 'store/constants';
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
  },
});

export const {setCore, setCores} = cores.actions;
export default cores.reducer;
