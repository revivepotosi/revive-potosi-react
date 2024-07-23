import { IconButton } from '@mui/material';
import logoImage from '../../assets/logo.png';
import logoImageWhite from '../../assets/logo-white.png';

interface Props {
  size?: 's' | 'm' | 'l' | 'xl',
  onClick?: () => void,
  sx?: any,
  style?: any,
  white?: boolean,
};

const sizes = {
  s: 30,
  m: 50,
  l: 100,
  xl: 250,
};


const Logo = ({ onClick, sx, style, size = 's', white = false }: Props) => {
  const renderLogo = () => <img src={white ? logoImageWhite : logoImage} width={sizes[size]} height={sizes[size]} alt='Logo Revive Potosi' style={style} />;
  const renderLogoButton = () => (
    <IconButton onClick={onClick} sx={{ padding: 0, ...sx }}>
      { renderLogo() }
    </IconButton>
  );
  return ( onClick ? renderLogoButton() : renderLogo() );
};

export default Logo;
