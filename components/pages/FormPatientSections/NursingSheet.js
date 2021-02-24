import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Checkbox, TextInput, Switch } from "react-native-paper";

const NursingSheet = ({
  patologicalHistory,
  medicamentHistory,
  alergyHistory,
  personalHistory,
  heritageHistory,
  traumaHistory,
  ophthalmologistHistory,
  setPatologicalHistory,
  setMedicamentHistory,
  setAlergyHistory,
  setPersonalHistory,
  setHeritageHistory,
  setTraumaHistory,
  setOphthalmologistHistory,
}) => {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const [isSwitchAlergyOn, setIsSwitchAlergyOn] = useState(false);
  const [isSwitchMedicamentOn, setIsSwitchMedicamentOn] = useState(false);
  const [isSwitchAntibioticOn, setIsSwitchAntibioticOn] = useState(false);
  const onToggleAlergySwitch = () => setIsSwitchAlergyOn(!isSwitchAlergyOn);
  const onToggleMedicamentSwitch = () => setIsSwitchMedicamentOn(!isSwitchMedicamentOn);
  const onToggleAntibioticSwitch = () => setIsSwitchAntibioticOn(!isSwitchAntibioticOn);

  return (
    <View>
      <ScrollView>
        <Text>Atecedentes personales patológicos</Text>
        <Switch value={isSwitchAlergyOn} onValueChange={onToggleAlergySwitch}/>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>DM-2</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>HTA</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Hipotiroidismo</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>AR</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Enfermedades Inmunológicas</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>LES</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Asma</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Dicromatopsias</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Cancer</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Otros</Text>
        <TextInput
          label="Detalles"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Text>Medicamentos</Text>
        <Switch value={isSwitchMedicamentOn} onValueChange={onToggleMedicamentSwitch}/>
        <Text>Gotas, cremas, inhaladores, pastillas de uso crónico:</Text>
        <TextInput
          label="Detalles"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Text>Alergias</Text>
        <Switch value={isSwitchAntibioticOn} onValueChange={onToggleAntibioticSwitch}/>
        <Text>Antibióticos</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <TextInput
          label="Detalles"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Text>Sulfas</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Aines</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Anestésia</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Alimentos</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <TextInput
          label="Detalles"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Text>Otros</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <TextInput
          label="Detalles"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </ScrollView>
    </View>
  );
};

export default NursingSheet;
