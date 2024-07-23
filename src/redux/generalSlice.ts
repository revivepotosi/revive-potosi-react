import { createSlice } from '@reduxjs/toolkit';

export interface GeneralState {
  loading: boolean,
}

const initialState: GeneralState = {
  loading: false,
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    openLoader: (state) => {
      state.loading = true;
    },
    closeLoader: (state) => {
      state.loading = false;
    },
  },
})

export const { openLoader, closeLoader } = generalSlice.actions;

export default generalSlice.reducer;
