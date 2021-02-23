import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  navButtons: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonLeft:{
    marginTop: 20,
    marginBottom: 30,
    left: 10,
  },
  buttonRight:{
    marginTop: 20,
    position: 'absolute', 
    right: 10,
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
