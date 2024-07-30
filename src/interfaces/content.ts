import Image from './image';

export type ContentType = 'title' | 'subtitle' | 'image' | 'paragraph';

interface Texts {
  text: string;
}

interface Content {
  id?: string;
  type: ContentType;
  text?: Record<string, Texts>;
  image?: Image;
  alt?: string;
}

export default Content;
