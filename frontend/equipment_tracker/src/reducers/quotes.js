import * as actionTypes from '../constants/SearchTerms'
import * as utils from '../../src/utils'

const initialState = {
    loading: false,
    symbols: [],
    quotes: {},
    error: undefined
}

function quotesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SYMBOLS_START:
            return Object.assign({}, state, {
                symbols: [],
                quotes: {},
                loading: true,
                error: undefined
            })
        case actionTypes.FETCH_QUOTES_START:
            console.log(state)
            return Object.assign({}, state, {
                quotes: {},
                loading: true,
                error: undefined
            })
        case actionTypes.ADD_SYMBOL_START:
            return Object.assign({}, state, {
                loading: true,
                error: undefined
            })
        case actionTypes.REMOVE_SYMBOL_START:
            return Object.assign({}, state, {
                loading: true,
                error: undefined
            })
        case actionTypes.FETCH_SYMBOLS_COMPLETED:
            return Object.assign({}, state, {
                symbols: action.payload,
                error: undefined
            })
        case actionTypes.FETCH_QUOTES_COMPLETED:
            return Object.assign({}, state, {
                loading: false,
                quotes: action.payload,
                error: undefined

            })
        case actionTypes.ADD_SYMBOL_COMPLETED:
            return Object.assign({}, state, {
                loading: false,
                symbols: action.payload,
                error: undefined
            })
        case actionTypes.REMOVE_SYMBOL_COMPLETED:
            return Object.assign({}, state, {
                loading: false,
                symbols: state.symbols.filter((s)=>{
                    return s !== action.payload
                }),
                quotes: utils.deepCopy(state.quotes, action.payload),
                error: undefined
            })
        case actionTypes.FETCH_SYMBOLS_ERROR:
            return Object.assign({}, {
                loading: false,
                symbols: [],
                quotes: {},
                error: action.payload

            })
        case actionTypes.FETCH_QUOTES_ERROR:
            return Object.assign({}, {
                loading: false,
                symbols: [],
                quotes: {},
                error: action.payload

            })
        case actionTypes.ADD_SYMBOL_ERROR:
            return Object.assign({}, {
                loading: false,
                symbols: [],
                quotes: {},
                error: action.payload

            })
        case actionTypes.REMOVE_SYMBOL_ERROR:
            return Object.assign({}, {
                loading: false,
                symbols: [],
                quotes: {},
                error: action.payload

            })
        default:
            return state
    }
}

export default quotesReducer