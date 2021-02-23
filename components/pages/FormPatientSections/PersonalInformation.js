import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Menu } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const styles = StyleSheet.create({
  radioGroup: {
    marginLeft: 20,
    marginTop: 3,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  text:{
    paddingTop: 7,
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
  },
  button:{
    width: "90%",
    margin: "5%",
  },
  input: {
    margin: 10,
  },
  menu:{
    margin: "10%",
    width: "80%",
  },
});


const PersonalInformation = ({
  gender,
  setGender,
  birthDate,
  setBirthDate,
  occupation,
  setOccupation,
  status,
  setStatus,
  patientStatusCatalog,
  genderCatalog,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [visbleStatus, setVisibleStatus] = useState();

  const handleBirthDate = (date) => {
    setBirthDate(date);
    setDatePickerVisibility(false);
  };

  return (
    <>
      <Text style={styles.title}>Género</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setGender(newValue)}
        value={gender}
      >
        {genderCatalog &&
          genderCatalog.map((genderItem) => (
            <View style={styles.radioGroup} key={`gender_${genderItem.GenderId}`}>
              <Text style={styles.text}>{genderItem.Name}</Text>
              <RadioButton
                value={genderItem.GenderId}
                status={
                  genderItem.GenderId === gender ? "checked" : "unchecked"
                }
              />
            </View>
          ))}
      </RadioButton.Group>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleBirthDate}
        onCancel={() => setDatePickerVisibility(false)}
        value={birthDate}
      />

      <Button
        style={styles.button}
        icon="chevron-down"
        mode="outlined"
        onPress={() => {
          setDatePickerVisibility(true);
        }}
      >
        {birthDate === ""
          ? `Fecha de nacimiento`
          : moment(birthDate).format("DD/MM/YYYY")}
      </Button>

      <TextInput
        style={styles.input}
        label="Ocupación"
        mode="outlined"
        multiline
        numberOfLines={5}
        value={occupation}
        onChangeText={setOccupation}
      />

      <Text style={styles.title}>Estado del paciente</Text>
      <Menu
        style={styles.menu}
        visible={visbleStatus}
        onDismiss={() => setVisibleStatus(false)}
        anchor={
          <Button 
            style={styles.button}
            icon="chevron-down" 
            onPress={() => setVisibleStatus(true)} mode="outlined">
            {status !== 0
              ? patientStatusCatalog[status - 1].Name
              : "Estado del paciente"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setStatus(0);
            setVisibleStatus(false);
          }}
          title="Estado del paciente"
        />
        {patientStatusCatalog &&
          patientStatusCatalog.map((statusItem) => (
            <Menu.Item
              key={`status_${statusItem.PatientStatusId}`}
              onPress={() => {
                setStatus(statusItem.PatientStatusId);
                setVisibleStatus(false);
              }}
              title={statusItem.Name}
            />
          ))}
      </Menu>
    </>
  );
};

export default PersonalInformation;