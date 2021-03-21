import React, { useContext, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { CatalogContext } from "../../providers/CatalogProvider";
import { PatientContext } from "../../providers/PatientProvider";
import CheckTab from "../../ui/CheckTab";
import Footer from "../../ui/Footer";
import Header from "../../ui/Header";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: "8%",
    paddingHorizontal: "2%",
  },
  text: {
    paddingHorizontal: "8%",
    paddingBottom: "8%",
    fontWeight: "bold",
  },
  error: {
    color: "red",
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

const NursingSheetData = ({
  checkGlassesList,
  checkContactLensList,
  setVisible,
}) => {
  const { pathologicalCatalog } = useContext(CatalogContext);

  const {
    patologicalHistory,
    medicamentHistory,
    alergyHistory,
    personalHistory,
    heritageHistory,
    traumaHistory,
    ophthalmologistHistory,
  } = useContext(PatientContext);

  const [checkPathological, setCheckPathological] = useState(false);
  const [checkMedicaments, setCheckMedicaments] = useState(false);
  const [checkAlergies, setCheckAlergies] = useState(false);
  const [checkPersonal, setCheckPersonal] = useState(false);
  const [checkHeritage, setCheckHeritage] = useState(false);
  const [checkTrauma, setCheckTrauma] = useState(false);
  const [checkOphtalmological, setCheckOphtalmological] = useState(false);

  /**START: String cleaning of histories */
  let pathologicalHistoryString =
    patologicalHistory &&
    `${patologicalHistory
      .slice(0, patologicalHistory.length - 1)
      .filter((history) => history !== "")
      .join(", ")}${
      patologicalHistory[patologicalHistory.length - 1] !== ""
        ? `, Otros: ${patologicalHistory[patologicalHistory.length - 1]}`
        : ""
    }`;

  if (pathologicalHistoryString[0] === ",") {
    const size = pathologicalHistoryString.length;
    pathologicalHistoryString = pathologicalHistoryString.slice(2, size);
  }

  let alergyHistoryString =
    alergyHistory &&
    `${alergyHistory
      .filter((history) => history && history !== "")
      .slice(0, patologicalHistory.length - 2)
      .join(", ")}${
      alergyHistory[alergyHistory.length - 2] !== ""
        ? `, Alimentos: (${alergyHistory[alergyHistory.length - 2]})`
        : ""
    }${
      alergyHistory[alergyHistory.length - 1] !== ""
        ? `, Otros: (${alergyHistory[alergyHistory.length - 1]})`
        : ""
    }`;

  if (alergyHistoryString[0] === ",") {
    const size = alergyHistoryString.length;
    alergyHistoryString = alergyHistoryString.slice(2, size);
  }

  let personalHistoryString =
    personalHistory &&
    `${personalHistory
      .slice(0, 4)
      .filter((history) => history !== "")
      .join(", ")}${
      checkGlassesList.find((glasses) => glasses !== "")
        ? `, Usuario de antejos :(${checkGlassesList
            .filter((history) => history !== "")
            .join(", ")})`
        : ""
    }${
      checkContactLensList.find((lens) => lens !== "")
        ? `, Usuario de lentes de contacto :(${checkContactLensList
            .filter((history) => history !== "")
            .join(", ")})`
        : ""
    }`;

  if (personalHistoryString[0] === ",") {
    const size = personalHistoryString.length;
    personalHistoryString = personalHistoryString.slice(2, size);
  }

  let heritageHistoryString = `${heritageHistory
    .slice(0, heritageHistory.length - 1)
    .filter((history) => history !== "")
    .join(", ")}${
    heritageHistory[heritageHistory.length - 1] !== ""
      ? `, Otros: (${heritageHistory[heritageHistory.length - 1]})`
      : ""
  }`;

  if (heritageHistoryString[0] === ",") {
    const size = heritageHistoryString.length;
    heritageHistoryString = heritageHistoryString.slice(2, size);
  }

  let ophthalmologistHistoryString = `${
    ophthalmologistHistory[0] !== ""
      ? `Detalles consulta: (${ophthalmologistHistory[0]})`
      : ""
  }${
    ophthalmologistHistory[1] !== ""
      ? `, Diagnótico de consulta: (${ophthalmologistHistory[1]})`
      : ""
  }${
    ophthalmologistHistory[2] !== ""
      ? `, Cirugía: (${ophthalmologistHistory[2]})`
      : ""
  }`;

  if (ophthalmologistHistoryString[0] === ",") {
    const size = ophthalmologistHistoryString.length;
    ophthalmologistHistoryString = ophthalmologistHistoryString.slice(2, size);
  }
  /**String cleaning of saving lists: END */

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
        <CheckTab
          name={pathologicalCatalog[0].Name}
          checkOn={checkPathological}
          setCheckOn={() => setCheckPathological(!checkPathological)}
        >
          {patologicalHistory ? (
            <Text style={styles.text}>
              {pathologicalHistoryString !== ""
                ? pathologicalHistoryString
                : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>

        <CheckTab
          name={pathologicalCatalog[1].Name}
          checkOn={checkMedicaments}
          setCheckOn={() => setCheckMedicaments(!checkMedicaments)}
        >
          {medicamentHistory ? (
            <Text style={styles.text}>
              {medicamentHistory.trim() !== ""
                ? medicamentHistory
                : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>

        <CheckTab
          name={pathologicalCatalog[2].Name}
          checkOn={checkAlergies}
          setCheckOn={() => setCheckAlergies(!checkAlergies)}
        >
          {alergyHistory ? (
            <Text style={styles.text}>
              {alergyHistoryString !== ""
                ? alergyHistoryString
                : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>

        <CheckTab
          name={pathologicalCatalog[3].Name}
          checkOn={checkPersonal}
          setCheckOn={() => setCheckPersonal(!checkPersonal)}
        >
          {personalHistory ? (
            <Text style={styles.text}>
              {personalHistoryString !== ""
                ? personalHistoryString
                : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>

        <CheckTab
          name={pathologicalCatalog[4].Name}
          checkOn={checkHeritage}
          setCheckOn={() => setCheckHeritage(!checkHeritage)}
        >
          {heritageHistoryString ? (
            <Text style={styles.text}>
              {heritageHistoryString !== ""
                ? heritageHistoryString
                : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>

        <CheckTab
          name={pathologicalCatalog[5].Name}
          checkOn={checkTrauma}
          setCheckOn={() => setCheckTrauma(!checkTrauma)}
        >
          {traumaHistory ? (
            <Text style={styles.text}>
              {traumaHistory !== "" ? traumaHistory : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>
        <CheckTab
          name={pathologicalCatalog[6].Name}
          checkOn={checkOphtalmological}
          setCheckOn={() => setCheckOphtalmological(!checkOphtalmological)}
        >
          {ophthalmologistHistory ? (
            <Text style={styles.text}>
              {ophthalmologistHistoryString !== ""
                ? ophthalmologistHistoryString
                : " No existen datos"}
            </Text>
          ) : (
            <Text style={styles.text}> No existen datos</Text>
          )}
        </CheckTab>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default NursingSheetData;
