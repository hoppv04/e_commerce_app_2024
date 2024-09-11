import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/shop/addReview",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/review/add",
        formData
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const getReviews = createAsyncThunk("/shop/getReview", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    resetReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export const { resetReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
