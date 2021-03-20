import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

const styles = StyleSheet.create({
  headContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#074c76",
    borderRadius: 10,
    color: "#ffffff",
    margin: 8,
  },
  contents: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    marginTop: 14,
    marginBottom: 10,
    color: "#ffffff",
    left: 10,
  },
});

const CheckTab = ({ checkOn, setCheckOn, name, children }) => {
  return (
    <>
      <View style={styles.headContainer} onTouchEnd={setCheckOn}>
        <Text style={styles.text}>{name}</Text>
        {checkOn ? (
          <IconButton icon="minus" onPress={setCheckOn} color="#fff" />
        ) : (
          <IconButton icon="plus" onPress={setCheckOn} color="#fff" />
        )}
      </View>
      {checkOn && <View style={styles.contents}>{children}</View>}
    </>
  );
};

export default CheckTab;
