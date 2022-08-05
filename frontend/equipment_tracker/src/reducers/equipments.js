import { createSlice } from '@reduxjs/toolkit'
import {equipments} from "../data/mock/data";
import {LIMIT } from "../constants/SearchTerms";

export const equipmentsSlice = createSlice({
    name: 'equipments',
    initialState: {
        loading: false,
        data: [],
        error: undefined,
        limit: 3,
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
            state.loading = false
            state.data = []
            state.error = action.payload
        },
    }
})

export const { equipmentsFetched, equipmentsFetchStarts, setSearchBy } = equipmentsSlice.actions

export const loadEquipments = (limit) => (dispatch) => {
    console.log("loadEquipments(limit: %s)", limit)
    dispatch(equipmentsFetchStarts())
    setTimeout(() => {
        dispatch(equipmentsFetched(equipments))
    }, 1000)
}

export const getEquipmentByNumber = (equipmentNumber) => (dispatch) => {
    console.log("getEquipmentByNumber(equipmentNumber: %s)", equipmentNumber)
    dispatch(equipmentsFetchStarts())
    setTimeout(() => {
        dispatch(equipmentsFetched([].push(equipments[0])))
    }, 1000)
}

export default equipmentsSlice.reducer