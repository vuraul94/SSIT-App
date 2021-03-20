import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Colors, IconButton, TextInput } from "react-native-paper";
import { Redirect } from "react-router-native";
import axios from "axios";
import { CONSTANTS } from "../../misc/constants";
import Loader from "../ui/Loader"; 

let ScreenHeight = Dimensions.get("window").height - 190;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexGrow: 100,
    paddingHorizontal: 24,
    minHeight: ScreenHeight,
  },
  input: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
  button: {
    width: "80%",
    marginTop: 10,
    marginLeft: "10%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  error: { color: Colors.red500 },
});

/**
 * Login page in the app
 * receive the token "string or null"
 * receive the setToken "function"
 * receive the setTokenCreationTime "function"
 * receive the setSection "function"
 */
const Login = ({
  token,
  setToken,
  setTokenCreationTime,
  setSection,
  setCountryCatalog,
  setGenderCatalog,
  setPatientStatusCatalog,
  setPathologicalCatalog,
}) => {
  const [errorMsg, setErrorMsg] = useState();
  const [user, setUser] = useState("UserDev ");
  const [pass, setPass] = useState("Dev123");
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    setSection("Login");
  }, []);

  /**
   * Handle the button login and call the api to receive the authentication token
   */
  const handleLogin = () => {
    setLoaderVisible(true);
    axios
      .post(`${CONSTANTS.API.URL}/api/Authentication/authenticate`, {
        Username: user,
        Password: pass,
      })
      .then((response) => {
        setErrorMsg(null);
        setTokenCreationTime(Date.now());
        getCatalog(response.data.Token);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          setErrorMsg("Credenciales equivocadas");
        } else {
          setErrorMsg("Algo ocurrio");
        }
        setLoaderVisible(false);
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
        }, 5000);
      });
  };

  const getCatalog = (token) => {
    axios
      .get(`${CONSTANTS.API.URL}/api/CatalogController/GetAllCatalog`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data.Response;
        setCountryCatalog(data.CountryCatalog);
        setGenderCatalog(data.GenderCatalog);
        setPatientStatusCatalog(data.PatientStatus);
        setPathologicalCatalog(data.PathologicalCatalog);
        setToken(token);
      });
  };

  const closeLoader = () => {
    setLoaderVisible(false);
    return true;
  };

  return (
    <View style={styles.container}>
      {token && token !== "" && closeLoader && <Redirect to="/Search" />}
      <Loader visible={loaderVisible} />

      <Modal
        animationType="slide"
        visible={errorVisible}
        transparent={true}
        onRequestClose={() => {
          setErrorVisible(!errorVisible);
        }}
        onDismiss={() => setErrorVisible(false)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => setErrorVisible(false)}
        >
          <View style={styles.modalView}>
            {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
            <IconButton
              icon="close"
              color={Colors.red500}
              size={20}
              onPress={() => setErrorVisible(false)}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <TextInput
        label="Username"
        style={styles.input}
        value={user}
        mode="outlined"
        onChangeText={(e) => {
          setUser(e);
        }}
      ></TextInput>

      <TextInput
        label="Password"
        secureTextEntry={true}
        style={styles.input}
        value={pass}
        mode="outlined"
        onChangeText={(e) => {
          setPass(e);
        }}
      ></TextInput>
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
};

export default Login;
