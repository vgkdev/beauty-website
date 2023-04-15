import { createSlice } from "@reduxjs/toolkit";

import {
  editCategoryService,
  getAllCategoriesService,
} from "../api/categoryApi";

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    getProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      state.loading = false;
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} = categoriesSlice.actions;

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(getProductStart());
    const response = await getAllCategoriesService();
    console.log("check categories redux: ", response.data.category);
    dispatch(getProductSuccess(response.data.category));
  } catch (error) {
    dispatch(getProductFailure(error.message));
  }
};

export const updateProduct = (data) => async (dispatch) => {
  try {
    dispatch(updateProductStart());
    const response = await editCategoryService(data);
    dispatch(updateProductSuccess(response.data.category));
  } catch (error) {
    dispatch(updateProductFailure(error.message));
  }
};

export default categoriesSlice.reducer;
