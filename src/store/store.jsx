import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./slices/LoginSlice";
import { SignupSlice } from "./slices/SignUpSlice";

const store = configureStore({
    reducer: {
        login: LoginSlice.reducer,
        signup: SignupSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});

export default store;
