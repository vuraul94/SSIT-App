import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { Redirect } from "react-router-native";

/**
 * Search page in the app
 * receive the token "string or null"
 */
const Search = ({ token, setSection }) => {
  useEffect(() => {
    setSection("Search");
  }, []);
  return (
    <View>
      {(!token || token === "") && <Redirect to="/" />}
      <Text>Search</Text>
      <Searchbar />
    </View>
  );
};

export default Search;
