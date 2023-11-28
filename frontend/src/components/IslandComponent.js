import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, TextField, Checkbox, FormControlLabel, IconButton, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const OpIsland = ({ onPolylineChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [src, setSrc] = useState('');
  const [dst, setDst] = useState('');
  const [opt, setOpt] = useState(0);
  const [sliderValue, setSliderValue] = useState(5);
  const [locations, setLocations] = useState(0);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSrcChange = (event) => {
    setSrc(event.target.value);
  };

  const handleDstChange = (event) => {
    setDst(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setOpt(Number(event.target.value));
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3333/get-src-dst', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ src, dst, opt, sliderValue }),
      });

      const data = await response.json();
      console.log(data);
      onPolylineChange(data);
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await fetch(`http://localhost:3333/get-locations`, { 
        method: 'GET', 
        headers: {
          'Content-Type': 'text/plain',
      }});
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = await getLocations();
      if (fetchedLocations) {
        setLocations(fetchedLocations);
      }
    };
    
    fetchLocations();
  }, []);

  return (
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
                  value={src}
                  onChange={handleSrcChange}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="dst"
                  variant="outlined"
                  value={dst}
                  onChange={handleDstChange}
                  style={{ marginBottom: '1rem' }}
                />

                <FormControlLabel
                  control={<Checkbox 
                    checked={opt === 1}
                    onChange={handleCheckboxChange} 
                    value="1" />}
                  label="Free Route"
                  style={{ color: '#333333' }}
                />

                <FormControlLabel
                  control={<Checkbox 
                    checked={opt === 0}
                    onChange={handleCheckboxChange} 
                    value="0" />}
                  label="Fastest Route"
                  style={{ color: '#333333' }}
                />

                <FormControlLabel
                  control={<Checkbox 
                    checked={opt === 2}
                    onChange={handleCheckboxChange}
                    value="2" />}
                  label="Skyline Routes"
                  style={{ color: '#333333' }}
                />

                <Slider
                  value={sliderValue}
                  min={0}
                  max={10}
                  step={1}
                  onChange={handleSliderChange}
                  disabled={opt !== 2}
                />
              </>
            )}
            <Button onClick={handleSubmit}>Submit</Button>
            <IconButton
              onClick={toggleExpand}
              style={{ color: 'grey', position: 'absolute', bottom: '5px', right: '5px'}}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
      </Col>
    </Row>
  );
};

export default OpIsland;