import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllUserFormAPI, getUserFormAPI, userFormAPI } from '../../axios/apiList'

export const getUserFormThunk = createAsyncThunk('userForm/getUserFormThunk', async (data, thunkAPI) => {
    const response = await getUserFormAPI()
    return response
})

export const userFormThunk = createAsyncThunk('userForm/userFormThunk', async (data, thunkAPI) => {
    const { name, questionData } = data
    const response = await userFormAPI({ name, questionData })
    return response
})

export const getAllUserFormThunk = createAsyncThunk('userForm/getAllUserFormThunk', async (data, thunkAPI) => {
    const response = await getAllUserFormAPI()
    return response
})

const initialState = {
    data: {},
    list: []
}

export const userFormSlice = createSlice({
    name: 'userForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserFormThunk.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(getAllUserFormThunk.fulfilled, (state, action) => {
            if (action?.payload?.code === 200) {
                state.list = action.payload.data
            }
        })
    }
})

export default userFormSlice.reducer