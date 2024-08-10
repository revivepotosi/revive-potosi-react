import { useEffect, useMemo, useRef, useState } from 'react';
import { LatLngExpression, Marker } from 'leaflet';

interface Props {
  field: string;
  setFieldValue: (field: string, value: any) => any;
  hasInitialPosition?: boolean;
}

const useFormMap = ({ field, setFieldValue, hasInitialPosition = false }: Props) => {
  const [currentPositionLoading, setCurrentPositionLoading] = useState(true);
  const markerRef = useRef<Marker>(null);
  const actionRef = useRef<any>(null);

  const changeCenter = (newPosition: LatLngExpression) => {
    actionRef.current?.changeCenter(newPosition);
  }

  const eventMarkerHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosistion: LatLngExpression = {
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng,
          };
          setFieldValue(field, newPosistion);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if (hasInitialPosition) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords;
        const initialPosistion: LatLngExpression = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        setFieldValue(field, initialPosistion);
        changeCenter(initialPosistion);
        setCurrentPositionLoading(false);
      },
      (error) => {
        console.log(error);
        setCurrentPositionLoading(false)
      },
    );
  }, []);

  return {
    markerRef,
    actionRef,
    eventMarkerHandlers,
    currentPositionLoading,
    changeCenter,
  }
};

export default useFormMap;
