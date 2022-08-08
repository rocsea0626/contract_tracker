import {
    LIMIT,
    EQUIPMENT_NUMBER
} from "../constants/SearchTerms";
import reducer, {
    equipmentsFetched,
    equipmentsFetchStarts,
    setSearchBy,
    equipmentsFetchFailed,
    getEquipments,
    getEquipmentByNumber
} from "./equipments"
const sinon = require('sinon')
const api = require('../api/aws')
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const equipmentsList = [
    {
        EquipmentNumber: "en_12345",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
    },
    {
        EquipmentNumber: "en_2",
        Address: "address_2",
        StartDate: "start_date_2",
        EndDate: "end_date_2",
        Status: "Stopped",
    },
    {
        EquipmentNumber: "en_3",
        Address: "address_3",
        StartDate: "start_date_3",
        EndDate: "end_date_3",
        Status: "Stopped",
    },
]
const sandbox = sinon.createSandbox()

const initialState = {
    loading: false,
    data: [],
    error: undefined,
    limit: 10,
    searchBy: LIMIT
}




describe("Test equipments reducer", () => {
    it('Test initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({
            loading: false,
            data: [],
            error: undefined,
            limit: 10,
            searchBy: LIMIT
        })
    })

    it("Test equipmentsFetchStarts()", () => {
        expect(reducer(initialState, equipmentsFetchStarts())).toEqual({
            loading: true,
            data: [],
            error: undefined,
            limit: 10,
            searchBy: LIMIT
        })
    })

    it("Test setSearchBy()", () => {
        expect(reducer(initialState, setSearchBy(EQUIPMENT_NUMBER))).toEqual({
            loading: false,
            data: [],
            error: undefined,
            limit: 10,
            searchBy: EQUIPMENT_NUMBER
        })
    })

    it("Test equipmentsFetched()", () => {
        expect(reducer(initialState, equipmentsFetched(equipmentsList))).toEqual({
            loading: false,
            data: equipmentsList,
            error: undefined,
            limit: 10,
            searchBy: LIMIT
        })

    })

    it("Test equipmentsFetchFailed()", () => {
        const mockError = {}
        expect(reducer(initialState, equipmentsFetchFailed(mockError))).toEqual({
            loading: false,
            data: [],
            error: mockError,
            limit: 10,
            searchBy: LIMIT
        })

    })

    it("Test getEquipments()", async () => {
        sandbox.stub(api, 'fetchEquipments').returns(equipmentsList)
        const store = mockStore(initialState)
        const expectedActions = [
            'equipments/equipmentsFetchStarts',
            'equipments/equipmentsFetched'
        ]
        return store.dispatch(getEquipments(3))
            .then(() => {
                const actualActions = store.getActions().map(action => action.type)
                expect(actualActions).toEqual(expectedActions)
            })
    })

    it("Test getEquipmentByNumber()", async () => {
        sandbox.stub(api, 'fetchEquipmentByNumber').returns(equipmentsList[2])

        const store = mockStore(initialState)
        const expectedActions = [
            'equipments/equipmentsFetchStarts',
            'equipments/equipmentsFetched'
        ]

        return store.dispatch(getEquipmentByNumber("en_3"))
            .then(() => {
                const actualActions = store.getActions().map(action => action.type)
                expect(actualActions).toEqual(expectedActions)
            })
    })


});