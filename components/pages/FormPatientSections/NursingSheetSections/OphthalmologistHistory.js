import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const styles = StyleSheet.create({
  endMargin: {
    marginBottom: 70,
  },
  container: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  innerContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  switch: {
    marginTop: 20,
    position: "absolute",
    marginBottom: 30,
    right: 10,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    left: 10,
  },
  innerText: {
    marginTop: 8,
    marginBottom: 15,
    paddingRight: 50,
    left: 10,
  },
  input: {
    marginLeft: 15,
    marginBottom: 20,
    marginRight: 15,
  },
});

const OphtalmologistHistory = ({
  name,
  ophthalmologistHistory,
  handleOphthalmologistHistory,
}) => {
  const [
    isSwitchOphthalmologistHistoryOn,
    setIsSwitchOphthalmologistHistoryOn,
  ] = useState(ophthalmologistHistory.find((history) => history !== ""));
  const [checkConsultation, setCheckConsultation] = useState(
    ophthalmologistHistory[0] !== "" || ophthalmologistHistory[1] !== ""
  );
  const [checkSurgery, setCheckSurgery] = useState(
    ophthalmologistHistory[2] !== ""
  );

  const onToggleOphthalmologistHistorySwitch = () => {
    setIsSwitchOphthalmologistHistoryOn(!isSwitchOphthalmologistHistoryOn);
  };

  return (
    <>
      <View style={styles.endMargin}>
        <View style={styles.container}>
          <Text style={styles.text}>{name}</Text>
          <Switch
            style={styles.switch}
            value={isSwitchOphthalmologistHistoryOn}
            onValueChange={onToggleOphthalmologistHistorySwitch}
          />
        </View>
        {isSwitchOphthalmologistHistoryOn && (
          <>
            <View style={styles.innerContainer}>
              <Checkbox
                status={checkConsultation ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckConsultation(!checkConsultation);
                }}
              />
              <Text style={styles.innerText}>Consultas</Text>
            </View>
            {checkConsultation && (
              <>
                <TextInput
                  style={styles.input}
                  label="Detalles de la consulta"
                  mode="outlined"
                  value={ophthalmologistHistory[0]}
                  onChangeText={(text) =>
                    handleOphthalmologistHistory(0, text, true)
                  }
                />
                <Text style={styles.innerText}>Diagnóstico de la consulta</Text>
                <TextInput
                  style={styles.input}
                  label="Detalles"
                  mode="outlined"
                  value={ophthalmologistHistory[1]}
                  onChangeText={(text) =>
                    handleOphthalmologistHistory(1, text, true)
                  }
                />
              </>
            )}
            <View style={styles.innerContainer}>
              <Checkbox
                status={checkSurgery ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckSurgery(!checkSurgery);
                }}
              />
              <Text style={styles.innerText}>Cirugías</Text>
            </View>
            {checkSurgery && (
              <>
                <TextInput
                  label="¿Cuáles?¿Cuándo?"
                  mode="outlined"
                  value={ophthalmologistHistory[2]}
                  onChangeText={(text) =>
                    handleOphthalmologistHistory(2, text, true)
                  }
                />
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default OphtalmologistHistory;
