import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "cart/add-to-cart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetch-cart-items",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete-cart-item",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/update-cart-quantity",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
