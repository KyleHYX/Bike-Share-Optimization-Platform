import { Container } from 'react-bootstrap';
import MapComponent from './components/MapComponent';
import OpIsland from './components/IslandComponent';

function App() {
  return (
    <Container fluid>
      <MapComponent />

      <OpIsland />
    </Container>
  );
}

export default App;