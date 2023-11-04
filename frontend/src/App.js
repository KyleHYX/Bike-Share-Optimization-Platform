import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MapComponent from './components/MapComponent';
import OpIsland from './components/IslandComponent';

function App() {
  const [polylineData, setPolylineData] = useState('');

  const handlePolylineChange = (newPolyline) => {
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