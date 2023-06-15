// FormOne.js
import React, { useState } from "react";
import logo from "../assets/images/5607.svg";
import "./App.css";
import { Box, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

const Site = () => {
  const [site, setSite] = useState("");
  const handleChange = (event) => {
    setSite(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <Box
          sx={{ minWidth: 220, marginBottom: "20px", marginTop: "-20px" }}
        >
          <Button
            sx={{ minWidth: 220, marginBottom: "20px" }}
            type="submit"
            variant="contained"
            className="App-link"
            onClick={() => window.location.href = `/generatereports`}
          >
            Generate Reports
          </Button>
        </Box>
        <Box
          sx={{ minWidth: 220, marginBottom: "20px", marginTop: "-20px" }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              <NearMeIcon />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={site}
              name="name"
              label="Site"
              onChange={handleChange}
              MenuProps={{
                style: {
                  maxHeight: "300px",
                  maxWidth: "300px"
                },
              }}
            >
              <MenuItem value={`CAS431`}>CAS431</MenuItem>
              <MenuItem value={`CHI935_N`}>CHI935_N</MenuItem>
              <MenuItem value={`ASS001`}>ASS001</MenuItem>
              <MenuItem value={`KEN304`}>KEN304</MenuItem>
              <MenuItem value={`TRT829`}>TRT829</MenuItem>
              <MenuItem value={`TEM060`}>TEM060</MenuItem>
              <MenuItem value={`TAZ896`}>TAZ896</MenuItem>
              <MenuItem value={`TAO217`}>TAO217</MenuItem>
              <MenuItem value={`TAN708`}>TAN708</MenuItem>
              <MenuItem value={`MOH641`}>MOH641</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{ minWidth: 220, marginBottom: "20px" }}
          type="submit"
          variant="contained"
          className="App-link"
          disabled={!site}
          onClick={() => window.location.href = `/scan?site=${site}`}
        >
          Continue
        </Button>
      </header>
    </div >
  );
}

export default Site;
