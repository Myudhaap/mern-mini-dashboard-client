import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { categoryReducer } from "./reducers/categorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer
    }
})

export default store