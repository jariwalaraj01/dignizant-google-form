import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { formAdmin, getFormAdmin } from '../../axios/apiList'

export const getFormThunk = createAsyncThunk('form/getFormThunk', async (data, thunkAPI) => {
    const response = await getFormAdmin()
    return response.data
})

export const formThunk = createAsyncThunk('form/formThunk', async (data, thunkAPI) => {
    const { id, title, description, questionData } = data
    const response = await formAdmin({ id, title, description, questionData })
    return response
})

const initialState = {
    data: {},
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFormThunk.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default formSlice.reducer