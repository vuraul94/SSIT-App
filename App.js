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
  const [section, setSection] = useState("");
  const [patientId, setPatientId] = useState(0);
  const [identificationNumber, setIdentificationNumber] = useState("");

  /**Patient data: START */
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [lastNames, setLastNames] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [canton, setCanton] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");

  const [gender, setGender] = useState(1);
  const [birthDate, setBirthDate] = useState(Date.now());
  const [occupation, setOccupation] = useState("");
  const [health, setHealth] = useState(1);

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
    setHealth,
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
    health,
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
      IdentificationNumber: identificationNumber,
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
      PatientStatus: parseInt(health),
      PathologicalHistoryList: [],
      PersonalPhoto: photo.toString(),
    };
    console.log({ ...patient, PersonalPhoto: "" });
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
          IdentificationNumber: identificationNumber,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res, rej) => {
        const patient = res.data.Response;
        if (patient.PatientId === 0) {
          history.push("/create");
        } else {
          setPatientId(patient.PatientId);
          setPhoto(patient.PersonalPhoto);
          setName(patient.Name);
          setLastNames(patient.Surnames);
          setPhone(patient.Phones);
          setEmail(patient.EmailAddress);
          setGender(patient.GenderId);
          setBirthDate(patient.Birthdate);
          setOccupation(patient.Occupation);
          setHealth(patient.PatientStatus);

          const addressArray = patient.AddressDetail.split(".");
          let regions = [];
          if (addressArray.length === 2) {
            regions = addressArray[0].split(",");
            setAddress(addressArray[1].replace("\n","").trim());
          } else {
            setAddress(addressArray[0]);
          }
          if (regions.length === 3) {
            Object.keys(locations.province).forEach((p) => {
              if (locations.province[p] === regions[0].trim()) {
                setProvince(p);
                Object.keys(locations.canton[province]).forEach((c) => {
                  if (
                    province &&
                    locations.canton[p][c] === regions[1].trim()
                  ) {
                    setCanton(c);
                    Object.keys(locations.district[p][c]).forEach((d) => {
                      if (
                        canton &&
                        locations.district[p][c][d] === regions[2].trim()
                      ) {
                        setDistrict(d);
                        history.push("/patient");
                      }
                    });
                  }
                });
              }
            });
          } else {
            history.push("/patient");
          }
        }
      })
      .catch((error) => {
        console.error(error);
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
                identificationNumber={identificationNumber}
                createPatient={createPatient}
                {...patientSets}
                {...patientData}
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
                identificationNumber={identificationNumber}
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
