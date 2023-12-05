import React from 'react';
import { GoogleMap, useJsApiLoader, Polyline, Marker } from '@react-google-maps/api';

const MapComponent = ({ polylineData, markerData }) => {
  const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

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

  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY })

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

      {markerData.map((markerPosition, index) => {
        let iconUrl;
        if (index === 0) iconUrl = "";
        else if (index === markerData.length - 1) iconUrl = "";
        else iconUrl = "https://maps.google.com/mapfiles/kml/shapes/cycling.png";

        return (
          <Marker
            key={index}
            position={markerPosition}
            icon={iconUrl}
          />
        );
      })}
    </GoogleMap>
  ) : <></>
};

export default React.memo(MapComponent);