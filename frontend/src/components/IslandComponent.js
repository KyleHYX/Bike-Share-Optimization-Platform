import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SignOut  from './SignoutComponent';


const OpIsland = ({ onPolylineChange, timeCost, spendCost, locations, setLocMode, showTapLoc, dst, setDst, src, setSrc }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sliderValue, setSliderValue] = useState(5);

  const calculateDynamicHeight = () => {
    let dynamicHeight = '';

    const isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
      dynamicHeight = '44%'
    } else {
      dynamicHeight = '25%'
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
  };

  const handleDstChange = (event, newValue) => {
    setDst(newValue);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleSubmit = async () => {
    if (src !== "" && dst !== '') {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-src-dst`, {
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

  const setLocModeOri = () => setLocMode('ORI')
  const setLocModeDst = () => setLocMode('DST')

  const modeButtonStyle = {
    position: 'absolute',
    zIndex: 10,
  }

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
              {/* <Autocomplete
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
              /> */}

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
              <div><SignOut></SignOut></div>
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

        <div>
        <button style={modeButtonStyle} onClick={setLocModeOri}>Set Origin</button>
        <button stype={modeButtonStyle} onClick={setLocModeDst}>Set Destination</button>
      </div>
      </Box>
    </div>
  );
};

export default OpIsland;