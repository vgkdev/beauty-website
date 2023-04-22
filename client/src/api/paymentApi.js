import axios from "axios";
import { dataUrl } from "../share";

const createPaymentService = (data) => {
  return axios.get(`${dataUrl}/create-payment`, {
    params: {
      amount: data.amount,
      orderId: data.orderId,
      orderInfo: data.orderInfo,
      clientIp: data.clientIp,
    },
  });
};

export { createPaymentService };
