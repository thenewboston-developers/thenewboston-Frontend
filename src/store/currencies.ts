import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CURRENCIES} from 'constants/store';
import {Currencies, Currency} from 'types';

const initialState: Currencies = {};

const currencies = createSlice({
  initialState,
  name: CURRENCIES,
  reducers: {
    setCurrency: (state: Currencies, {payload}: PayloadAction<Currency>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setCurrencies: (state: Currencies, {payload}: PayloadAction<Currency[]>) => {
      return payload.reduce((acc: Currencies, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetCurrency: (state: Currencies, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setCurrency, setCurrencies, unsetCurrency} = currencies.actions;
export default currencies.reducer;
