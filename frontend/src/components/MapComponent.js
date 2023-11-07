import React from 'react';
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';

const MapComponent = ({ polylineData }) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  };

  const center = {
    lat: 49.26249,
    lng: -123.11422
  };

  const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  const { isLoaded } = useJsApiLoader({id: 'google-map-script', googleMapsApiKey: 'AIzaSyB_qcC0gZ_KdDt48vDlhyRZX6xswDAmH_E'})

  const [map, setMap] = React.useState(null)

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
       <Polyline
          path={polylineData}
          options={polylineOptions}
        />
      </GoogleMap>
  ) : <></>
};

export default React.memo(MapComponent);