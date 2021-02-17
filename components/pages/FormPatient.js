import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { StyleSheet } from "react-native";

import BasicInformation from "./FormPatientSections/BasicInformation";
import ContactInformation from "./FormPatientSections/ContactInformation";
import PersonalInformation from "./FormPatientSections/PersonalInformation";
import Patient from "./Patient";
import { locations } from "../../misc/locations";

const styles = StyleSheet.create({});

const FormPatient = ({
  setSection,
  token,
  identificationNumber,
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
  createPatient,
}) => {
  let history = useHistory();

  useEffect(() => {
    setSection(`ID: ${identificationNumber}`);
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
        setOccupation={setOccupation}
        health={health}
        setHealth={setHealth}
      />
    </>,
    <Patient
      identificationNumber={identificationNumber}
      photo={photo}
      name={name}
      lastNames={lastNames}
      phone={phone}
      email={email}
      address={
        province !== "" &&
        canton !== "" &&
        district !== "" &&
        `${locations.province[province]}, ${locations.canton[province][canton]}, ${locations.district[province][canton][district]}. \n ${address}`
      }
      gender={gender}
      birthDate={birthDate}
      occupation={occupation}
      health={health}
      preview={true}
      createPatient={createPatient}
      token={token}
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
