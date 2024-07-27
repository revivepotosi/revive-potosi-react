import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const useHistoricCenter = () => {
  const language = useSelector((state: RootState) => state.language.language);
  return {
    language,
  };
};

export default useHistoricCenter;
