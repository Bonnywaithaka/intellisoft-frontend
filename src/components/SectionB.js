import React, { useState } from "react";
import PatientsReport from "./PatientsReport";
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";


function SectionB() {
  const [healthStatus, setHealthStatus] = useState("");
  const [dietHistory, setDietHistory] = useState("");
  const [comments, setComments] = useState("");
  const [showPatientReport, setShowPatientReport] = useState(false);
  
  const handleHealthChange = (event) => {
    setHealthStatus(event.target.value);
  };

  const handleDietChange = (event) => {
    setDietHistory(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPatientReport(true);
  };

  return (
    <Box>
       {showPatientReport ? (
        <PatientsReport />
      ) : (

      <form onSubmit={handleSubmit}>
        <Box>
        <Typography variant="h4">Section B</Typography>
        <Divider/>
        <Box>
           <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">General Health:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={healthStatus}
        onChange={handleHealthChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Good" />
        <FormControlLabel value="male" control={<Radio />} label="Poor" />
      </RadioGroup>
</FormControl>
        </Box>
        <Box>
<FormControl>
       <FormLabel id="demo-controlled-radio-buttons-group">Are you currently taking any drugs?:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={dietHistory}
        onChange={handleDietChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Yes" />
        <FormControlLabel value="male" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>

        </Box> 
        </Box>
        <Box>
          <TextField
          label="Comments"
          type="text"
          fullWidth
            value={comments}
            onChange={(e)=>setComments(e.target.value)}
            rows={4}
            multiline
          />
        </Box>
        <Button type="submit" variant="contained" sx={{margin:2}}>Submit</Button>
      </form>
      )}
    </Box>
   
  );
}

export default SectionB;
