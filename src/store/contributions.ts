import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CONTRIBUTIONS} from 'constants/store';
import {Contribution, Contributions} from 'types';

const initialState: Contributions = {};

const contributions = createSlice({
  initialState,
  name: CONTRIBUTIONS,
  reducers: {
    setContributions: (_: Contributions, {payload}: PayloadAction<Contribution[]>) => {
      return payload.reduce((acc: Contributions, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setContributions} = contributions.actions;
export default contributions.reducer;
