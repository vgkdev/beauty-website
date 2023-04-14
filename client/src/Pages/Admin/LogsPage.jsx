import { Box, Divider, Text, Button } from "@chakra-ui/react";
import React from "react";
import ProductComp from "./Comp/ProductComp";

const LogsPage = ({
  products,
  handleShowModalProduct,
  handleDeleteProduct,
}) => {
  return (
    <Box>
      <Text fontSize="xl">All Products</Text>
      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
      {products &&
        products.map((el, index) => (
          <ProductComp
            key={index}
            {...el}
            handleShowModalProduct={handleShowModalProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}

      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />

      <Button
        style={{ margin: "0 auto" }}
        colorScheme="whatsapp"
        onClick={() => handleShowModalProduct(null, "Create")}
      >
        + Create new category
      </Button>
    </Box>
  );
};

export default LogsPage;
