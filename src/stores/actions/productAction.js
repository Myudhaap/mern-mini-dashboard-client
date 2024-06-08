import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

const {
    getAll,
    getById,
    create,
    update,
    deleteCategory
} = productService()


export const getAllProductThunk = createAsyncThunk("[PRODUCT] getAll", async (payload, thunkAPI) => {
    try{
        const res = await getAll()
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const getByIdProductThunk = createAsyncThunk("[PRODUCT] getById", async (payload, thunkAPI) => {
    try{
        const res = await getById(payload)
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const createProductThunk = createAsyncThunk("[PRODUCT] create", async (payload, thunkAPI) => {
    try{
        const res = await create(payload)
        await thunkAPI.dispatch(getAllProductThunk())
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const updateProductThunk = createAsyncThunk("[PRODUCT] update", async (payload, thunkAPI) => {
    try{
        const res = await update(payload)
        await thunkAPI.dispatch(getAllProductThunk())
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const deleteProductThunk = createAsyncThunk("[PRODUCT] delete", async (payload, thunkAPI) => {
    try{
        const res = await deleteCategory(payload)
        await thunkAPI.dispatch(getAllProductThunk())
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})