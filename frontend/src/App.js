import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MapComponent from './components/MapComponent';
import OpIsland from './components/IslandComponent';

function App() {
  const [polylineData, setPolylineData] = useState([
    { lat: 49.26249, lng: -123.11422 },
    { lat: 49.26244, lng: -123.11422 },
    { lat: 49.26243, lng: -123.1142 }
  ]);
  const [markerData, setMarkerData] = useState([]);

  const handlePolylineChange = (newData) => {
    console.log("received new")

    console.log(newData)
  
    setPolylineData(newData.parsed_lines);
    setMarkerData(newData.parsed_markers);
  };

  return (
    <Container fluid>
      <MapComponent polylineData={polylineData} markerData={markerData} />
      <OpIsland onPolylineChange={handlePolylineChange} />
    </Container>
  );
}

export default App;