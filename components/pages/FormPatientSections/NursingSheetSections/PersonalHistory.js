import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";
import CheckTab from "../../../ui/CheckTab";

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "16%",
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
  labelText: {
    flex: 1,
    paddingHorizontal: "8%",
    paddingTop: 8,
  },
  input: {
    marginLeft: 15,
    marginBottom: 20,
    marginRight: 15,
    flex: 1,
    paddingHorizontal: "4%",
  },
  group: {
    margin: 1,
    borderColor: "#000",
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: "8%",
    marginBottom: "4%",
  },
});

const PersonalHistory = ({
  name,
  personalHistory,
  handlePersonalHistory,
  handleGlassesList,
  handleCotactLens,
  checkGlassesList,
  checkContactLensList,
  checkTab,
  setCheckTab,
}) => {
  const [checkDrugs, setDrugs] = useState(personalHistory[2] !== "");
  const [checkGlasses, setCheckGlasses] = useState(
    checkGlassesList.find((glasses) => glasses !== "")
  );
  const [checkContactLens, setCheckContactLens] = useState(
    checkContactLensList.find((lens) => lens !== "")
  );

  return (
    <>
      <CheckTab name={name} checkOn={checkTab} setCheckOn={setCheckTab}>
        <View style={styles.innerContainer}>
          <Checkbox
            status={personalHistory[0] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePersonalHistory(0, "Tabaco");
            }}
          />
          <Text style={styles.innerText}>Tabaco</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={personalHistory[1] !== "" ? "checked" : "unchecked"}
            onPress={() => {
              handlePersonalHistory(1, "Alcohol");
            }}
          />
          <Text style={styles.innerText}>Alcohol</Text>
        </View>
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkDrugs ? "checked" : "unchecked"}
            onPress={() => {
              setDrugs(!checkDrugs);
            }}
          />
          <Text style={styles.innerText}>Drogas</Text>
        </View>
        {checkDrugs && (
          <TextInput
            style={styles.input}
            label="Detalles"
            mode="outlined"
            value={personalHistory[2]}
            onChangeText={(text) => handlePersonalHistory(2, text, true)}
          />
        )}
        <Text style={styles.labelText}>
          Horas de exposición a dispositivos electrónicos
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          label="Horas de exposición"
          mode="outlined"
          value={personalHistory[3]}
          onChangeText={(text) => handlePersonalHistory(3, text, true)}
        />
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkGlasses ? "checked" : "unchecked"}
            onPress={() => {
              setCheckGlasses(!checkGlasses);
              checkGlassesList.forEach((glassesType, index) => {
                handleGlassesList(index, "");
              });
            }}
          />
          <Text style={styles.innerText}>Usuario de anteojos</Text>
        </View>
        {checkGlasses && (
          <View style={styles.group}>
            <View style={styles.innerContainer}>
              <Checkbox
                status={checkGlassesList[0] !== "" ? "checked" : "unchecked"}
                onPress={() => {
                  handleGlassesList(0, "Bifocales");
                }}
              />
              <Text style={styles.innerText}>Bifocales</Text>
            </View>
            <View style={styles.innerContainer}>
              <Checkbox
                status={checkGlassesList[1] !== "" ? "checked" : "unchecked"}
                onPress={() => {
                  handleGlassesList(1, "Visión sencilla");
                }}
              />
              <Text style={styles.innerText}>Visión sencilla</Text>
            </View>
            <View style={styles.innerContainer}>
              <Checkbox
                status={checkGlassesList[2] !== "" ? "checked" : "unchecked"}
                onPress={() => {
                  handleGlassesList(2, "Progresivos");
                }}
              />
              <Text style={styles.innerText}>Progresivos</Text>
            </View>
          </View>
        )}
        <View style={styles.innerContainer}>
          <Checkbox
            status={checkContactLens ? "checked" : "unchecked"}
            onPress={() => {
              setCheckContactLens(!checkContactLens);
              checkContactLensList.forEach((lensType, index) => {
                handleCotactLens(index, "");
              });
            }}
          />
          <Text style={styles.innerText}>Usuario de lentes de contacto</Text>
        </View>
        {checkContactLens && (
          <View style={styles.group}>
            <View style={styles.innerContainer}>
              <Checkbox
                status={
                  checkContactLensList[0] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(0, "Blandos");
                }}
              />
              <Text style={styles.innerText}>Blandos</Text>
            </View>
            <View style={styles.innerContainer}>
              <Checkbox
                status={
                  checkContactLensList[1] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(1, "Híbridos");
                }}
              />
              <Text style={styles.innerText}>Híbridos</Text>
            </View>
            <View style={styles.innerContainer}>
              <Checkbox
                status={
                  checkContactLensList[2] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(2, "Esclerales");
                }}
              />
              <Text style={styles.innerText}>Esclerales</Text>
            </View>
            <View style={styles.innerContainer}>
              <Checkbox
                status={
                  checkContactLensList[3] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(3, "Tóricos");
                }}
              />
              <Text style={styles.innerText}>Tóricos</Text>
            </View>
            <View style={styles.innerContainer}>
              <Checkbox
                status={
                  checkContactLensList[4] !== "" ? "checked" : "unchecked"
                }
                onPress={() => {
                  handleCotactLens(4, "Gas Permeable");
                }}
              />
              <Text style={styles.innerText}>Gas permeable</Text>
            </View>
          </View>
        )}
      </CheckTab>
    </>
  );
};

export default PersonalHistory;
