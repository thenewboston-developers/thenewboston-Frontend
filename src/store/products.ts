import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {PRODUCTS} from 'constants/store';
import {Product, Products} from 'types';

const initialState: Products = {};

const products = createSlice({
  initialState,
  name: PRODUCTS,
  reducers: {
    setProduct: (state: Products, {payload}: PayloadAction<Product>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setProducts: (state: Products, {payload}: PayloadAction<Product[]>) => {
      return payload.reduce((acc: Products, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetProduct: (state: Products, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setProduct, setProducts, unsetProduct} = products.actions;
export default products.reducer;
