import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { setLanguage } from '../../redux/languageSlice'
import Languages from '../../constants/languages';
import style from './style';
import { RootState } from '../../app/store';

interface Props {
  color?: 'primary' | 'secondary' | 'white';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
};

const LanguageSelector = ({ color = 'primary', size = 'medium', sx }: Props) => {
  const language = useSelector((state: RootState) => state.language.language);
  const [languagePrefix, setLanguagePrefix] = useState(language.prefix);

  const dispatch = useDispatch()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguagePrefix: string,
  ) => {
    if (!event) return;
    if (!newLanguagePrefix) return;
    const newLanguage = Languages.find((languageItem) => languageItem.prefix === newLanguagePrefix);
    if (!newLanguage) return;
    setLanguagePrefix(newLanguagePrefix);
    dispatch(setLanguage(newLanguage));
  };
  return (
    <ToggleButtonGroup
      value={languagePrefix}
      exclusive
      onChange={handleChange}
      aria-label="Language"
      size={size}
      sx={sx}
    >
      {Languages.map((languageItem) => (
        <ToggleButton
          value={languageItem.prefix}
          key={languageItem.id}
          sx={style(color)}
        >
          {languageItem.prefix}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LanguageSelector;
