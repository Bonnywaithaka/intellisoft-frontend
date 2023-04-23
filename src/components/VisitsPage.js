import React, { useState, useEffect } from 'react';
import SectionA from './SectionA';
import SectionB from './SectionB';
import { Box, Button, Divider, TextField, Typography, styled } from '@mui/material';

function VisitsPage({id}) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState('');
  const [showHealthForm1, setShowHealthForm1] = useState(false);
  const [showHealthForm2, setShowHealthForm2] = useState(false);

  const StyledTextField = styled(TextField)(()=>({
    margin:10
  }))

  useEffect(() => {
    let heightInMeters=height/100;
    if (height && weight) {
      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(calculatedBMI);
    } else {
      setBMI('');
    }
  }, [height, weight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {id, date, height, weight, bmi };
    fetch('http://localhost:4000/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully!');
          if (bmi < 25) {
            setShowHealthForm1(true);
          } else {
            setShowHealthForm2(true);
          }
        } else {
          alert('Error saving data!');
        }
      })
      .catch((error) => {
        alert('Error saving data!');
      });
  };

  return (
    <Box>
      {!showHealthForm1 && !showHealthForm2 && (
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Visits</Typography>
          <Typography variant='h6'>Vitals Section</Typography>
          <Divider />
          <Box sx={{display:"flex", flexDirection:"column"}}>
          <StyledTextField
            label="Date"
            type="date"
            value={date}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Box sx={{padding:1}}>
             <TextField
          label="Height(cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
            required
          />
          </Box>
         
           <Box sx={{padding:1}}>
          <TextField
          label="Weight(Kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Math.max(0, e.target.value))}
            fullWidth
            required
          />
          </Box>
          <StyledTextField label="BMI" type="number" value={bmi} disabled />
          
          <Button type="submit" variant="contained">Save</Button>
          </Box>
        </form>
      )}
      {showHealthForm1 && <SectionA />}
      {showHealthForm2 && <SectionB />}
    </Box>
  );
}

export default VisitsPage;
