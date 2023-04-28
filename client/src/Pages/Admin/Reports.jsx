import { Box, Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import OrderComp from "./Comp/OrderComp";
/* import { AuthContext } from '../../context/AppContext' */

const Reports = ({ orders, handleDeleteOrder }) => {
  // console.log(carts)

  return (
    <>
      {/* {orders && orders.map((el, i) => <OrderComp key={i} {...el} />)}
       */}
      {orders && (
        <OrderComp orders={orders} handleDeleteOrder={handleDeleteOrder} />
      )}
    </>
  );
};

export default Reports;
