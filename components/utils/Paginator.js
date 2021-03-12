import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  navButtons: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonLeft:{
    marginTop: 10,
    marginBottom: 30,
  },
  buttonRight:{
    marginTop: 10,
    marginBottom: 30,
  }
});

const Paginator = ({ sections = [] }) => {
  const [page, setPage] = useState(0);

  const handlePagination = (pageChange) => {
    setPage(page + pageChange);
  };

  return (
    <>
      {sections.length > 0 && sections[page]}
      <View style={styles.navButtons}>
        {page != 0 && page < sections.length && (
          <Button
          style={styles.buttonLeft} //ESTO ROMPE EL BOTON EN LA ULTIMA PAGINA DEL FORMULARIO
          mode="contained"
            onPress={() => {
              handlePagination(-1);
            }}
          >
            {"<"} Anterior
          </Button>
        )}
        {page >= 0 && sections.length > 1 && page < sections.length - 1 && (
          <Button
            style={styles.buttonRight}
            mode="contained"
            onPress={() => {
              handlePagination(1);
            }}
          >
            Siguiente {">"}
          </Button>
        )}
      </View> 
    </>
  );
};

export default Paginator;
