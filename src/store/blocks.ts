import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BLOCKS} from 'store/constants';
import {Block, Blocks} from 'types';

const initialState: Blocks = {};

const blocks = createSlice({
  initialState,
  name: BLOCKS,
  reducers: {
    setBlock: (state: Blocks, {payload}: PayloadAction<Block>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setBlocks: (state: Blocks, {payload}: PayloadAction<Block[]>) => {
      return payload.reduce((acc: Blocks, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setBlock, setBlocks} = blocks.actions;
export default blocks.reducer;
