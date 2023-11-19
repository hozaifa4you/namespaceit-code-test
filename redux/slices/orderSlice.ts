/* eslint-disable indent */
import { createSlice, Dispatch, type PayloadAction } from "@reduxjs/toolkit";

import { STATUS } from "@/redux/status";
import { ReduxState } from "../store";
import { Product, OrderStatus } from "@prisma/client";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export type PaymentMethod = "Card" | "CashOnDelivery";

interface OrderCart {
  orderId?: string;
  slug?: string;
  orderProducts?: [{ item: Product; qty: number }];
  totalPayment?: number;
  paymentMethod?: PaymentMethod;
  totalProduct?: number;
  deliveryCharge?: number;
  orderStatus?: OrderStatus;
  isPaid?: boolean;
  shippingInfo?: {
    name?: string;
    userId?: string | number;
    address?: {
      name?: string;
      phone?: string;
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      division?: string;
      zip?: string | number;
    };
  };
}

export interface OrderSliceType {
  order: OrderCart | null;
  status: STATUS;
  error: null;
  orderComplete: boolean;
}

// initial state
const initialState: OrderSliceType = {
  order: null,
  status: STATUS.IDLE,
  error: null,
  orderComplete: false,
};

export const orderSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // set product
    setProduct: (
      state,
      action: PayloadAction<{
        product: [{ item: Product; qty: number }];
        orderId: string;
        deliveryCharge: number;
        totalProduct: number;
      }>
    ) => {
      return {
        ...state,
        order: {
          ...state.order,
          orderProducts: action.payload.product,
          orderId: action.payload.orderId,
          deliveryCharge: action.payload.deliveryCharge,
          totalProduct: action.payload.totalProduct,
        },
      };
    },
    setShipping: (
      state,
      action: PayloadAction<{
        userId: number | string;
        name: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        division: string;
        zip: number | string;
        country: string;
        phone: string;
      }>
    ) => {
      return {
        ...state,
        order: {
          ...state.order,
          shippingInfo: {
            name: action.payload.name,
            userId: action.payload.userId,
            address: {
              addressLine1: action.payload.addressLine1,
              addressLine2: action.payload.addressLine2,
              city: action.payload.city,
              division: action.payload.division,
              name: action.payload.name,
              phone: action.payload.phone,
              zip: action.payload.zip,
            },
          },
        },
      };
    },
    setPayment: (
      state,
      action: PayloadAction<{
        paymentMethod: PaymentMethod;
        totalPayment: number;
        isPaid: boolean;
      }>
    ) => {
      return {
        ...state,
        order: {
          ...state.order,
          isPaid: action.payload.isPaid,
          paymentMethod: action.payload.paymentMethod,
          totalPayment: action.payload.totalPayment,
          orderStatus: "Processing",
          shippingInfo: {
            ...state.order?.shippingInfo,
          },
        },
      };
    },
    removeOrder: (state) => {
      state.order = null;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setComplete: (state) => {
      state.orderComplete = true;
    },
  },
});

// interface OrderRequestType {
//   orderId: string;
//   orderProducts: object;
//   totalPayment: number;
//   totalProduct: number;
//   deliveryCharge: number;
//   address: {
//     addressLine1: string;
//     city: string;
//     division: string;
//     zip: number;
//     addressLine2?: string;
//   };
// }

export const createOrderReducer =
  (
    orderId: string,
    orderProducts: object,
    totalPayment: number,
    totalProduct: number,
    deliveryCharge: number,
    address: any,
    paymentMethod: PaymentMethod,
    isPaid: boolean
  ) =>
  async (dispatch: Dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
      dispatch(setPayment({ isPaid, paymentMethod, totalPayment }));
      const { data } = await axios.post<{ msg: string; success: boolean }>(
        "/api/order/create",
        {
          orderId,
          orderProducts,
          totalPayment,
          totalProduct,
          deliveryCharge,
          address,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      notifications.show({
        title: "Order Creation",
        message: data.msg,
        color: "green",
      });

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

const { setPayment, setStatus, setError } = orderSlice.actions;

export const selectOrder = (state: ReduxState) => state.order;
