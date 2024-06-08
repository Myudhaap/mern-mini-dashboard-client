import { createSlice } from "@reduxjs/toolkit"
import { createProductThunk, deleteProductThunk, getAllProductThunk, getByIdProductThunk, updateProductThunk } from "../actions/productAction"

const initialState = {
    products: [],
    product: null,
    isLoading: true,
    message: ""
}


export const productSlice = createSlice({
    initialState,
    name: "product",
    reducers: {
        clearProduct: state => {
            state.product = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllProductThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(getAllProductThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message

            state.products = payload.data.map(val => ({
                id: val._id,
                name: val.name,
                description: val.description,
                price: val.price,
                image: val.imageUrl,
                categoryId: val.categoryId
            }))
        })
        builder.addCase(getAllProductThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })

        builder.addCase(getByIdProductThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(getByIdProductThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message

            state.category = {
                id: payload.data._id,
                name: payload.data.name,
                description: payload.data.description,
                price: payload.data.price,
                image: payload.data.imageUrl,
                categoryId: payload.data.categoryId
            }
        })
        builder.addCase(getByIdProductThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })

        builder.addCase(createProductThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(createProductThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message
        })
        builder.addCase(createProductThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })

        builder.addCase(updateProductThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(updateProductThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message
        })
        builder.addCase(updateProductThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })

        builder.addCase(deleteProductThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(deleteProductThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message
        })
        builder.addCase(deleteProductThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })
    }
})

export const productReducer = productSlice.reducer
export const {
    clearProduct
} = productSlice.actions