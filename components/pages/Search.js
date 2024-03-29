import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, BackHandler, Dimensions } from "react-native";
import { Button, Menu, Searchbar } from "react-native-paper";
import { Redirect, useHistory } from "react-router-native";
import { CONSTANTS } from "../../misc/constants";
import { locations } from "../../misc/locations";
import Loader from "../ui/Loader";
import { CatalogContext } from "../providers/CatalogProvider";
import { PatientContext } from "../providers/PatientProvider";

let ScreenHeight = Dimensions.get("window").height - 190;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: ScreenHeight,
    paddingTop: "20%"
  },
  button: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  menu: {
    marginTop: "14%",
    marginLeft: "2%",
    marginRight: "2%",
    width: "90%",
  },
  searchbar: {
    width: "98%",
    marginLeft: "1%",
  },
  text: {
    fontSize: 15,
    marginHorizontal: "10%",
    marginTop: "5%",
    marginBottom: "2%",
    textAlign: "center",
  },
});

/**
 * Search page in the app
 * receive the token "string or null"
 */
const Search = ({
  token,
  setSection,
  identificationNumber,
  setIdentificationNumber,
  setCheckGlassesList,
  setCheckContactLensList,
  setMssgVisible,
  setMssg,
  setError,
  cleanPatient,
  setUpdatePatient,
}) => {
  const { countryCatalog } = useContext(CatalogContext);

  const {
    province,
    canton,
    country,
    setCountry,
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

  let history = useHistory();
  const [visbleCountry, setVisibleCountry] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    setSection("Search");
    setProvince("P1");
    setCanton("C1");
    setDistrict("D1");
    setUpdatePatient(false);
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (
        history.location.pathname !== "/Search" &&
        history.location.pathname !== "/"
      ) {
        history.goBack();
        return true;
      } else {
        return false;
      }
    });
  }, []);

  const searchPatient = (history) => {
    if (identificationNumber && identificationNumber.trim() !== "") {
      setLoaderVisible(true);
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
            cleanPatient();
            setProvince("");
            setCanton("");
            setDistrict("");
            setLoaderVisible(false);
            history.push("/create");
          } else {
            setUpdatePatient(true);
            setLoaderVisible(false);
            setPatientId(patient.PatientId);
            setPhoto(patient.PersonalPhoto);
            setName(patient.Name);
            setLastNames(patient.Surnames);
            setPhone(patient.Phones);
            setEmail(patient.EmailAddress);
            setGender(patient.GenderId);
            setBirthDate(patient.Birthdate);
            setOccupation(patient.Occupation);
            setStatus(patient.PatientStatus);

            const patologyHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 1
            ).Detail.split("*");
            setPatologicalHistory(patologyHistory);
            const medicamentHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 2
            ).Detail;
            setMedicamentHistory(medicamentHistory);
            const alergyHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 3
            ).Detail.split("*");
            setAlergyHistory(alergyHistory);

            const personalHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 4
            ).Detail.split("*");
            setPersonalHistory(personalHistory);
            const glasses = personalHistory[4].split("/");
            const contactLens = personalHistory[5].split("/");
            setCheckGlassesList(glasses);
            setCheckContactLensList(contactLens);

            const heritageHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 5
            ).Detail.split("*");
            setHeritageHistory(heritageHistory);
            const traumaHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 6
            ).Detail;
            setTraumaHistory(traumaHistory);
            const ophthalmologistHistory = patient.PathologicalHistoryList.find(
              (history) => history.PathologicalHistoryId === 7
            ).Detail.split("*");
            setOphthalmologistHistory(ophthalmologistHistory);

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
              setLoaderVisible(false);
              history.push("/patient");
            }
          }
        })
        .catch((error) => {
          setLoaderVisible(false);
          console.error(error);
          setMssgVisible(true);
          setMssg(`${error}`);
          setError(true);
        });
    } else {
      setError(true);
      setMssg("La identificación no puede ir vacia");
      setMssgVisible(true);
    }
  };

  const setRegions = (regions, history) => {
    Object.keys(locations.province).forEach((p) => {
      if (locations.province[p] === regions[0].trim()) {
        setProvince(p);
        if (province) {
          Object.keys(locations.canton[province]).forEach((c) => {
            if (locations.canton[p][c] === regions[1].trim()) {
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
      }
    });
  };

  return (
    <View style={styles.container}>
      {(!token || token === "") && <Redirect to="/" />}
      <Loader visible={loaderVisible} />

      <Text style={styles.text}>
        Seleccione el país al que pertenece el paciente, luego coloque la
        identificación (cedula, passaporte u otro)
      </Text>
      <Menu
        style={styles.menu}
        visible={visbleCountry}
        onDismiss={() => setVisibleCountry(false)}
        anchor={
          <Button
            icon="chevron-down"
            style={styles.button}
            onPress={() => setVisibleCountry(true)}
            mode="outlined"
          >
            {country !== 0 ? countryCatalog[country - 1].Name : "País"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setCountry(0);
            setVisibleCountry(false);
          }}
          title="País"
        />
        {countryCatalog &&
          countryCatalog.map((countryItem) => (
            <Menu.Item
              key={`country_${countryItem.id}`}
              onPress={() => {
                setCountry(countryItem.id);
                setVisibleCountry(false);
              }}
              title={countryItem.Name}
            />
          ))}
      </Menu>

      <Searchbar
        keyboardType="number-pad"
        style={styles.searchbar}
        onChangeText={(e) => {
          setIdentificationNumber(e);
        }}
        value={identificationNumber}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          searchPatient(history);
        }}
      >
        Buscar / Crear
      </Button>
    </View>
  );
};

export default Search;
