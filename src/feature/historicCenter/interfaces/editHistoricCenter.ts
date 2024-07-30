import Image from '../../../interfaces/image';
import CategoryHistoricCenter from './categoryHistoricCenter';

interface Texts {
  name: string;
}

interface EditHistoricCenter {
  text: Record<string, Texts>;
  image?: Image;
  category: CategoryHistoricCenter;
}

export default EditHistoricCenter;
