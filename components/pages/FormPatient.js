import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { StyleSheet } from "react-native";

import BasicInformation from "./FormPatientSections/BasicInformation";
import ContactInformation from "./FormPatientSections/ContactInformation";
import PersonalInformation from "./FormPatientSections/PersonalInformation";
import Patient from "./Patient";

const styles = StyleSheet.create({});

const FormPatient = ({
  setSection,
  token,
  patientId,
  photo,
  name,
  lastNames,
  phone,
  email,
  province,
  canton,
  district,
  address,
  gender,
  birthDate,
  occupation,
  health,
  setPhoto,
  setName,
  setLastNames,
  setPhone,
  setEmail,
  setProvince,
  setCanton,
  setDistrict,
  setAddress,
  setGender,
  setBirthDate,
  setOccupation,
  setHealth,
}) => {
  let history = useHistory();

  useEffect(() => {
    setSection(`Crear: ${patientId}`);
    console.log(name);
  }, [history]);

  const formSections = [
    <BasicInformation
      photo={photo}
      setPhoto={setPhoto}
      name={name}
      setName={setName}
      lastNames={lastNames}
      setLastNames={setLastNames}
    />,
    <ContactInformation
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      province={province}
      setProvince={setProvince}
      canton={canton}
      setCanton={setCanton}
      district={district}
      setDistrict={setDistrict}
      address={address}
      setAddress={setAddress}
    />,
    <>
      <PersonalInformation
        gender={gender}
        setGender={setGender}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        occupation={occupation}
        setOcupation={setOccupation}
        health={health}
        setHealth={setHealth}
      />
    </>,
    <Patient
      patientId={patientId}
      photo={photo}
      name={name}
      lastNames={lastNames}
      phone={phone}
      email={email}
      province={province}
      canton={canton}
      district={district}
      address={address}
      gender={gender}
      birthDate={birthDate}
      occupation={occupation}
      health={health}
      preview={true}
    />,
  ];
  return (
    <>
      {(!token || token === "") && <Redirect to="/" />}
      <Paginator sections={formSections}></Paginator>
    </>
  );
};

export default FormPatient;
