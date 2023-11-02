import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box, TextField, Checkbox, FormControlLabel, IconButton, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  };

  const opIslandStyle = {
    position: 'absolute',
    bottom: isExpanded ? '0vh' : '0',
    left: '50%',
    width: '100%',
    transform: 'translateX(-50%)',
    transition: 'height 0.3s ease',
    borderRadius: '15px',
    height: isExpanded ? '40vh' : '10vh'
  };

  const center = {
    lat: 49.2827,
    lng: 123.1207
  };

  return (
    <Container fluid>
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

      <Row style={opIslandStyle}>
        <Col>
            <Box
              style={{
                backgroundColor: '#fafafa',
                color: '#333333',
                padding: '1rem',
                overflow: 'hidden',
                borderRadius: '15px'
              }}
            >
              {isExpanded && (
                <>
                  <TextField
                    fullWidth
                    label="src"
                    variant="outlined"
                    style={{ marginBottom: '1rem' }}
                  />
                  <TextField
                    fullWidth
                    label="dest"
                    variant="outlined"
                    style={{ marginBottom: '1rem' }}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Free Route"
                    style={{ color: '#333333' }}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Fastest Route"
                    style={{ color: '#333333' }}
                  />
                </>
              )}
              <IconButton
                onClick={toggleExpand}
                style={{ color: 'grey', position: 'absolute', bottom: '5px', right: '5px'}}
              >
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
        </Col>
      </Row>
    </Container>
  );
}

export default App;