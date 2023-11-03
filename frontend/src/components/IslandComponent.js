import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Box, TextField, Checkbox, FormControlLabel, IconButton, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const OpIsland = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [src, setSrc] = useState('');
  const [dst, setDst] = useState('');
  const [locations, setLocations] = useState([]);

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

  const handleSubmit = async () => {
    try {
      const response = await fetch('/get-src-dst', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ src, dst }),
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await fetch(`/get-locations`, {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json',
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
                  control={<Checkbox />}
                  label="Free Route"
                  style={{ color: '#333333' }}
                />

                <FormControlLabel
                  control={<Checkbox />}
                  label="Fastest Route"
                  style={{ color: '#333333' }}
                />
                <div>
                {locations}
                lskdjf
                </div>
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