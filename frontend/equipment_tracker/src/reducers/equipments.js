import { createSlice } from '@reduxjs/toolkit'

export const equipmentsSlice = createSlice({
    name: 'counter',
    initialState: {
        loading: false,
        data: [],
        error: undefined
    },
    reducers: {
        loadEquipments: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.loading = true
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadEquipments, decrement, incrementByAmount } = equipmentsSlice.actions

export default equipmentsSlice.reducer