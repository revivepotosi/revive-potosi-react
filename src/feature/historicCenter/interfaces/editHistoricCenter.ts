import { LatLngExpression } from 'leaflet';
import Image from '../../../interfaces/image';
import CategoryHistoricCenter from './categoryHistoricCenter';

interface Texts {
  name: string;
}

interface EditHistoricCenter {
  text: Record<string, Texts>;
  image?: Image;
  category: CategoryHistoricCenter;
  position: LatLngExpression;
}

export default EditHistoricCenter;
