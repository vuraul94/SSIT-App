import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Menu, Searchbar } from "react-native-paper";
import { Redirect, useHistory } from "react-router-native";

/**
 * Search page in the app
 * receive the token "string or null"
 */
const Search = ({
  token,
  setSection,
  identificationNumber,
  setIdentificationNumber,
  searchPatient,
  country,
  setCountry,
  countryCatalog,
}) => {
  let history = useHistory();
  const [visbleCountry, setVisibleCountry] = useState();

  useEffect(() => {
    setSection("Search");
  }, []);

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
        {countryCatalog && countryCatalog.map((countryItem) => (
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
        onChangeText={(e)=>{setIdentificationNumber(e)}}
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
