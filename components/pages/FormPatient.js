import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { StyleSheet } from "react-native";
import moment from "moment";

import BasicInformation from "./FormPatientSections/BasicInformation";
import ContactInformation from "./FormPatientSections/ContactInformation";
import PersonalInformation from "./FormPatientSections/PersonalInformation";
import Patient from "./Patient";
import { locations } from "../../misc/locations";
import { CONSTANTS } from "../../misc/constants";

const styles = StyleSheet.create({});

const FormPatient = ({
  setSection,
  token,
  identificationNumber,
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
  status,
  setPatientId,
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
  setStatus,
  patientStatusCatalog,
  genderCatalog,
}) => {
  let history = useHistory();

  useEffect(() => {
    setSection(`ID: ${identificationNumber}`);
  }, [history]);

  const createPatient = (history) => {
    const patient = {
      PatientId: patientId,
      Name: name,
      Surnames: lastNames,
      Phones: phone,
      IdentificationNumber: `${
        countryCatalog[country - 1].Abbreviation
      }${identificationNumber}`,
      GenderId: parseInt(2),
      EmailAddress: email,
      Birthdate: moment(birthDate, "DD/MM/YYYY"),
      Age: parseInt(
        moment(birthDate)
          .fromNow(true)
          .replace(" years", "")
          .replace(" años", "")
      ),
      AddressDetail: `${locations.province[province]}, ${locations.canton[province][canton]}, ${locations.district[province][canton][district]}. \n ${address}`,
      Occupation: occupation,
      PatientStatus: parseInt(status),
      CountryId: country,
      CountryName: countryCatalog[country - 1].Name,
      PathologicalHistoryList: [],
      PersonalPhoto: photo.toString(),
    };
    axios
      .post(`${CONSTANTS.API.URL}/api/Patient/CreatePatient`, patient, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res, rej) => {
        setPatientId(patient.PatientId);
        history.push("/search");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formSections = [
    <BasicInformation
      photo={photo}
      setPhoto={setPhoto}
      name={name}
      setName={setName}
      lastNames={lastNames}
      setLastNames={setLastNames}
      setProvince={setProvince}
      setCanton={setCanton}
      setDistrict={setDistrict}
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
        status={status}
        setStatus={setStatus}
        patientStatusCatalog={patientStatusCatalog}
        genderCatalog={genderCatalog}
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
      status={setStatus}
      preview={true}
      createPatient={createPatient}
      token={token}
      genderCatalog={genderCatalog}
      patientStatusCatalog={patientStatusCatalog}
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
