import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, RadioButton, Menu } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const styles = StyleSheet.create({
  radioGroup: {
    marginHorizontal: "8%",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
   
  },
  radio: {
    marginTop: 3,
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  
  },
  text: {
    paddingTop: 7,
    color: "#074c76",
    fontWeight: "bold",
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
    backgroundColor: "#074c76",
    color: "#ffffff",
    borderRadius: 8,
    paddingVertical: 8,
    textAlign: "center",
  },
  button: {
    width: "90%",
    margin: "5%",
  },
  input: {
    margin: 10,
    marginHorizontal: "8%",
  },
  menu: {
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
        <View style={styles.radioGroup}>
          {genderCatalog &&
            genderCatalog.map((genderItem) => (
              <View style={styles.radio} key={`gender_${genderItem.GenderId}`}>
                <Text style={styles.text}>{genderItem.Name}</Text>
                <RadioButton
                  value={genderItem.GenderId}
                  status={
                    genderItem.GenderId === gender ? "checked" : "unchecked"
                  }
                />
              </View>
            ))}
        </View>
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
        mode="contained"
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

      <Menu
        style={styles.menu}
        visible={visbleStatus}
        onDismiss={() => setVisibleStatus(false)}
        anchor={
          <Button
            style={styles.button}
            icon="chevron-down"
            onPress={() => setVisibleStatus(true)}
            mode="contained"
          >
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
