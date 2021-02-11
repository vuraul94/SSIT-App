import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { StyleSheet } from "react-native";

import BasicInformation from "./FormPatientSections/BasicInformation";
import ContactInformation from "./FormPatientSections/ContactInformation";
import PersonalInformation from "./FormPatientSections/PersonalInformation";

const styles = StyleSheet.create({});

const FormPatient = ({ setSection, token }) => {
  const [province, setProvince] = useState("");
  const [canton, setCanton] = useState("");
  const [district, setDistrict] = useState("");

  const [gender, setGender] = useState("masculino");

  useEffect(() => {
    setSection("Crear");
  }, []);

  const formSections = [
    <BasicInformation />,
    <ContactInformation
      province={province}
      setProvince={setProvince}
      canton={canton}
      setCanton={setCanton}
      district={district}
      setDistrict={setDistrict}
    />,
    <>
      <PersonalInformation gender={gender} setGender={setGender} />
    </>,
  ];
  return (
    <>
      {/* {(!token || token === "") && <Redirect to="/" />} */}
      <Paginator sections={formSections}></Paginator>
    </>
  );
};

export default FormPatient;
