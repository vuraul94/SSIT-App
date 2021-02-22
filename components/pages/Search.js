import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Menu, Searchbar } from "react-native-paper";
import { Redirect, useHistory } from "react-router-native";
import { CONSTANTS } from "../../misc/constants";
import { locations } from "../../misc/locations";

/**
 * Search page in the app
 * receive the token "string or null"
 */
const Search = ({
  token,
  setSection,
  identificationNumber,
  setIdentificationNumber,
  province,
  canton,
  country,
  setCountry,
  countryCatalog,
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
  cleanPatient
}) => {
  let history = useHistory();
  const [visbleCountry, setVisibleCountry] = useState();

  useEffect(() => {
    setSection("Search");
  }, []);

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
          cleanPatient();
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
    <View>
      {(!token || token === "") && <Redirect to="/" />}

      <Menu
        visible={visbleCountry}
        onDismiss={() => setVisibleCountry(false)}
        anchor={
          <Button onPress={() => setVisibleCountry(true)} mode="outlined">
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
        onChangeText={(e) => {
          setIdentificationNumber(e);
        }}
        value={identificationNumber}
      />
      <Button
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
