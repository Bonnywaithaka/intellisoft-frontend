import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import VisitsPage from "./VisitsPage";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [showVisitsPage, setShowVisitsPage] = useState(false);
   const [idValue,setIdValue]=useState(0)

   const recordVisits=(id)=>{
    console.log(id)
     setShowVisitsPage(true);
     setIdValue(id)
   }

  useEffect(() => {
    axios
      .get("http://localhost:4000/patientsList")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("patients", patients);


  return (
    <Box sx={{margin:"0px 0px 0px 30px"}}>
   
{!showVisitsPage && (
   <Box>
<Box>
  <Typography >
Patients List
  </Typography>
  </Box>
  <Box sx={{
    border:"1px solid",
  }}>
    {patients.map(p=>(
      <Box key={p.id} sx={{ display:"flex" ,borderBottom:"1px solid gray", padding:1}} onClick={()=>recordVisits(p.id)}>
       <Box sx={{mr:2}}> {p.id}</Box>
      <Box sx={{mr:2}}> { `${p.first_name} ${p.last_name}`}</Box>
       <Box sx={{mr:2}}> {p.gender}</Box>
      </Box>
    ))}
  </Box>
  
  </Box>
)}


   {showVisitsPage && <VisitsPage id={idValue}/>}
    </Box>
  );
}

export default PatientList;
