import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

const {login, register} = authService()

export const authLoginThunk = createAsyncThunk("[Auth] Login", async (payload, thunkAPI) => {
    try{
        const res = await login(payload)
        return res
    }catch(e){
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const authRegisterThunk = createAsyncThunk("[Auth] Register", async (payload, thunkAPI) => {
    try{
        const res = await register(payload)
        return res
    }catch(e){
        return thunkAPI.rejectWithValue(e.message)
    }
})