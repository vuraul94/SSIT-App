import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-native";
import Paginator from "../utils/Paginator";
import { StyleSheet } from "react-native";
import moment from "moment";

import BasicInformation from "./FormPatientSections/BasicInformation";
import ContactInformation from "./FormPatientSections/ContactInformation";
import PersonalInformation from "./FormPatientSections/PersonalInformation";
import NursingSheet from "./FormPatientSections/NursingSheet";
import Patient from "./Patient";
import { locations } from "../../misc/locations";
import { CONSTANTS } from "../../misc/constants";
import axios from "axios";

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
  country,
  gender,
  birthDate,
  occupation,
  status,
  patologicalHistory,
  medicamentHistory,
  alergyHistory,
  personalHistory,
  heritageHistory,
  traumaHistory,
  ophthalmologistHistory,
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
  setPatologicalHistory,
  setMedicamentHistory,
  setAlergyHistory,
  setPersonalHistory,
  setHeritageHistory,
  setTraumaHistory,
  setOphthalmologistHistory,
  patientStatusCatalog,
  genderCatalog,
  countryCatalog,
  pathologicalCatalog,
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

  const validateForm = () => {
    
    if (!name || name.trim() === "") {
      return false;
    } else if (!lastNames || lastNames.trim() === "") {
      return false;
    } else if (!phone || phone.trim() === "" || !CONSTANTS.REGEX.PHONE.test(phone)) {
      return false;
    } else if (email && email.trim() !== "" && !CONSTANTS.REGEX.EMAIL.test(email)) {
      return false;
    } else if (
      !province ||
      province.trim() === "" ||
      !canton ||
      canton.trim() === "" ||
      !district ||
      district.trim() === "" ||
      !address ||
      address.trim() === ""
    ) {
      return false;
    } else if (!birthDate || birthDate === "") {
      return false;
    } else if (!occupation || occupation.trim() === "") {
      return false;
    }
    if (!status || status === 0) {
      return false;
    } else {
      return true;
    }
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
    <>
      <NursingSheet
        patologicalHistory={patologicalHistory}
        medicamentHistory={medicamentHistory}
        alergyHistory={alergyHistory}
        personalHistory={personalHistory}
        heritageHistory={heritageHistory}
        traumaHistory={traumaHistory}
        ophthalmologistHistory={ophthalmologistHistory}
        setPatologicalHistory={setPatologicalHistory}
        setMedicamentHistory={setMedicamentHistory}
        setAlergyHistory={setAlergyHistory}
        setPersonalHistory={setPersonalHistory}
        setHeritageHistory={setHeritageHistory}
        setTraumaHistory={setTraumaHistory}
        setOphthalmologistHistory={setOphthalmologistHistory}
        pathologicalCatalog={pathologicalCatalog}
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
      status={status}
      preview={true}
      createPatient={createPatient}
      token={token}
      genderCatalog={genderCatalog}
      patientStatusCatalog={patientStatusCatalog}
      validateForm={validateForm}
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
