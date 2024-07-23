import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Language from '../interfaces/language';
import Languages from '../constants/languages';

export interface LanguageState {
  language: Language,
}

const initialState: LanguageState = {
  language: JSON.parse(localStorage.getItem('language') ?? JSON.stringify(Languages[0])) as Language,
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      const newLanguage = action.payload;
      state.language = newLanguage;
      localStorage.setItem('language', JSON.stringify(newLanguage));
    },
  },
})

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
