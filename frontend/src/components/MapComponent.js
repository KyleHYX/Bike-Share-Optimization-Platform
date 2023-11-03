import { GoogleMap, LoadScript } from '@react-google-maps/api';

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

  const MapComponent = () => (
    <LoadScript
        googleMapsApiKey="">
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        zoomControlOptions={{ 
            position: 5
        }}
        >
        </GoogleMap>
    </LoadScript>
  );

  export default MapComponent;