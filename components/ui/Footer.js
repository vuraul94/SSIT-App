import React from "react";

import { Appbar } from "react-native-paper";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appbar: {
    height: 90,
    padding: 10,
    paddingTop: 30,
    justifyContent: "space-between",
    color: "#ffffff",
  },
});

const Footer = () => {
  return (
    <Appbar style={styles.appbar}>
    </Appbar>
  );
};

export default Footer;
