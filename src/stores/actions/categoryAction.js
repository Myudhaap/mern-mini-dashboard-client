import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";

const {
    create,
    getAll,
    getById,
    update,
    deleteCategory
} = categoryService()

export const getAllCategoryThunk = createAsyncThunk("[CATEGORY] getAll", async (payload, thunkAPI) => {
    try{
        const res = await getAll()
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const getByIdCategoryThunk = createAsyncThunk("[CATEGORY] getById", async (payload, thunkAPI) => {
    try{
        const res = await getById(payload)
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const createCategoryThunk = createAsyncThunk("[CATEGORY] create", async (payload, thunkAPI) => {
    try{
        const res = await create(payload)
        await thunkAPI.dispatch(getAllCategoryThunk())
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const updateCategoryThunk = createAsyncThunk("[CATEGORY] update", async (payload, thunkAPI) => {
    try{
        const res = await update(payload)
        await thunkAPI.dispatch(getAllCategoryThunk())
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const deleteCategoryThunk = createAsyncThunk("[CATEGORY] delete", async (payload, thunkAPI) => {
    try{
        const res = await deleteCategory(payload)
        await thunkAPI.dispatch(getAllCategoryThunk())
        return res
    }catch(e){
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})