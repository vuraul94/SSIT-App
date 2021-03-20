import React from "react";
import { Button } from "react-native-paper";
import { Link } from "react-router-dom";

const PatientOptions = ({ patientData }) => {
  return (
    <>
      <Link to="/patient" {...patientData}>
        <Button>Acceder a Información</Button>
      </Link>
    </>
  );
};

export default PatientOptions;
