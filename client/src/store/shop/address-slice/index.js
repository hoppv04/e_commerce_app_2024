import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/add-new-address",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/address/add",
        formData
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/address/fetch-all-addresses",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/address/get/${userId}`
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const editAddress = createAsyncThunk(
  "/address/edit-address",
  async ({ userId, addressId, formData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
        formData
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/delete-address",
  async ({ userId, addressId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
