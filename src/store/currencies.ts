import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CURRENCIES} from 'constants/store';
import {Currency} from 'types';

interface CurrenciesState {
  byId: {[id: number]: Currency};
  ids: number[];
}

const initialState: CurrenciesState = {
  byId: {},
  ids: [],
};

const currencies = createSlice({
  initialState,
  name: CURRENCIES,
  reducers: {
    setCurrency: (state: CurrenciesState, {payload}: PayloadAction<Currency>) => {
      const {id} = payload;
      state.byId[id] = payload;
      if (!state.ids.includes(id)) {
        state.ids.push(id);
      }
    },
    setCurrencies: (state: CurrenciesState, {payload}: PayloadAction<Currency[]>) => {
      state.byId = payload.reduce((acc: {[id: number]: Currency}, obj) => ({...acc, [obj.id]: obj}), {});
      state.ids = payload.map((currency) => currency.id);
    },
    unsetCurrency: (state: CurrenciesState, {payload: id}: PayloadAction<number>) => {
      delete state.byId[id];
      state.ids = state.ids.filter((currencyId) => currencyId !== id);
    },
  },
});

export const {setCurrency, setCurrencies, unsetCurrency} = currencies.actions;
export default currencies.reducer;
