interface Props {
  src: string;
  alt: string;
  style?: any;
}

const Image = ({ src, alt, style }: Props) => (
  <img
      src={src}
      style={{ display: 'block', borderRadius: '0.25rem', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', ...style}}
      alt={alt}
    />
);

export default Image;
