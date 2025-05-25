import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WIRES} from 'constants/store';
import {Wire, Wires} from 'types';

const initialState: Wires = {};

const wires = createSlice({
  initialState,
  name: WIRES,
  reducers: {
    setWire: (state: Wires, {payload}: PayloadAction<Wire>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setWires: (state: Wires, {payload}: PayloadAction<Wire[]>) => {
      return payload.reduce((acc: Wires, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setWire, setWires} = wires.actions;
export default wires.reducer;
