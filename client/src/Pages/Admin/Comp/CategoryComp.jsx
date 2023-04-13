import { Box, Button, Grid, Text, GridItem } from "@chakra-ui/react";
import React from "react";

const CategoryComp = ({
  id,
  categoryName,
  productCount,
  handleShowModalCategory,
  handleDeleteCategory,
}) => {
  return (
    <Box textAlign={"left"} mb="20px" border={"1px solid #9130c2"} p={3}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 5, md: 3, lg: 4 }}>
          <Text fontSize="lg">
            {categoryName} ({productCount} products)
          </Text>
        </GridItem>

        <GridItem
          //   colStart={4}
          //   colEnd={6}
          colSpan={{ base: 5, md: 2, lg: 1 }}
          style={{ display: "flex", gap: "5px" }}
        >
          <Button
            colorScheme={"blue"}
            onClick={() => handleShowModalCategory(id, "Detail")}
          >
            Detail
          </Button>
          <Button
            colorScheme={"blue"}
            onClick={() => handleShowModalCategory(id, "Update")}
          >
            Update
          </Button>
          <Button colorScheme={"blue"} onClick={() => handleDeleteCategory(id)}>
            {" "}
            Delete{" "}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CategoryComp;