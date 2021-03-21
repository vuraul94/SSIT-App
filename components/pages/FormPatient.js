import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import Loader from "../ui/Loader";
import MedicalSections from "./FormPatientSections/MedicalSections";
import { CatalogContext } from "../providers/CatalogProvider";
import { Button } from "react-native-paper";
import { PatientContext } from "../providers/PatientProvider";
import PatientData from "./PatientViews/PatientData";

const styles = StyleSheet.create({});

const FormPatient = ({
  setSection,
  token,
  identificationNumber,
  checkGlassesList,
  setCheckGlassesList,
  checkContactLensList,
  setCheckContactLensList,
  setMssgVisible,
  setMssg,
  setError,
  updatePatient
}) => {
  const {
    /**Data */
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
    /**SETS */
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
  } = useContext(PatientContext);

  const { countryCatalog, genderCatalog, patientStatusCatalog } = useContext(
    CatalogContext
  );

  const [loaderVisible, setLoaderVisible] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setSection(`ID: ${identificationNumber}`);
  }, [history]);

  /**
   * As it name says this function create the Patient
   */
  const createPatient = (history) => {
    const patient = {
      PatientId: patientId,
      Name: name,
      Surnames: lastNames,
      Phones: phone,
      IdentificationNumber: identificationNumber,
      GenderId: parseInt(2),
      EmailAddress: email,
      Birthdate: moment(new Date(birthDate), "DD/MM/YYYY"),
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
      PersonalPhoto: photo.toString(),
      PathologicalHistoryList: [
        {
          PathologicalHistoryId: 1,
          Detail: patologicalHistory.join("*"),
        },
        {
          PathologicalHistoryId: 2,
          Detail: medicamentHistory,
        },
        {
          PathologicalHistoryId: 3,
          Detail: alergyHistory.join("*"),
        },
        {
          PathologicalHistoryId: 4,
          Detail: [
            ...personalHistory.slice(0, 4),
            checkGlassesList.join("/"),
            checkContactLensList.join("/"),
          ].join("*"),
        },
        {
          PathologicalHistoryId: 5,
          Detail: heritageHistory.join("*"),
        },
        {
          PathologicalHistoryId: 6,
          Detail: traumaHistory,
        },
        {
          PathologicalHistoryId: 7,
          Detail: ophthalmologistHistory.join("*"),
        },
      ],
    };

    setLoaderVisible(true);
    axios
      .post(`${CONSTANTS.API.URL}/api/Patient/CreatePatient`, patient, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res, rej) => {
        setPatientId(patient.PatientId);
        setMssgVisible(true);
        setError(false);
        setMssg(`Operación exitosa`);
        setLoaderVisible(false);
        history.push("/search");
      })
      .catch((error) => {
        console.error(error);
        setMssgVisible(true);
        setError(true);
        setMssg(`Error: \n ${error}`);
        setLoaderVisible(false);
      });
  };

  /**
   * Make some validations and disable the submit button
   */
  const validateForm = () => {
    if (!name || name.trim() === "") {
      return false;
    } else if (!lastNames || lastNames.trim() === "") {
      return false;
    } else if (
      !phone ||
      phone.trim() === "" ||
      !CONSTANTS.REGEX.PHONE.test(phone)
    ) {
      return false;
    } else if (
      email &&
      email.trim() !== "" &&
      !CONSTANTS.REGEX.EMAIL.test(email)
    ) {
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
    <MedicalSections
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
      setCheckGlassesList={setCheckGlassesList}
      checkGlassesList={checkGlassesList}
      setCheckContactLensList={setCheckContactLensList}
      checkContactLensList={checkContactLensList}
      ophthalmologistHistory={ophthalmologistHistory}
    ></MedicalSections>,

    <PatientData
      identificationNumber={identificationNumber}
      checkGlassesList={checkGlassesList}
      checkContactLensList={checkContactLensList}
      validateForm={validateForm}
    />,
  ];
  return (
    <>
      {(!token || token === "") && <Redirect to="/" />}
      <Loader visible={loaderVisible} />

      <Paginator
        sections={formSections}
        history={history}
        LastAction={
          <Button
            style={styles.button}
            mode="contained"
            disabled={!validateForm()}
            onPress={() => createPatient(history)}
          >
            {updatePatient? "Actualizar" : "Crear"}
          </Button>
        }
      ></Paginator>
    </>
  );
};

export default FormPatient;
