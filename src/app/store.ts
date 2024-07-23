import { configureStore } from '@reduxjs/toolkit';
import generalReducer from '../redux/generalSlice'
import languageReducer from '../redux/languageSlice';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
