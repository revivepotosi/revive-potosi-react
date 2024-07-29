import Image from '../../../interfaces/image';

interface Texts {
  name: string;
}

interface EditCategory {
  text: Record<string, Texts>;
  image?: Image;
}

export default EditCategory;
