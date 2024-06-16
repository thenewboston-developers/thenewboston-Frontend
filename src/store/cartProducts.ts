import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CART_PRODUCTS} from 'constants/store';
import {CartProduct, CartProducts} from 'types';

export const initialState: CartProducts = {};

const cartProducts = createSlice({
  initialState,
  name: CART_PRODUCTS,
  reducers: {
    setCartProduct: (state: CartProducts, {payload}: PayloadAction<CartProduct>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setCartProducts: (state: CartProducts, {payload}: PayloadAction<CartProduct[]>) => {
      return payload.reduce((acc: CartProducts, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetCartProduct: (state: CartProducts, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setCartProduct, setCartProducts, unsetCartProduct} = cartProducts.actions;
export default cartProducts.reducer;
