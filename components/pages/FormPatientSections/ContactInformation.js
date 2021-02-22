import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { locations } from "../../../misc/locations";
import { Button, TextInput, Menu } from "react-native-paper";

const styles = StyleSheet.create({
  input:{
    margin: 12,
  },
  button:{
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  menu:{
    margin: "10%",
    width: "80%",
  },
});

const ContactInformation = ({
  phone,
  setPhone,
  email,
  setEmail,
  province,
  setProvince,
  canton,
  setCanton,
  district,
  setDistrict,
  address,
  setAddress,
}) => {
  const [visibleProvince, setVisibleProvince] = useState(false);
  const [visibleCanton, setVisibleCanton] = useState(false);
  const [visibleDistrict, setVisibleDistrict] = useState(false);

  return (
    <>
      <TextInput
        style={styles.input}
        label="Numero de teléfono"
        mode="outlined"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        label="Correo"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
      />

      <Menu
        style={styles.menu}
        visible={visibleProvince}
        onDismiss={() => setVisibleProvince(false)}
        anchor={
          <Button icon="chevron-down" style={styles.button} onPress={() => setVisibleProvince(true)} mode="outlined">
            {province !== "" ? locations.province[province] : "Provincia"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setDistrict("");
            setCanton("");
            setProvince("");
            setVisibleProvince(false);
          }}
          title="Provincia"
        />
        {Object.keys(locations.province).map((key) => (
          <Menu.Item
            key={`province_${key}`}
            onPress={() => {
              setDistrict("");
              setCanton("");
              setProvince(key);
              setVisibleProvince(false);
            }}
            title={locations.province[key]}
          />
        ))}
      </Menu>

      <Menu
        style={styles.menu}
        visible={visibleCanton}
        onDismiss={() => setVisibleCanton(false)}
        anchor={
          <Button icon="chevron-down" style={styles.button} onPress={() => setVisibleCanton(true)} mode="outlined">
            {canton !== "" ? locations.canton[province][canton] : "Cantón"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setDistrict("");
            setCanton("");
            setVisibleCanton(false);
          }}
          title="Cantón"
        />
        {province !== "" &&
          Object.keys(locations.canton[province]).map((key) => (
            <Menu.Item
              key={`canton_${key}`}
              onPress={() => {
                setDistrict("");
                setCanton(key);
                setVisibleCanton(false);
              }}
              title={locations.canton[province][key]}
            />
          ))}
      </Menu>

      <Menu
        style={styles.menu}
        visible={visibleDistrict}
        onDismiss={() => setVisibleDistrict(false)}
        anchor={
          <Button icon="chevron-down" style={styles.button} onPress={() => setVisibleDistrict(true)} mode="outlined">
            {district !== ""
              ? locations.district[province][canton][district]
              : "Distrito"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setDistrict("");
            setVisibleDistrict(false);
          }}
          title="Distrito"
        />
        {canton !== "" &&
          Object.keys(locations.district[province][canton]).map((key) => (
            <Menu.Item
              key={`district_${key}`}
              onPress={() => {
                setDistrict(key);
                setVisibleDistrict(false);
              }}
              title={locations.district[province][canton][key]}
            />
          ))}
      </Menu>

      <TextInput
        style={styles.input}
        label="Dirección"
        mode="outlined"
        multiline
        numberOfLines={5}
        value={address}
        onChangeText={setAddress}
      />
    </>
  );
};

export default ContactInformation;
