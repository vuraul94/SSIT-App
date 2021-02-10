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

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  appbar: {
    height: 80,
    padding: 10,
    paddingTop: 20,
    justifyContent: "flex-end",
    color: "#ffffff"
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#004777",
    accent: "#f1c40f",
  },
};

export default function App() {
  const [token, setToken] = useState();
  const [section, setSection] = useState("");

  useEffect(() => {
    /**
     * This block close the session after the token's expiration time is finished
     */
    if (token) {
      new Promise((res, rej) => {
        setTimeout(() => {
          res("LogOut");
        }, CONSTANTS.API.TOKEN_EXP_TIME * 60000);
      }).then(() => {
        setToken(null);
      });
    }
  }, [token, setToken]);

  return (
    <NativeRouter>
      <PaperProvider theme={theme}>
        <View>
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
          <View style={styles.container}>
            <Route
              exact
              path="/"
              render={() => <Login token={token} setToken={setToken} setSection={setSection} />}
            />
            <Route path="/search" render={() => <Search token={token}  setSection={setSection} />} />
          </View>
        </View>
      </PaperProvider>
    </NativeRouter>
  );
}
