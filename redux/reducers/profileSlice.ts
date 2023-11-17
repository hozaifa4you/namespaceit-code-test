import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { STATUS } from "@/redux/status";
import { ReduxState } from "../store";

// thunk TODO: but I want to use thunk incase

// initial state
const initialState: ProfileSliceType = {
  profile: null,
  status: STATUS.IDLE,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state) => {},
    removeProfile: (state, payload) => {},
  },
});

export interface ProfileSliceType {
  profile: any | null;
  status: STATUS;
}

export const selectProfile = (state: ReduxState) => state.profile;
