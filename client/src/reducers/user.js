import { createSlice } from "@reduxjs/toolkit";
import { loginUserService, registerUserService } from "../api/userApi";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("UserToken")) || null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const {
  logoutUser,
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;

export const loginUser = (data, toast, navigate) => async (dispatch) => {
  dispatch(loginStart());
  const response = await loginUserService(data);
  //   console.log("check res login user from redux: ", response);
  if (response.data.errCode === 0) {
    dispatch(loginSuccess(response.data.user));
    localStorage.setItem("UserToken", JSON.stringify(response.data.user));
    toast.success("Đăng nhập thành công");
    navigate("/");
  } else {
    dispatch(loginFailure(response.data.message));
    toast.error(response.data.message);
  }
};

export const registerUser = (data, toast, navigate) => async (dispatch) => {
  dispatch(registerStart());
  const response = await registerUserService(data);

  if (response.data.errCode === 0) {
    dispatch(registerSuccess(response.data.user));
    localStorage.setItem("UserToken", JSON.stringify(response.data.user));
    toast.success("Tạo tài khoản thành công thành công");
    navigate("/");
  } else {
    dispatch(registerFailure(response.data.message));
    toast.error(response.data.message);
  }
};

export default userSlice.reducer;
