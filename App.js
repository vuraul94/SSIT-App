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
import axios from "axios";
import { locations } from "./misc/locations";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  appbar: {
    height: 100,
    padding: 10,
    paddingTop: 30,
    justifyContent: "flex-end",
    color: "#ffffff",
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#074c76",
    accent: "#d22936",
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
    setCountry,
    setGender,
    setBirthDate,
    setOccupation,
    setStatus,
  };

  const patientData = {
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
  }, [token, setToken, tokenCreationTime]);

  const cleanPatient = () => {
    Object.keys(patientSets).map((set) => {
      patientSets[set]("");
    });
    setGender(1);
    setCountry(60);
    setStatus(0);
  };

  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <View style={{ flex: 1 }}>
          <Appbar style={styles.appbar}>
            <Appbar.Content title="REXIS" subtitle={section} />
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
                identificationNumber={identificationNumber}
                setIdentificationNumber={setIdentificationNumber}
                province={province}
                canton={canton}
                country={country}
                setCountry={setCountry}
                countryCatalog={countryCatalog}
                cleanPatient={cleanPatient}
                {...patientSets}
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
                {...patientSets}
                {...patientData}
                patientStatusCatalog={patientStatusCatalog}
                countryCatalog={countryCatalog}
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
                identificationNumber={`${
                  countryCatalog[country - 1].Abbreviation
                }:${identificationNumber}`}
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
