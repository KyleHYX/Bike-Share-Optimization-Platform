import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Polyline, OverlayView } from '@react-google-maps/api';

const MapComponent = ({ polylineData, markerData, locations }) => {
  // ORI/DST
  const [locMode, setLocMode] = useState('');
  const [oriLoc, setOriLoc] = useState(null);
  const [dstLoc, setDstLoc] = useState(null);

  const onMapClick = (e) => {
    const loc = {
      lat: e.latLng.lat(),
      lng: e.latLng.lat(),
    };

    if (locMode === 'ORI') {
      setOriLoc(loc);
      setLocMode('');
    } else if (locMode === 'DST') {
      setDstLoc(loc);
      setLocMode('');
    }
  };

  const setLocModeOri = () => setLocMode('ORI')
  const setLocModeDst = () => setLocMode('DST')

  const CustomMarker = ({ position, iconUrl, text }) => {
    const markerStyle = {
      position: 'absolute',
      transform: 'translate(-50%, -100%)',
      textAlign: 'center',
    };

    const textStyle = {
      color: 'blue',
      fontSize: '8px',
      whiteSpace: 'nowrap',
    };

    return (
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div style={markerStyle}>
          <img src={iconUrl} style={{ height: '28px' }} />
          <div style={textStyle}>{text}</div>
        </div>
      </OverlayView>
    );
  };

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

  const barIndicateSytle = {
    height: '10px',
    backgroundColor: 'orange',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
  };

  const modeButtonStyle = {
    position: 'absolute',
    zIndex: 10,
  }

  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY })

  return (
    <div>
      {locMode != '' ? <div style={barIndicateSytle}></div> : <></>}
      {oriLoc != null ? <div style={barIndicateSytle}>{oriLoc.lat}{oriLoc.lng}</div> : <></>}
      <div>
        <button style={modeButtonStyle} onClick={setLocModeOri}>Set Origin</button>
        <button stype={modeButtonStyle} onClick={setLocModeDst}>Set Destination {dstLoc}</button>
      </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={onMapClick}
          >
            <Polyline
              path={polylineData}
              options={polylineOptions}
            />

            {markerData.map((markerPosition, index) => {
              let iconUrl;
              if (index === 0) iconUrl = "https://maps.gstatic.com/mapfiles/ms2/micons/blue.png";
              else if (index === markerData.length - 1) iconUrl = "http://maps.gstatic.com/mapfiles/ms2/micons/pink.png";
              else iconUrl = "http://maps.gstatic.com/mapfiles/ms2/micons/cycling.png";

              return (
                <CustomMarker
                  key={index}
                  position={markerPosition.pos}
                  iconUrl={iconUrl}
                  text={markerPosition.station}
                />
              );
            })}
          </GoogleMap>
        ) : <></>}
        </div>
  );
};

export default React.memo(MapComponent);