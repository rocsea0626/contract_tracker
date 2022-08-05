import * as actionTypes from '../constants/SearchTerms'


const initialState = {
    loading: false,
    selectedTimeStamp: 0,
    data: [],
    error: undefined
}

function chartReducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case actionTypes.FETCH_CHART_START:
            return Object.assign({}, state, {
                loading: true,
                selectedTimeStamp: 0,
                data: [],
                error: undefined
            })
        case actionTypes.FETCH_CHART_COMPLETED:
            return Object.assign({}, state, {
                selectedTimeStamp: 0,
                data: action.payload,
                loading: false,
                error: undefined
            })
        case actionTypes.FETCH_CHART_ERROR:
            console.log(action)
            return Object.assign({}, state, {
                data: [],
                loading: false,
                selectedTimeStamp: 0,
                error: action.payload
            })
        case actionTypes.SELECT_SYMBOL:
            return Object.assign({}, state, {
                selectedTimeStamp: action.payload.timestamp,
            })
        default:
            return state
    }
}

export default chartReducer