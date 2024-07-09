import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { projetsApi } from "./apis/projetsApi";
import { specApi } from "./apis/specApi";

const persistConfig = {
    key: "root",
    storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, projetsApi.reducer);
const persistedSpecReducer = persistReducer(persistConfig, specApi.reducer);

export const store = configureStore({
    reducer: {
        [projetsApi.reducerPath]: persistedReducer,
        [specApi.reducerPath]: persistedSpecReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: { ignoredActions: ["persist/PERSIST"]}
        }).concat(projetsApi.middleware, specApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);