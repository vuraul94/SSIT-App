import React from "react";
import { Image, Modal, View } from "react-native";

const Loader = ({ visible }) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View
        style={{
          backgroundColor: "#F1F2F3",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          style={{ width: 110, height: 110 }}
          source={require("../../assets/logo.png")}
        />
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../../assets/spinner.gif")}
        />
      </View>
    </Modal>
  );
};

export default Loader;
