import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import categoriesReducer from "./reducers/categories";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
  middleware,
});

export default store;
