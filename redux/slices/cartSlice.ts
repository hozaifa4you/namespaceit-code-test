import { createSlice, Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { STATUS } from "@/redux/status";
import { ReduxState } from "../store";
import { Product } from "@prisma/client";
import axios from "axios";

export interface CartSliceType {
  cart: [{ item: Product; qty: number }] | null;
  status: STATUS;
  error: null;
}

const cart_info = "cart-info";

// initial state
const initialState: CartSliceType = {
  cart: localStorage.getItem(cart_info)
    ? (JSON.parse(localStorage.getItem(cart_info)!) as [
        { item: Product; qty: number }
      ])
    : null,
  status: STATUS.IDLE,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ item: Product; qty: number }>) => {
      const { item, qty } = action.payload;
      if (state.cart) {
        // Check if the item is already in the cart
        const existingItem = state.cart.find(
          (cartItem) => cartItem.item.id === item.id
        );

        if (existingItem) {
          // If the item exists, update the quantity
          existingItem.qty += qty;
        } else {
          // If the item is not in the cart, add it
          state.cart.push({ item, qty });
        }
      } else {
        // If the cart is empty, create a new cart with the item
        state.cart = [{ item, qty }];
      }

      // Save the updated cart to local storage
      localStorage.setItem(cart_info, JSON.stringify(state.cart));
    },
    // Hello ChatGPT fix there
    // you have to decrease qty one by one if the product already exist
    decreaseCardQty: (state, action: PayloadAction<{ item: Product }>) => {
      const { item } = action.payload;
      if (state.cart) {
        // Find the index of the item in the cart
        const index = state.cart.findIndex(
          (cartItem) => cartItem.item.id === item.id
        );

        if (index !== -1) {
          // If the item exists in the cart, decrease the quantity by one
          state.cart[index].qty -= 1;

          // If the quantity becomes zero, remove the item from the cart
          if (state.cart[index].qty === 0) {
            state.cart.splice(index, 1);
          }

          // Save the updated cart to local storage
          localStorage.setItem(cart_info, JSON.stringify(state.cart));
        }
      }
    },
    removeCart: (state, action: PayloadAction<{ item: Product }>) => {
      const { item } = action.payload;
      if (state.cart) {
        // Remove the item from the cart
        state.cart = state.cart.filter(
          (cartItem) => cartItem.item.id !== item.id
        ) as CartSliceType["cart"];

        // Save the updated cart to local storage
        localStorage.setItem(cart_info, JSON.stringify(state.cart));
      }
    },
    removeCarts: (state) => {
      state.cart = null;
      localStorage.removeItem(cart_info);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// TODO: fetchOne from database
export const setCartReducer =
  (productId: number, qty: number) => async (dispatch: Dispatch) => {
    dispatch(setStatus(STATUS.LOADING));

    try {
      const { data } = await axios.get<Product>(
        `/api/product/single-product/${productId}`
      );
      dispatch(setCart({ item: data, qty }));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err: any) {
      dispatch(setStatus(STATUS.FAILED));
      const err_message: string =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch(setError(err_message));
    }
  };

// TODO: decreaseCardQty cart reducer
export const decreaseCardQtyReducer =
  (productId: number) => async (dispatch: Dispatch) => {
    dispatch(setStatus(STATUS.LOADING));

    try {
      const { data } = await axios.get<Product>(
        `/api/product/single-product/${productId}`
      );
      dispatch(decreaseCardQty({ item: data }));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err: any) {
      dispatch(setStatus(STATUS.FAILED));
      const err_message: string =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch(setError(err_message));
    }
  };

// TODO: remove one cart reducer
export const removeCartReducer =
  (productId: number) => async (dispatch: Dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const { data } = await axios.get<Product>(
        `/api/product/single-product/${productId}`
      );
      dispatch(removeCart({ item: data }));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err: any) {
      dispatch(setStatus(STATUS.FAILED));
      const err_message: string =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch(setError(err_message));
    }
  };

// TODO: remove one cart reducer
export const removeCartsReducer = () => async (dispatch: Dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  try {
    dispatch(removeCarts());
    dispatch(setStatus(STATUS.IDLE));
  } catch (err: any) {
    dispatch(setStatus(STATUS.FAILED));
    const err_message: string =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(setError(err_message));
  }
};

const {
  setError,
  setStatus,
  decreaseCardQty,
  removeCart,
  removeCarts,
  setCart,
} = cartSlice.actions;

export const selectCart = (state: ReduxState) => state.cart;
