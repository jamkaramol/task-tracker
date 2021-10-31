import { configureStore } from '@reduxjs/toolkit'
import taskDetailsSlice from "./taskDetailsSlice";
export default configureStore({
    reducer: {
        taskDetails: taskDetailsSlice
    },
})