import Image from '../../../interfaces/image';

interface Texts {
  name: string;
}

interface HistoricCenter {
  id?: string;
  text: Record<string, Texts>;
  image: Image;
}

export default HistoricCenter;
