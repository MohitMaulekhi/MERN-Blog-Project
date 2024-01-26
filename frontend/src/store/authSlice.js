import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    userData: null,
    blogIndex:[],
    blogData : []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logOut: (state) => {
            state.status = false
            state.userData = null
        },
        blogsStorage:(state, action)=>{
            state.blogData = action.payload.blogData
        }
    }
})

export const { login, logOut,blogsStorage } = authSlice.actions
export default authSlice.reducer