import { createSlice } from "@reduxjs/toolkit"
import { getAllCategoryThunk, getByIdCategoryThunk } from "../actions/categoryAction"

const initialState = {
    categories: [],
    category: null,
    isLoading: true,
    message: ""
}

export const categorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        clearCategory: state => {
            state.category = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllCategoryThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(getAllCategoryThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message

            state.categories = payload.data.map(val => ({
                id: val._id,
                name: val.name
            }))
        })
        builder.addCase(getAllCategoryThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })

        builder.addCase(getByIdCategoryThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(getByIdCategoryThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message

            state.category = payload.data
        })
        builder.addCase(getByIdCategoryThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })
    }
})

export const categoryReducer = categorySlice.reducer
export const {
    clearCategory
} = categorySlice.actions