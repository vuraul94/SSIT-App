import React from "react";

import { Appbar } from "react-native-paper";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appbar: {
    height: 100,
    padding: 10,
    paddingTop: 30,
    justifyContent: "space-between",
    color: "#fafafa",
  },
});

const Header = ({ token, setToken }) => {
  return (
    <Appbar style={styles.appbar}>
      {/* <Appbar.Content title="REXIS" subtitle={section} /> */}
      <View style={{ minWidth: "10%" }}></View>
      <Image
        style={{ height: 100, width: 100, alignSelf: "center" }}
        source={require("../../assets/logo-text.png")}
      />
      <View style={{ minWidth: "10%" }}>
        {token && token !== "" && (
          <>
            <Appbar.Action
              color="#fafafa"
              icon="logout"
              onPress={() => {
                setToken(null);
              }}
            />
            <Text style={{ color: "#fafafa" }}>Logout</Text>
          </>
        )}
      </View>
    </Appbar>
  );
};

export default Header;
