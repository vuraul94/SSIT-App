import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import { Redirect, useHistory } from "react-router-native";

/**
 * Search page in the app
 * receive the token "string or null"
 */
const Search = ({
  token,
  setSection,
  searchId,
  setSearchId,
  searchPatient,
}) => {
  let history = useHistory();

  useEffect(() => {
    setSection("Search");
  }, []);

  return (
    <View>
      {(!token || token === "") && <Redirect to="/" />}
      <Searchbar onChangeText={setSearchId} value={searchId} />
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
