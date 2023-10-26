import { configureStore } from '@reduxjs/toolkit'
import form from "./slice/form"
import userForm from "./slice/userForm"

export const store = configureStore({
    reducer: {
        form,
        userForm
    },
})