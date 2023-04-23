import React, { useState } from "react";
import { Box, Button, Divider, MenuItem, TextField, Typography, styled } from "@mui/material";
import PatientList from "./PatientsList";

  const StyledTextField = styled(TextField)(()=>({
    margin:10
  }))

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
 

  const currentDate = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          gender: gender,
        }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while submitting the form.");
      }

      const data = await response.json();
      console.log(data);
      alert("Patient successfully Added"); // show success message
      setFirstName("");
      setLastName("");
      setDob("");
      setGender("");
    } catch (error) {
      console.error(error);
      alert("Ooops! Failed!!! Check on your Server connection.");
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setGender("");
  };

  return (
    <Box 
    sx={{
      display:"flex",
      justifyContent:"space-between"

    }}>
<form onSubmit={handleSubmit}>
          <Typography variant="h4">Registration Page</Typography>
          <Divider/>
        <Box sx={{display:"flex",flexDirection:"column"}}>
            <StyledTextField
            label="First Name"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <StyledTextField/>
            <StyledTextField
            label="Last Name"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
        
            <StyledTextField
            label="D.O.B"
              type="date"
              value={dob}
              max={currentDate}
              onChange={(event) => setDob(event.target.value)}
            />
        
          
            <StyledTextField
            label="select Gender"
            select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <MenuItem value="">-- Select Gender --</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </StyledTextField>
          
</Box>
<Box sx={{display: "flex", justifyContent:"space-evenly"}}>
   <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>  
</Box>
          
        </form>
        
           <PatientList />
      </Box>
  );
}

export default Registration;

   
