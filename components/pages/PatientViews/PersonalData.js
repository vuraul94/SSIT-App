import React, { useContext } from "react";
import { View, ScrollView, Image, StyleSheet, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import { CatalogContext } from "../../providers/CatalogProvider";
import { PatientContext } from "../../providers/PatientProvider";
import moment from "moment";
import { CONSTANTS } from "../../../misc/constants";
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    color: "#074c76",
  },
  error: {
    color: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: "8%",
  },
  photo: {
    height: 160,
    width: 160,
    alignSelf: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  box: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  navButtons: {
    flex: 1,
    // alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
  },
});

const PersonalData = ({ identificationNumber, setVisible }) => {
  const { patientStatusCatalog } = useContext(CatalogContext);

  const {
    photo,
    name,
    lastNames,
    phone,
    email,
    province,
    canton,
    district,
    address,
    gender,
    birthDate,
    occupation,
    status,
  } = useContext(PatientContext);

  return (
    <ScrollView
      style={{
        backgroundColor: "#f0f0f0",
      }}
    >
      <Header />
      <View style={styles.navButtons}>
        <Button style={styles.buttonLeft} onPress={() => setVisible(false)}>
          {"<"} Atras
        </Button>
        <View style={{ minWidth: "10%" }}></View>
      </View>
      <View style={styles.container}>
        {photo !== "" ? (
          <Image
            style={styles.photo}
            source={{
              uri: photo,
            }}
          />
        ) : (
          <Image
            style={styles.photo}
            source={require("../../../assets/icon.png")}
          />
        )}
        <View style={styles.box}>
          <Text>
            <Text style={styles.label}>ID:</Text>
            {"   "}
            {identificationNumber}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Apellidos:</Text>
            {"   "}
            {lastNames && lastNames.trim() !== "" ? (
              lastNames
            ) : (
              <Text style={styles.error}>* El apellido es obligatorio</Text>
            )}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Nombre:</Text>
            {"   "}
            {name && name.trim() !== "" ? (
              name
            ) : (
              <Text style={styles.error}>* El nombre es obligatorio</Text>
            )}
          </Text>
        </View>

        <View style={styles.box}>
          <Text>
            <Text style={styles.label}>Estado:</Text>
            {"   "}
            {status && status !== 0 ? (
              patientStatusCatalog.find(
                (patientStatus) => patientStatus.PatientStatusId === status
              ).Name
            ) : (
              <Text style={styles.error}>* El estado es obligatorio</Text>
            )}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Género:</Text>
            {"   "}
            {gender === 0 ? "Femenino" : "Masculino"}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            {"   "}
            {birthDate && birthDate !== "" ? (
              moment(birthDate).format("DD/MM/YYYY")
            ) : (
              <Text style={styles.error}>* La fecha es obligatorio</Text>
            )}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Edad:</Text>
            {"   "}
            {birthDate && birthDate !== "" ? (
              moment(birthDate).fromNow(true).replace("years", "años")
            ) : (
              <Text style={styles.error}>* La fecha es obligatorio</Text>
            )}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Ocupación:</Text>
            {"   "}
            {occupation && occupation.trim() !== "" ? (
              occupation
            ) : (
              <Text style={styles.error}>* La ocupación es obligatorio</Text>
            )}
          </Text>
        </View>

        <View style={styles.box}>
          <Text>
            <Text style={styles.label}>Telefono:</Text>
            {"   "}
            {phone && phone.trim() !== "" ? (
              CONSTANTS.REGEX.PHONE.test(phone) ? (
                phone
              ) : (
                <Text style={styles.error}>
                  * El telefono ingresado es invalido
                </Text>
              )
            ) : (
              <Text style={styles.error}>* El telefono es obligatorio</Text>
            )}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Correo:</Text>
            {"   "}
            {email !== "" ? (
              CONSTANTS.REGEX.EMAIL.test(email) ? (
                email
              ) : (
                <Text style={styles.error}>
                  * El correo ingresado es invalido
                </Text>
              )
            ) : (
              "---"
            )}
            {"\n"}
          </Text>
          <Divider />
          <Text>
            {"\n"}
            <Text style={styles.label}>Dirección:</Text>
            {"   "}
            {(province !== "" &&
              canton !== "" &&
              district !== "" &&
              address) || (
              <Text style={styles.error}>
                * Los valores de dirección son necesarios (Provincia, Cantón,
                Distrito y Dirección)
              </Text>
            )}
          </Text>
        </View>

      </View>
      <Footer />
    </ScrollView>
  );
};

export default PersonalData;
