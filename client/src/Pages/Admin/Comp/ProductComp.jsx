import {
  Box,
  Button,
  Flex,
  Image,
  Divider,
  Grid,
  Spacer,
  Text,
  GridItem,
} from "@chakra-ui/react";
import React from "react";

const ProductComp = ({
  handleDeleteProduct,
  productName,
  imageUrl,
  id,
  price,
  quantity,
  Category,
  handleShowModalProduct,
}) => {
  // console.log("check image url: ", imageUrl);
  return (
    <Box p={"2"} textAlign={"center"} mb="20px" border={"2px solid #50555e"}>
      <Text fontWeight={"bold"}>{productName} </Text>
      <Divider mt="3px" mb="3px" orientation="horizontal" />
      <Flex flexDirection={["column", "row", "row", "row"]} alignItems="center">
        <Box w="35%">
          <Image
            objectFit="contain"
            boxSize="200px"
            src={`data:image/jpeg;base64,${imageUrl}`}
          />
        </Box>
        <Spacer />
        <Grid w="60%" mt={"15px"} templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 5, lg: 4 }}>
            <Text>Price - {price} </Text>
            <Text>Quantity - {quantity} </Text>
            <Text>Category name - {Category.categoryName} </Text>
          </GridItem>

          <GridItem colSpan={{ base: 5, lg: 1 }}>
            <Button
              mr={{ base: 5, lg: 0 }}
              colorScheme={"blue"}
              onClick={() => handleShowModalProduct(id, "Update")}
            >
              Update product
            </Button>
            <Button
              mr={{ base: 5, lg: 0 }}
              colorScheme={"blue"}
              onClick={() => handleShowModalProduct(id, "Update_image")}
            >
              Update image
            </Button>
            <Button
              colorScheme={"blue"}
              onClick={() => handleDeleteProduct(id)}
            >
              Delete
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default ProductComp;
