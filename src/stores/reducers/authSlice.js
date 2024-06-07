import {jwtDecode} from "jwt-decode"
import { createSlice } from "@reduxjs/toolkit"
import { authLoginThunk, authRegisterThunk } from "../actions/authAction"

const initialState = {
    auth: {
        name: null,
        email: null,
        userId: null,
        role: null
    },
    isLoading: false,
    message: ""
}

const authSlice = createSlice({
    initialState,
    name: "auth",
    extraReducers: builder => {
        builder.addCase(authLoginThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(authLoginThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message

            const decode = jwtDecode(payload.data.token)
            localStorage.setItem("token", payload.data.token)

            state.auth = {
                name: decode.name,
                email: decode.email,
                userId: decode.userId,
                role: decode.role
            }
        })
        builder.addCase(authLoginThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })

        builder.addCase(authRegisterThunk.pending, (state) => {
            state.isLoading = true
            state.message = ""
        })
        builder.addCase(authRegisterThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.message = payload.message

            state.auth = payload.data
        })
        builder.addCase(authRegisterThunk.rejected, (state, {payload}) => {
            state.isLoading = false
            state.message = payload
        })
    }
})

export const authReducer = authSlice.reducer