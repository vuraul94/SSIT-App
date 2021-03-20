import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  navButtons: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor:"#ffffff",
    marginTop: -2,
  },
  buttonLeft: {
    marginBottom: 30,
  },
  buttonRight: {
    marginBottom: 30,
  },
});

const Paginator = ({ sections = [], history }) => {
  const [page, setPage] = useState(0);

  const handlePagination = (pageChange) => {
    setPage(page + pageChange);
  };

  return (
    <>
      <View style={styles.navButtons}>
        <Button
          style={styles.buttonLeft}
          onPress={
            page != 0 && page < sections.length
              ? () => {
                  handlePagination(-1);
                }
              : () => history.goBack()
          }
        >
          {"<"} Atras
        </Button>
        <View style={{ minWidth: "40%" }}>
          {page >= 0 && sections.length > 1 && page < sections.length - 1 && (
            <Button
              style={styles.buttonRight}
              onPress={() => {
                handlePagination(1);
              }}
            >
              Siguiente {">"}
            </Button>
          )}
        </View>
      </View>
      {sections.length > 0 && sections[page]}
    </>
  );
};

export default Paginator;
