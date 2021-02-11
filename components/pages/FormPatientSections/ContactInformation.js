import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { locations } from "../../../misc/locations";
import { Button, TextInput, Menu } from "react-native-paper";

const ContactInformation = ({
  phone,
  setPhone,
  mail,
  setMail,
  province,
  setProvince,
  canton,
  setCanton,
  district,
  setDistrict,
  direction,
  setDirection
}) => {
 

  const [visibleProvince, setVisibleProvince] = useState(false);
  const [visibleCanton, setVisibleCanton] = useState(false);
  const [visibleDistrict, setVisibleDistrict] = useState(false);

  return (
    <>
      <TextInput label="Numero de teléfono" mode="outlined" />
      <TextInput label="Correo" mode="outlined" />

      <Menu
        visible={visibleProvince}
        onDismiss={() => setVisibleProvince(false)}
        anchor={
          <Button onPress={() => setVisibleProvince(true)} mode="outlined">
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
        visible={visibleCanton}
        onDismiss={() => setVisibleCanton(false)}
        anchor={
          <Button onPress={() => setVisibleCanton(true)} mode="outlined">
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
        visible={visibleDistrict}
        onDismiss={() => setVisibleDistrict(false)}
        anchor={
          <Button onPress={() => setVisibleDistrict(true)} mode="outlined">
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
        label="Dirección"
        mode="outlined"
        multiline
        numberOfLines={5}
      />
    </>
  );
};

export default ContactInformation;
