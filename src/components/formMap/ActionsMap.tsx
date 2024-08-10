import { forwardRef, useImperativeHandle } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

const ActionsMap = forwardRef((_: unknown, ref) => {
  const map = useMap();
  useImperativeHandle(ref, () => ({
    changeCenter: (position: LatLngExpression) => {
      map.setView(position);
    }
  }));
  return <></>;
});

export default ActionsMap;
