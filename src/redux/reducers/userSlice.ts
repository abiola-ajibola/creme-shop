import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/types/user";
// import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  _id: "",
  address: {
    city: "",
    country: "",
    state: "",
    street: "",
  },
  email: "",
  firstname: "",
  lastname: "",
  phone: "",
  zip_code: "",
};

export const userSlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const userSliceReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state;

export const { setUser, updateAddress } = userSlice.actions;
