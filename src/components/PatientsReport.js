import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Typography, styled } from "@mui/material";

  const StyledTextField = styled(TextField)(()=>({
    margin:10
  }))

function PatientsReport() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);

    axios
      .get(`http://localhost:4000/patients?date=${formattedDate}`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDate]);

  console.log(selectedDate);
  console.log(patients);

  function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return "failed DOB"; 
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <Box>
      <Typography variant="h4">Patient Report</Typography>
      <Box sx={{border:"1px solid", padding:2,}}>
      <StyledTextField
      label="filter by Date"
        type="date"
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={(event) =>
          setSelectedDate(new Date(event.target.value))
        }
      />

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>BMI Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{`${patient.first_name} ${patient.last_name}`}</td>
              <td>{calculateAge(patient.dob)}</td>
              <td>
                {patient.bmi < 18.5
                  ? "Underweight"
                  : patient.bmi >= 18.5 && patient.bmi < 25
                  ? "Normal"
                  : "Overweight"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Box>
    </Box>
  );
}

export default PatientsReport;
