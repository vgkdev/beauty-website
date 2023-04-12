import { Box, Button, Flex, Select, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const UserComp = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  status,
  role,
  deleteFun,
  changeRole,
  userBan,
  handleShowModalUser,
  handleDeleteUser,
}) => {
  return (
    <Box textAlign={"center"} mb="20px" border={"1px solid #9130c2"} p={3}>
      <SimpleGrid columns={[1, 2, 2, 3, 3]} spacing={10}>
        <Text fontSize="lg">Name: {firstName + " " + lastName} </Text>
        <Text fontSize="lg">Email: {email} </Text>
        <Text fontSize="lg">phone: {phoneNumber} </Text>

        <Button
          colorScheme={"blue"}
          onClick={() => handleShowModalUser(id, "Detail")}
        >
          Detail
        </Button>

        <Button
          colorScheme={"blue"}
          onClick={() => handleShowModalUser(id, "Update")}
        >
          Update
        </Button>

        <Button colorScheme={"blue"} onClick={() => handleDeleteUser(id)}>
          {" "}
          Delete{" "}
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default UserComp;
