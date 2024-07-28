import Image from '../../../interfaces/image';

interface Texts {
  name: string;
}

interface Category {
  id?: string;
  text: Record<string, Texts>;
  image: Image;
}

export default Category;
