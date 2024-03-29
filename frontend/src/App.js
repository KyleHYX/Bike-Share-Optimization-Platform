import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MapComponent from './components/MapComponent';
import OpIsland from './components/IslandComponent';

function App() {
  const [polylineData, setPolylineData] = useState([]);
  const [markerData, setMarkerData] = useState([]);
  const [timeCost, setTimeCost] = useState(null);
  const [spendCost, setSpendCost] = useState(null);


  const handlePolylineChange = (newData) => {
    console.log("received new")

    console.log(newData)
  
    setPolylineData(newData.parsed_lines);
    setMarkerData(newData.parsed_markers);
    setTimeCost(newData.time_cost);
    setSpendCost(newData.spend_cost);
  };

  return (
    <Container fluid>
      <MapComponent polylineData={polylineData} markerData={markerData} />
      <OpIsland onPolylineChange={handlePolylineChange} spendCost={spendCost} timeCost={timeCost} />
    </Container>
  );
}

export default App;