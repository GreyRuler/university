import {configureStore} from "@reduxjs/toolkit";
import dbReducer from "../reducers/db/slice.js"
import tableReducer from "../reducers/table/slice.js"

const store = configureStore({
    reducer: {
        dbReducer,
        tableReducer,
    },
})

export default store
