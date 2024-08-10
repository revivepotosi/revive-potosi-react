import { LatLngExpression } from 'leaflet';
import Content from '../../../interfaces/content';
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
  contents?: Content[];
  position: LatLngExpression;
}

export default HistoricCenter;
