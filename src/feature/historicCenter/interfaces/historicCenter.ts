import Image from '../../../interfaces/image';
import CategoryHistoricCenter from './categoryHistoricCenter';

interface Texts {
  name: string;
}

interface HistoricCenter {
  id?: string;
  text: Record<string, Texts>;
  category: CategoryHistoricCenter;
  image: Image;
}

export default HistoricCenter;
