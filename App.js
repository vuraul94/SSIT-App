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
  const [searchId, setSearchId] = useState("");

  /**Patient data: START */
  const [photo, setPhoto] = useState();
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
  const [health, setHealth] = useState(0);

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

  const searchPatient = (history) => {
    history.push("/create");
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
                searchId={searchId}
                setSearchId={setSearchId}
              />
            )}
          />

          <Route
            path="/create"
            setSection={setSection}
            photo={photo}
            render={() => (
              <FormPatient
                token={token}
                setSection={setSection}
                patientId={searchId}
                {...patientSets}
                {...patientData}
              />
            )}
          />
        </View>
      </NativeRouter>
    </PaperProvider>
  );
}
