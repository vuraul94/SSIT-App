import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import CheckTab from "../../../ui/CheckTab";

const styles = StyleSheet.create({
  endMargin: {
    marginBottom: 70,
  },

  innerContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: "4%",
  },
  innerContainerInput: {
    flex: 1,
    paddingHorizontal: "4%",
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
  checkTab,
  setCheckTab,
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
      <CheckTab name={name} checkOn={checkTab} setCheckOn={setCheckTab}>
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
            <View style={styles.innerContainerInput}>
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
            </View>
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
            <View style={styles.innerContainerInput}>
              <TextInput
                label="¿Cuáles?¿Cuándo?"
                mode="outlined"
                value={ophthalmologistHistory[2]}
                onChangeText={(text) =>
                  handleOphthalmologistHistory(2, text, true)
                }
              />
            </View>
          )}
        </>
      </CheckTab>
    </>
  );
};

export default OphtalmologistHistory;
