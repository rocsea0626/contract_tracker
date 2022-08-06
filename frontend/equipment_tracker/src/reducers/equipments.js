import { createSlice } from '@reduxjs/toolkit'
import {equipments} from "../data/mock/data";
import {LIMIT } from "../constants/SearchTerms";
import {fetchEquipments, fetchEquipmentByNumber} from "../api"

export const equipmentsSlice = createSlice({
    name: 'equipments',
    initialState: {
        loading: false,
        data: [],
        error: undefined,
        limit: 10,
        searchBy: LIMIT
    },
    reducers: {
        setLimit: (state, action) => {
            console.log("setLimit(payload: %s)", action.payload)
            state.limit = action.payload
        },
        setSearchBy: (state, action) => {
            console.log("setSearchBy(payload: %s)", action.payload)
            state.searchBy = action.payload
        },
        equipmentsFetched: (state, action) => {
            console.log("equipmentsFetched()")
            // console.log(action.payload)
            state.data = action.payload
            state.loading = false
        },
        equipmentsFetchStarts: (state) => {
            console.log("equipmentsFetchStarts()")
            state.loading = true
            state.error = undefined
        },
        equipmentsFetchFailed: (state, action) => {
            console.log("equipmentsFetchFailed()")
            console.log(action.payload)
            state.loading = false
            state.data = []
            state.error = action.payload
        },
    }
})

export const { equipmentsFetched, equipmentsFetchStarts, setSearchBy, equipmentsFetchFailed } = equipmentsSlice.actions

export const getEquipments = (limit) => async (dispatch) => {
    console.log("getEquipments(limit: %s)", limit)
    try{
        dispatch(equipmentsFetchStarts())
        const res = await fetchEquipments(limit)
        dispatch(equipmentsFetched(res.data))
    } catch (err) {
        console.log("getEquipments() failed with statusCode: %s", err.response.status)
        dispatch(equipmentsFetchFailed({
            statusCode: err.response.status,
            message: err.response.data
        }))
    }
}

export const getEquipmentByNumber = (equipmentNumber) => async (dispatch) => {
    console.log("getEquipmentByNumber(equipmentNumber: %s)", equipmentNumber)
    try{
        if(!equipmentNumber){
            dispatch(equipmentsFetchFailed({
                statusCode: "400",
                message: "equipmentNumber is missing"
            }))
            return
        }
        dispatch(equipmentsFetchStarts())
        const res = await fetchEquipmentByNumber(equipmentNumber)
        console.log(res.data)
        dispatch(equipmentsFetched([].concat(res.data)))
    } catch (err) {
        console.log("getEquipmentByNumber() failed with statusCode: %s", err.response.status)
        dispatch(equipmentsFetchFailed({
            statusCode: err.response.status,
            message: err.response.data
        }))
    }
}

export default equipmentsSlice.reducer