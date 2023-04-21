import axios from "axios";
import { dataUrl } from "../share";
import user from "../reducers/user";

const createNewCartService = (data) => {
  return axios.post(`${dataUrl}/create-new-cart`, data);
};

const getAllCartsService = () => {
  return axios.get(`${dataUrl}/get-all-carts`);
};

const getAllCartsByUserIdService = (userId) => {
  return axios.get(`${dataUrl}/get-all-carts-by-userId`, {
    params: {
      userId: userId,
    },
  });
};

const editCartService = (data) => {
  return axios.put(`${dataUrl}/edit-cart`, data);
};

const deleteCartService = (id) => {
  return axios.delete(`${dataUrl}/delete-cart`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewCartService,
  getAllCartsService,
  getAllCartsByUserIdService,
  editCartService,
  deleteCartService,
};
