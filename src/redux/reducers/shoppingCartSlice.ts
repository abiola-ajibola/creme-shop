import { ShoppingCart } from "@/types/shoppingCart";
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ShoppingCart = {
  userId: "",
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
        ({ productId }) => productId !== action.payload
      );
    },
    increaseQty: (state, action) => {
      state.orderItems = state.orderItems.map(({ productId, qty }) => {
        if (productId === action.payload.productId) {
          return { productId, qty: qty + 1 };
        }
        return { productId, qty };
      });
    },
    decreaseQty: (state, action) => {
      state.orderItems = state.orderItems.map(({ productId, qty }) => {
        if (productId === action.payload.productId) {
          return { productId, qty: qty - 1 };
        }
        return { productId, qty };
      });
    },
    setQty: (state, action) => {
      state.orderItems = state.orderItems.map(({ productId, qty }) => {
        if (productId === action.payload.productId) {
          return { productId, qty: action.payload.qty };
        }
        return { productId, qty };
      });
    },
  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;
export const { addToCart, decreaseQty, increaseQty, setQty, removeFromCart } =
  shoppingCartSlice.actions;
