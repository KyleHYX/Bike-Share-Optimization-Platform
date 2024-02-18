import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MapComponent from './components/MapComponent';
import OpIsland from './components/IslandComponent';
import LoginComponent from './components/LoginComponent'
import { useAuth } from './components/AuthContext'


function App() {
  const [polylineData, setPolylineData] = useState([]);
  const [markerData, setMarkerData] = useState([]);
  const [timeCost, setTimeCost] = useState(null);
  const [spendCost, setSpendCost] = useState(null);
  const [locations, setLocations] = useState([]);
  const [oriLoc, setOriLoc] = useState(null);
  const [dstLoc, setDstLoc] = useState(null);
  const [oriStationInfo, setOriStationInfo] = useState(null);
  const [dstStationInfo, setDstStationInfo] = useState(null);
  const [showTapLoc, setShowTapLoc] = useState(false);
  const [locMode, setLocMode] = useState('');

  useEffect(() => {
    setShowTapLoc(oriLoc !== null && dstLoc !== null);
  }, [oriLoc, dstLoc]);

  // method moved from IslandComponent
  // acquire locations here as both map component and island component need locations
  useEffect(() => {
    const getLocations = async () => {
      console.log(process.env.REACT_APP_BACKEND_URL)
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-locations`, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain',
          }
        });
        const data = await response.json();
        setLocations(data);
        console.log(locations)
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    getLocations();
  }, []);


  const handlePolylineChange = (newData) => {
    console.log("received new")

    console.log(newData)
  
    setPolylineData(newData.parsed_lines);
    setMarkerData(newData.parsed_markers);
    setTimeCost(newData.time_cost);
    setSpendCost(newData.spend_cost);
  };

  const { user } = useAuth();

  if (!user) {
    return (
      <LoginComponent />
    );
  }

  return (
    <Container fluid>
      <MapComponent polylineData={polylineData} markerData={markerData} locations={locations} oriLoc={oriLoc}
      dstLoc={dstLoc} showTapLoc={showTapLoc} setOriLoc={setOriLoc} setDstLoc={setDstLoc} locMode={locMode} setLocMode={setLocMode} 
      setOriStationInfo={setOriStationInfo} setDstStationInfo={setDstStationInfo} />
      <OpIsland onPolylineChange={handlePolylineChange} spendCost={spendCost} timeCost={timeCost} 
      locations={locations} setOriLoc = {setOriLoc} setDstLoc = {setDstLoc} setLocMode={setLocMode} showTapLoc={showTapLoc}
      oriLoc={oriLoc} dstLoc={dstLoc} oriStationInfo={oriStationInfo} dstStationInfo={dstStationInfo}/>
    </Container>
  );
}

export default App;