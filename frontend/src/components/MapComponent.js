import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Polyline, OverlayView } from '@react-google-maps/api';

const MapComponent = ({ polylineData, markerData, locations, oriLoc, dstLoc, setOriLoc, setDstLoc, locMode, setLocMode, src, setSrc, dst, setDst }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (oriLoc != null && dstLoc != null) {
      nearestStation()
    }
  }, [oriLoc, dstLoc])

  const nearestStation = () => {
    const oriNearestStation = getNeareastStations(oriLoc)
    const dstNearestStation = getNeareastStations(dstLoc)

    console.log(oriNearestStation)
    console.log(dstNearestStation)
    setSrc(oriNearestStation)
    setDst(dstNearestStation)

    plotWalkingRoute(oriLoc, {lat: oriNearestStation[1], lng: oriNearestStation[2]})
    plotWalkingRoute(dstLoc, {lat: dstNearestStation[1], lng: dstNearestStation[2]})
  }

  const getNeareastStations = (tgtLoc) => {
    let nearestStation = null;
    let minDist = Number.MAX_VALUE;
    let locationsCord = locations.map(location => ({
      lat: location[1],
      lng: location[2]
    }));

    for (let i = 0; i < locationsCord.length; i++) {
      const curDist = getDist(tgtLoc, locationsCord[i]);
      if (curDist < minDist) {
        minDist = curDist;
        nearestStation = locations[i];
      }
    }

    return nearestStation;
  }

  // Haversin formula, credit to stackoverflow
  const getDist = (loc1, loc2) => {
    const R = 6371;
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const plotWalkingRoute = (tgtLoc, tgtStationLoc) => {
    if (!window.google || !mapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapRef.current);

    const walkingRouteRequest = {
      origin: tgtLoc,
      destination: tgtStationLoc,
      travelMode: window.google.maps.TravelMode.WALKING,
    };

    directionsService.route(walkingRouteRequest, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed: ' + status);
      }
    });
  };

  const onMapClick = (e) => {
    const loc = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    if (locMode === 'ORI') {
      setOriLoc(loc);
      setLocMode('');
    } else if (locMode === 'DST') {
      setDstLoc(loc);
      setLocMode('');
    }
  };

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

  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY })

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={onMapClick}
          onLoad={map => mapRef.current = map}
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