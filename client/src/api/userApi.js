import axios from "axios";
import { dataUrl } from "../share";

const createNewUserService = (data) => {
  return axios.post(`${dataUrl}/create-new-user`, data);
};

const getAllUsersService = () => {
  return axios.get(`${dataUrl}/get-all-users`);
};

const editUserService = (data) => {
  return axios.put(`${dataUrl}/edit-user`, data);
};

const deleteUserService = (id) => {
  return axios.delete(`${dataUrl}/delete-user`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewUserService,
  getAllUsersService,
  editUserService,
  deleteUserService,
};
