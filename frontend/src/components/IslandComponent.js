import React, { useState, useEffect } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, IconButton, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';


const OpIsland = ({ onPolylineChange, timeCost, spendCost }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [src, setSrc] = useState('');
  const [dst, setDst] = useState('');
  const [opt, setOpt] = useState(0);
  const [sliderValue, setSliderValue] = useState(5);
  const [locations, setLocations] = useState(0);

  const calculateDynamicHeight = () => {
    let dynamicHeight = '';

    const isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
      dynamicHeight = '40%'
    } else {
      dynamicHeight = '22%'
    }

    return dynamicHeight;
  };

  const opIslandStyle = {
    position: 'absolute',
    bottom: isExpanded ? '0vh' : '0',
    left: '50%',
    width: '100%',
    transform: 'translateX(-50%)',
    transition: 'height 0.3s ease',
    borderRadius: '15px',
    height: isExpanded ? calculateDynamicHeight() : '5vh',
    display: 'flex',
    flexDirection: 'column',
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
        }
      });
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
    <div style={opIslandStyle}>
      <Box
        style={{
          backgroundColor: '#fafafa',
          color: '#333333',
          padding: '1rem',
          overflow: 'hidden',
          borderRadius: '15px',
          height: '100%',
        }}
      >
        <div style={{ flex: 1, marginRight: '1.5rem' }}>
          {isExpanded && (
            <>
              <Autocomplete
                fullWidth
                options={locations}
                value={src}
                onChange={(event, newValue) => {
                  setSrc(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="src" variant="outlined" style={{ marginBottom: '1rem' }} />
                )}
              />
              <Autocomplete
                fullWidth
                options={locations}
                value={dst}
                onChange={(event, newValue) => {
                  setDst(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="dst" variant="outlined" style={{ marginBottom: '1rem' }} />
                )}
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
              <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <SpeedIcon style={{ marginRight: '8px' }} />
                <Slider
                  value={sliderValue}
                  min={0}
                  max={10}
                  step={1}
                  onChange={handleSliderChange}
                  disabled={opt !== 2}
                />
                <MoneyOffIcon style={{ marginLeft: '8px' }} />

              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{ marginRight: '1rem' }}
                >
                  View Route
                </Button>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {timeCost != null && (
                    <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon color="primary" style={{ marginRight: '8px' }} />
                      <Typography color="#616161" variant="body1" style={{ marginBottom: '0' }}>
                        Estimated time: {timeCost} mins
                      </Typography>
                    </div>
                  )}
                  {spendCost != null && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoneyIcon color="primary" style={{ marginRight: '8px' }} />
                      <Typography color="#616161" variant="body1" style={{ marginBottom: '0' }}>
                        Estimated cost: {spendCost} dollars
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </>

          )}
        </div>
        <div>
          <IconButton
            onClick={toggleExpand}
            style={{ color: 'grey', position: 'absolute', bottom: '5px', right: '5px' }}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
      </Box>
    </div>
  );
};

export default OpIsland;