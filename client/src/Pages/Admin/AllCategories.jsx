import React from "react";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import UserComp from "./Comp/UserComp";
import CategoryComp from "./Comp/CategoryComp";

const AllCategories = ({
  categories = [],
  handleShowModalCategory,
  handleDeleteCategory,
}) => {
  return (
    <Box>
      <Text>All categories</Text>
      <Divider
        mt="3px"
        mb="3px"
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
      <hr color="black" size="50px" />
      <Box>
        {categories &&
          categories.map((el, index) => (
            <CategoryComp
              key={index}
              {...el}
              handleShowModalCategory={handleShowModalCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))}
      </Box>
      <Button
        style={{ margin: "0 auto" }}
        colorScheme="whatsapp"
        onClick={() => handleShowModalCategory(null, "Create")}
      >
        + Create new category
      </Button>
    </Box>
  );
};

export default AllCategories;
