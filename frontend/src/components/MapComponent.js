import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  };

  const center = {
    lat: 49.2827,
    lng: 123.1207
  };

  const polylineOptions = {
    strokeColor: '#ff2527',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ff2527',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [],
    zIndex: 1
  };

  const google = window.google;
  
  const MapComponent = ({ polylineData }) => (
    <LoadScript
        googleMapsApiKey="AIzaSyB_qcC0gZ_KdDt48vDlhyRZX6xswDAmH_E">
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        >
          {polylineData && (
            <Polyline
              path={google.maps.geometry.encoding.decodePath(polylineData)}
              options={polylineOptions}
            />
          )}
        </GoogleMap>
    </LoadScript>
  );

  export default MapComponent;