import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ShoppingCart } from "@/types/shoppingCart";
// import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ShoppingCart = {
  userId: "",
  // shipping: 100, // Should be dynamic
  orderItems: [],
};

export const shoppingCartSlice = createSlice({
  initialState: initialState,
  name: "shoppingCart",
  reducers: {
    addToCart: (state, action) => {
      state.orderItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.orderItems = state.orderItems.filter(
        ({ _id: productId }) => productId !== action.payload,
      );
    },
    setQty: (state, action) => {
      state.orderItems = state.orderItems.map((product) => {
        const { _id, qty } = product;
        if (_id === action.payload.productId) {
          return { ...product, qty: action.payload.qty };
        }
        return { ...product, qty };
      });
    },
  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;

export const selectAllCartItems = (state: RootState) =>
  state.shoppingCartSlice.orderItems;

export const selectAddedProducts = (state: RootState, productId: string) =>
  state.shoppingCartSlice.orderItems.find(({ _id: pid }) => pid === productId);

// export const selectShipping = (state: RootState) =>
//   state.shoppingCartReducer.shipping;

export const { addToCart, setQty, removeFromCart } = shoppingCartSlice.actions;
