import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import { shoppingCartReducer, userSliceReducer } from "./reducers";

const persistConfig = {
  key: "cart",
  storage: sessionStorage,
};

const persistedShoppingCartReducer = persistReducer(
  persistConfig,
  shoppingCartReducer,
);

export const store = configureStore({
  reducer: {
    shoppingCartReducer: persistedShoppingCartReducer,
    userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
