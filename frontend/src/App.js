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

  const handlePolylineChange = (newPolyline) => {
    console.log("received new")

    console.log(newPolyline)
  
    setPolylineData(newPolyline);
  };

  return (
    <Container fluid>
      <MapComponent polylineData={polylineData} />
      <OpIsland onPolylineChange={handlePolylineChange} />
    </Container>
  );
}

export default App;