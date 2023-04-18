import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";
import categoriesReducer from "./reducers/categories";

const middleware = [thunkMiddleware, thunk];

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
  middleware,
});

export default store;
