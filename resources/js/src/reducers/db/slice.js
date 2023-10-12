import {createSlice} from "@reduxjs/toolkit";

const dbSlice = createSlice({
    name: 'db',
    initialState: {
        value: {
            connectionName: localStorage.getItem('connectionName'),
        }
    },
    reducers: {
        setConnectionName: (state, action) => {
            localStorage.setItem('connectionName', action.payload)
            state.value = {
                ...state.value,
                connectionName: action.payload,
            }
        },
    }
})

export const {
    setConnectionName,
} = dbSlice.actions

export default dbSlice.reducer
