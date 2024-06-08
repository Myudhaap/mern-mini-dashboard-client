import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { categoryReducer } from "./reducers/categorySlice";
import { productReducer } from "./reducers/productSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer
    }
})

export default store