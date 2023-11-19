// import { Dispatch } from "@reduxjs/toolkit";
// import { STATUS } from "../status";
// import { Product } from "@prisma/client";
// import axios from "axios";

// // TODO: fetchOne from database
// export const setCartReducer =
//   (productId: number, qty: number) => async (dispatch: Dispatch) => {
//     dispatch(setStatus(STATUS.LOADING));

//     try {
//       const { data } = await axios.get<Product>(
//         `/api/product/single-product/${productId}`
//       );
//       dispatch(setCart({ item: data, qty }));
//       dispatch(setStatus(STATUS.IDLE));
//     } catch (err: any) {
//       dispatch(setStatus(STATUS.FAILED));
//       const err_message: string =
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message;
//       dispatch(setError(err_message));
//     }
//   };

// // TODO: increaseCardQty cart reducer
// export const increaseCardQtyReducer =
//   (productId: number) => async (dispatch: Dispatch) => {
//     dispatch(setStatus(STATUS.LOADING));

//     try {
//       const { data } = await axios.get<Product>(
//         `/api/product/single-product/${productId}`
//       );
//       dispatch(increaseCardQty({ item: data }));
//       dispatch(setStatus(STATUS.IDLE));
//     } catch (err: any) {
//       dispatch(setStatus(STATUS.FAILED));
//       const err_message: string =
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message;
//       dispatch(setError(err_message));
//     }
//   };

// // TODO: decreaseCardQty cart reducer
// export const decreaseCardQtyReducer =
//   (productId: number) => async (dispatch: Dispatch) => {
//     dispatch(setStatus(STATUS.LOADING));

//     try {
//       const { data } = await axios.get<Product>(
//         `/api/product/single-product/${productId}`
//       );
//       dispatch(decreaseCardQty({ item: data }));
//       dispatch(setStatus(STATUS.IDLE));
//     } catch (err: any) {
//       dispatch(setStatus(STATUS.FAILED));
//       const err_message: string =
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message;
//       dispatch(setError(err_message));
//     }
//   };

// // TODO: remove one cart reducer
// export const removeCartReducer =
//   (productId: number) => async (dispatch: Dispatch) => {
//     dispatch(setStatus(STATUS.LOADING));
//     try {
//       const { data } = await axios.get<Product>(
//         `/api/product/single-product/${productId}`
//       );
//       dispatch(removeCart({ item: data }));
//       dispatch(setStatus(STATUS.IDLE));
//     } catch (err: any) {
//       dispatch(setStatus(STATUS.FAILED));
//       const err_message: string =
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message;
//       dispatch(setError(err_message));
//     }
//   };

// // TODO: remove one cart reducer
// export const removeCartsReducer = () => async (dispatch: Dispatch) => {
//   dispatch(setStatus(STATUS.LOADING));
//   try {
//     dispatch(removeCarts());
//     dispatch(setStatus(STATUS.IDLE));
//   } catch (err: any) {
//     dispatch(setStatus(STATUS.FAILED));
//     const err_message: string =
//       err.response && err.response.data.message
//         ? err.response.data.message
//         : err.message;
//     dispatch(setError(err_message));
//   }
// };
