interface Texts {
  name: string;
}
interface ContentType {
  id: string;
  text: Record<string, Texts>;
}

const contentTypes: ContentType[] = [
  {
    id: 'title',
    text: {
      ES: {
        name: 'Título',
      },
      EN: {
        name: 'Title',
      },
    },
  },
  {
    id: 'subtitle',
    text: {
      ES: {
        name: 'Subtítulo',
      },
      EN: {
        name: 'Subtitle',
      },
    },
  },
  {
    id: 'image',
    text: {
      ES: {
        name: 'Imagen',
      },
      EN: {
        name: 'Image',
      },
    },
  },
  {
    id: 'paragraph',
    text: {
      ES: {
        name: 'Párrafo',
      },
      EN: {
        name: 'Paragraph',
      },
    },
  },
];

export default contentTypes;
