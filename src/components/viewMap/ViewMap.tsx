import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Box, SxProps, Theme } from '@mui/material';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface Props {
  position: LatLngExpression;
  sx?: SxProps<Theme>;
}

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ViewMap = ({ position, sx }: Props) => {
  const openPosition = (lat: number, lng: number) => {
    const latlng= `${lat.toString(10)},${lng.toString(10)}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${latlng}`;
    window.open(url, '_blank');
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: '1rem',
        height: { xs: '18rem', lg: '20rem' },
        ...sx,
      }}
    >
      <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          eventHandlers={{
            click: (e) => {
              openPosition(e.latlng.lat, e.latlng.lng);
            },
          }}
          icon={defaultIcon}
        />
      </MapContainer>
    </Box>
  );
};

export default ViewMap;
