import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client.js";


export const tables = createAsyncThunk('table/tables', async ({qParams}) => {
    const {data: {data, columns} } = await axiosClient.get(`/tables/?${qParams}`)
    return {data, columns, qParams}
})

export const storeRow = createAsyncThunk('table/storeRow', async ({formData}, {getState}) => {
    const {qParams} = getState().tableReducer.value
    const {data} = await axiosClient.post(`/tables/?${qParams}`, formData)
    return data
})

export const updateRow = createAsyncThunk('table/updateRow', async ({id, formData}, {getState}) => {
    const {qParams} = getState().tableReducer.value
    formData.append('_method', 'PUT')
    const {data} = await axiosClient.post(`/tables/${id}/?${qParams}`, formData)
    return data
})

export const deleteRow = createAsyncThunk('table/deleteRow', async ({id}, {getState}) => {
    const {qParams} = getState().tableReducer.value
    const {data} = await axiosClient.delete(`/tables/${id}/?${qParams}`)
    return data
})

const initialState = {
    value: {
        data: [],
        columns: [],
        qParams: '',
        loading: false,
    }
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(tables.pending, (state) => {
                state.value = {
                    ...state.value,
                    loading: true,
                }
            })
            .addCase(tables.fulfilled, (state, action) => {
                const {data, columns, qParams} = action.payload
                state.value = {
                    ...state.value,
                    data,
                    columns,
                    qParams,
                    loading: false,
                }
            })
            .addCase(storeRow.fulfilled, (state, action) => {
                state.value = {
                    ...state.value,
                    data: [...state.value.data, action.payload]
                }
            })
            .addCase(updateRow.fulfilled, (state, action) => {
                const row = action.payload
                const oldRowIndex = state.value.data.findIndex((item) => item.id === row.id)
                state.value.data[oldRowIndex] = row
            })
            .addCase(deleteRow.fulfilled, (state, action) => {
                state.value = {
                    ...state.value,
                    data: state.value.data.filter((item) => item.id !== Number.parseInt(action.payload))
                }
            })
    }
})

export default tableSlice.reducer
