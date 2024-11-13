import { LegacyRef, MutableRefObject } from 'react';
import { LatLngExpression, Marker as LeafletMarket, LeafletEventHandlerFnMap, Icon } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Box, SxProps, Theme } from '@mui/material';
import ActionsMap from './ActionsMap';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface Props {
  position: LatLngExpression;
  sx?: SxProps<Theme>;
  id?: string;
  draggable?: boolean;
  eventHandlers?: LeafletEventHandlerFnMap;
  actionRef?: MutableRefObject<any>;
  markerRef?: LegacyRef<LeafletMarket>;
}

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const FormMap = ({ position, sx, id, draggable, eventHandlers, markerRef, actionRef }: Props) => {
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
      <MapContainer id={id} center={position} zoom={16} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker ref={markerRef} position={position} draggable={draggable} eventHandlers={eventHandlers} icon={defaultIcon} />
        <ActionsMap ref={actionRef} />
      </MapContainer>
    </Box>
  );
};

export default FormMap;
