import React, { useEffect, useState, Dimen, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";

import {
  Provider as PaperProvider,
  DefaultTheme,
  Colors,
  IconButton,
} from "react-native-paper";
import { NativeRouter, Route } from "react-router-native";
import { CONSTANTS } from "./misc/constants";
import Login from "./components/pages/Login";
import Search from "./components/pages/Search";
import FormPatient from "./components/pages/FormPatient";
import Patient from "./components/pages/Patient";
import { locations } from "./misc/locations";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import CatalogProvider from "./components/providers/CatalogProvider";
import PatientProvider from "./components/providers/PatientProvider";

let ScreenHeight = Dimensions.get("window").height - 190;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    minHeight: ScreenHeight,
    alignItems: "stretch",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  error: { color: Colors.red500 },
  success: { color: Colors.green300 },
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
  /**Authentication states */
  const [token, setToken] = useState();
  const [tokenCreationTime, setTokenCreationTime] = useState(Date.now());

  /**Stetical states */
  const [section, setSection] = useState("");
  const [updatePatient, setUpdatePatient] = useState(false);

  /**Catalog states */
  const [countryCatalog, setCountryCatalog] = useState([]);
  const [genderCatalog, setGenderCatalog] = useState([]);
  const [patientStatusCatalog, setPatientStatusCatalog] = useState([]);
  const [pathologicalCatalog, setPathologicalCatalog] = useState([]);

  //Modal Mssg states
  const [error, setError] = useState(false);
  const [mssgVisible, setMssgVisible] = useState(false);
  const [mssg, setMssg] = useState("");

  /**Patient data: START */
  const [patientId, setPatientId] = useState(0);
  const [identificationNumber, setIdentificationNumber] = useState("601230456");

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

  const [patologicalHistory, setPatologicalHistory] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [medicamentHistory, setMedicamentHistory] = useState("");
  const [alergyHistory, setAlergyHistory] = useState(["", "", "", "", "", ""]);
  const [personalHistory, setPersonalHistory] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [heritageHistory, setHeritageHistory] = useState(["", "", "", "", ""]);
  const [traumaHistory, setTraumaHistory] = useState("");
  const [ophthalmologistHistory, setOphthalmologistHistory] = useState([
    "",
    "",
    "",
  ]);
  const [checkGlassesList, setCheckGlassesList] = useState(["", "", ""]);
  const [checkContactLensList, setCheckContactLensList] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

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
    setPatologicalHistory,
    setMedicamentHistory,
    setAlergyHistory,
    setPersonalHistory,
    setHeritageHistory,
    setTraumaHistory,
    setOphthalmologistHistory,
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
    patologicalHistory,
    medicamentHistory,
    alergyHistory,
    personalHistory,
    heritageHistory,
    traumaHistory,
    ophthalmologistHistory,
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

  /**
   * Removes all the patient data, in order to have a empty form
   */
  const cleanPatient = () => {
    Object.keys(patientSets).map((set) => {
      if (set !== "setCountry") {
        patientSets[set]("");
      }
    });
    setPatologicalHistory(["", "", "", "", "", "", "", "", "", ""]);
    setAlergyHistory(["", "", "", "", "", ""]);
    setPersonalHistory(["", "", "", "", "", ""]);
    setHeritageHistory(["", "", "", "", ""]);
    setOphthalmologistHistory(["", "", ""]);
    setGender(1);
    setStatus(0);
  };

  const date = Date.now();

  if (date <= 1617903153000) {
    return (
      <PaperProvider theme={theme}>
        <CatalogProvider
          value={{
            countryCatalog,
            setCountryCatalog,
            genderCatalog,
            setGenderCatalog,
            patientStatusCatalog,
            setPatientStatusCatalog,
            pathologicalCatalog,
            setPathologicalCatalog,
          }}
        >
          <PatientProvider value={{ ...patientSets, ...patientData }}>
            <NativeRouter>
              <ScrollView style={{ flex: 1 }}>
                <Header token={token} setToken={setToken} />

                <Modal
                  animationType="slide"
                  visible={mssgVisible}
                  transparent={true}
                  onRequestClose={() => {
                    setMssgVisible(!mssgVisible);
                  }}
                  onDismiss={() => setMssgVisible(false)}
                >
                  <TouchableOpacity
                    style={styles.centeredView}
                    onPress={() => setMssgVisible(false)}
                  >
                    <View style={styles.modalView}>
                      <Text style={error ? styles.error : styles.success}>
                        {mssg && mssg}
                      </Text>
                      <IconButton
                        icon={error ? "close" : "check"}
                        color={error ? Colors.red500 : Colors.green300}
                        size={20}
                        onPress={() => setMssgVisible(false)}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>

                <View style={styles.container}>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Login
                        token={token}
                        setToken={setToken}
                        setTokenCreationTime={setTokenCreationTime}
                        setSection={setSection}
                        setMssgVisible={setMssgVisible}
                        setMssg={setMssg}
                        setError={setError}
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
                        cleanPatient={cleanPatient}
                        setCheckGlassesList={setCheckGlassesList}
                        setCheckContactLensList={setCheckContactLensList}
                        setMssgVisible={setMssgVisible}
                        setMssg={setMssg}
                        setError={setError}
                        setUpdatePatient={setUpdatePatient}
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
                        checkGlassesList={checkGlassesList}
                        setCheckGlassesList={setCheckGlassesList}
                        checkContactLensList={checkContactLensList}
                        setCheckContactLensList={setCheckContactLensList}
                        setMssgVisible={setMssgVisible}
                        setMssg={setMssg}
                        setError={setError}
                        updatePatient={updatePatient}
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
                        patologicalHistory={patologicalHistory}
                        medicamentHistory={medicamentHistory}
                        alergyHistory={alergyHistory}
                        personalHistory={personalHistory}
                        heritageHistory={heritageHistory}
                        traumaHistory={traumaHistory}
                        ophthalmologistHistory={ophthalmologistHistory}
                        checkGlassesList={checkGlassesList}
                        checkContactLensList={checkContactLensList}
                      />
                    )}
                  />
                </View>
                <Footer />
              </ScrollView>
            </NativeRouter>
          </PatientProvider>
        </CatalogProvider>
      </PaperProvider>
    );
  } else {
    return <Text>{"\n\n\n"}Demo finalizada</Text>;
  }
}
