import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const Paginator = ({ sections = [] }) => {
  const [page, setPage] = useState(0);

  const handlePagination = (pageChange) => {
    setPage(page + pageChange);
  };

  return (
    <>
      {sections.length > 0 && sections[page]}
      <View>
        {page != 0 && page < sections.length && (
          <Button
            onPress={() => {
              handlePagination(-1);
            }}
          >
            Anterior
          </Button>
        )}
        {page >= 0 && sections.length > 1 && page < sections.length - 1 && (
          <Button
            onPress={() => {
              handlePagination(1);
            }}
          >
            Siguiente
          </Button>
        )}
      </View>
    </>
  );
};

export default Paginator;
