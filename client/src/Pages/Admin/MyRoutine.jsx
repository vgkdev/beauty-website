import React, { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  position,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
/* import { AuthContext } from '../../context/AppContext' */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserComp from "./Comp/UserComp";

const MyRoutine = ({
  users = [],
  deleteFun,
  changeRole,
  userBan,
  handleShowModalUser,
  handleDeleteUser,
}) => {
  return (
    <Box>
      <Text>All Users</Text>
      <Divider
        mt="3px"
        mb="3px"
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
      <hr color="black" size="50px" />
      <Box>
        {users &&
          users.map((el, index) => (
            <UserComp
              key={index}
              {...el}
              deleteFun={deleteFun}
              changeRole={changeRole}
              userBan={userBan}
              handleShowModalUser={handleShowModalUser}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
      </Box>
      <Button
        style={{ margin: "0 auto" }}
        colorScheme="whatsapp"
        onClick={() => handleShowModalUser(null, "Create")}
      >
        + Create new user
      </Button>
    </Box>
  );
};

export default MyRoutine;
