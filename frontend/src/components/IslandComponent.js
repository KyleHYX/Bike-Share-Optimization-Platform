import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Slider } from '@mui/material';
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
  const [sliderValue, setSliderValue] = useState(5);
  const [locations, setLocations] = useState([]);

  const calculateDynamicHeight = () => {
    let dynamicHeight = '';

    const isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
      dynamicHeight = '55%'
    } else {
      dynamicHeight = '40%'
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

  const handleSrcChange = (event, newValue) => {
    setSrc(newValue);
    //handleSubmit();
  };

  const handleDstChange = (event, newValue) => {
    setDst(newValue);
    //handleSubmit();
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    //handleSubmit();
  };

  const handleSubmit = async () => {
    if (src !== "" && dst !== '' && locations.includes(src) && locations.includes(dst)) {
      try {
        const response = await fetch('http://localhost:3333/get-src-dst', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ src, dst, sliderValue }),
        });

        const data = await response.json();
        console.log(data);
        onPolylineChange(data);
      } catch (error) {
        console.error('Error submitting the form', error);
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [src, dst, sliderValue]);

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
                getOptionLabel={(option) => typeof option === 'string' ? option : option.toString()}
                value={src}
                onChange={(event, newValue) => {
                  handleSrcChange(event, newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="src" variant="outlined" style={{ marginBottom: '1rem' }} />
                )}
              />
              <Autocomplete
                fullWidth
                options={locations}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.toString()}
                value={dst}
                onChange={(event, newValue) => {
                  handleDstChange(event, newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="dst" variant="outlined" style={{ marginBottom: '1rem' }} />
                )}
              />

              <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <MoneyOffIcon style={{ marginLeft: '8px' }} />
                <Slider
                  value={sliderValue}
                  min={0}
                  max={10}
                  step={1}
                  onChange={handleSliderChange}
                />
                <SpeedIcon style={{ marginRight: '8px' }} />

              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
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