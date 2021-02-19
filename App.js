import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
} from "react-native-paper";
import { NativeRouter, Route } from "react-router-native";
import { CONSTANTS } from "./misc/constants";
import Login from "./components/pages/Login";
import Search from "./components/pages/Search";
import FormPatient from "./components/pages/FormPatient";
import Patient from "./components/pages/Patient";
import moment from "moment";
import axios from "axios";
import { locations } from "./misc/locations";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  appbar: {
    height: 80,
    padding: 10,
    paddingTop: 20,
    justifyContent: "flex-end",
    color: "#ffffff",
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#004777",
    accent: "#004777",
  },
};

export default function App() {
  const [token, setToken] = useState();
  const [tokenCreationTime, setTokenCreationTime] = useState(Date.now());
  const [countryCatalog, setCountryCatalog] = useState([]);
  const [genderCatalog, setGenderCatalog] = useState([]);
  const [patientStatusCatalog, setPatientStatusCatalog] = useState([]);
  const [section, setSection] = useState("");
  const [patientId, setPatientId] = useState(0);
  const [identificationNumber, setIdentificationNumber] = useState("");

  /**Patient data: START */
  const [country, setCountry] = useState(60);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [lastNames, setLastNames] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("P1");
  const [canton, setCanton] = useState("C1");
  const [district, setDistrict] = useState("D1");
  const [address, setAddress] = useState("");

  const [gender, setGender] = useState(1);
  const [birthDate, setBirthDate] = useState(Date.now());
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState(0);

  const patientSets = {
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
  };

  const patientData = {
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
  };

  /**Patient data: END */

  useEffect(() => {
    /**
     * This block close the session after the token's expiration time is finished
     */
    const expInterval = setInterval(() => {
      if (token) {
        const expTime = new Date(
          tokenCreationTime + CONSTANTS.API.TOKEN_EXP_TIME * 60000
        ).getTime();
        if (Date.now() >= expTime) {
          setToken(null);
        }
      }
    }, 5000);

    return () => {
      clearInterval(expInterval);
    };
  }, [token, setToken]);

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

  const searchPatient = (history) => {
    axios
      .post(
        `${CONSTANTS.API.URL}/api/Patient/GetPatient`,
        {
          IdentificationNumber: `${
            countryCatalog[country - 1].Abbreviation
          }:${identificationNumber}`,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res, rej) => {
        const patient = res.data.Response;
        if (res.data.Status === 204) {
          Object.keys(patientSets).map((set) => {
            patientSets[set]("");
            setStatus(0);
          });
          history.push("/create");
        } else {
          setPatientId(patient.IdentificationNumber);
          setPhoto(patient.PersonalPhoto);
          setName(patient.Name);
          setLastNames(patient.Surnames);
          setPhone(patient.Phones);
          setEmail(patient.EmailAddress);
          setGender(patient.GenderId);
          setBirthDate(patient.Birthdate);
          setOccupation(patient.Occupation);
          setStatus(patient.PatientStatus);

          const addressArray = patient.AddressDetail.split(".");
          let regions = [];
          if (addressArray.length === 2) {
            regions = addressArray[0].split(",");
            setAddress(addressArray[1].replace(/[\n]/g, "").trim());
          } else {
            setAddress(addressArray[0]);
          }
          if (regions.length === 3) {
            setRegions(regions, history);
          } else {
            history.push("/patient");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setRegions = (regions, history) => {
    Object.keys(locations.province).forEach((p) => {
      if (locations.province[p] === regions[0].trim()) {
        setProvince(p);
        Object.keys(locations.canton[province]).forEach((c) => {
          if (province && locations.canton[p][c] === regions[1].trim()) {
            setCanton(c);
            Object.keys(locations.district[p][c]).forEach((d) => {
              if (canton && locations.district[p][c][d] === regions[2].trim()) {
                setDistrict(d);
                history.push("/patient");
              }
            });
          }
        });
      }
    });
  };

  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <View style={{ flex: 1 }}>
          <Appbar style={styles.appbar}>
            <Appbar.Content title="SSIT App" subtitle={section} />
            {token && token !== "" && (
              <Appbar.Action
                icon="logout"
                onPress={() => {
                  setToken(null);
                }}
              />
            )}
          </Appbar>

          <Route
            exact
            path="/"
            render={() => (
              <Login
                token={token}
                setToken={setToken}
                setTokenCreationTime={setTokenCreationTime}
                setSection={setSection}
                setCountryCatalog={setCountryCatalog}
                setGenderCatalog={setGenderCatalog}
                setPatientStatusCatalog={setPatientStatusCatalog}
              />
            )}
          />

          <Route
            path="/search"
            render={() => (
              <Search
                token={token}
                setSection={setSection}
                searchPatient={searchPatient}
                identificationNumber={identificationNumber}
                setIdentificationNumber={setIdentificationNumber}
                country={country}
                setCountry={setCountry}
                countryCatalog={countryCatalog}
              />
            )}
          />

          <Route
            path="/create"
            setSection={setSection}
            render={() => (
              <FormPatient
                token={token}
                setSection={setSection}
                identificationNumber={`${
                  countryCatalog[country - 1].Abbreviation
                }:${identificationNumber}`}
                createPatient={createPatient}
                {...patientSets}
                {...patientData}
                patientStatusCatalog={patientStatusCatalog}
                genderCatalog={genderCatalog}
              />
            )}
          />

          <Route
            path="/patient"
            setSection={setSection}
            render={() => (
              <Patient
                token={token}
                setSection={setSection}
                identificationNumber={`${countryCatalog[country - 1].Abbreviation}:${identificationNumber}`}
                setProvince={setProvince}
                setCanton={setCanton}
                setDistrict={setDistrict}
                {...patientData}
                address={
                  province !== "" && canton !== "" && district !== ""
                    ? `${locations.province[province]}, ${locations.canton[province][canton]}, ${locations.district[province][canton][district]}. \n ${address}`
                    : address
                }
              />
            )}
          />
        </View>
      </NativeRouter>
    </PaperProvider>
  );
}
