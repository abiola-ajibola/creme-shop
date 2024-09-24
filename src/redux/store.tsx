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
import storage from "redux-persist/lib/storage";
import { shoppingCartReducer, userSliceReducer } from "./reducers";

const persistConfig = {
  key: "cart",
  storage: sessionStorage,
};

const persistConfigLocalStorage = {
  key: "user",
  storage: storage,
};

const persistedShoppingCartReducer = persistReducer(
  persistConfig,
  shoppingCartReducer,
);

const persistedUserReducer = persistReducer(
  persistConfigLocalStorage,
  userSliceReducer,
);

export const store = configureStore({
  reducer: {
    shoppingCartSlice: persistedShoppingCartReducer,
    userSlice: persistedUserReducer,
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
