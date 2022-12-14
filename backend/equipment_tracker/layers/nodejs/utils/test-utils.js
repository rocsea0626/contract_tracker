const chai = require('chai')
const expect = chai.expect
const utils = require("./utils")

describe('Tests utils functions', function () {
    describe('Test parseRequest()', ()=>{
        it('Successful', () => {
            const event = {
                body: JSON.stringify({
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Stopped",
                })
            }

            const equipment = utils.parseRequest(event)
            expect(equipment).to.be.an('object')

            const event1 = {
                body: JSON.stringify({
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                })
            }

            const equipment1 = utils.parseRequest(event1)
            expect(equipment1).to.be.an('object')
        })

        it('Failed, body is empty',  () => {
            const event = {
                body: JSON.stringify({})
            }

            const equipment = utils.parseRequest(event)
            expect(equipment).to.be.null
        })

        it('Failed, missing attribute: \"Address\"',  () => {
            const event = {
                body: JSON.stringify({
                    EquipmentNumber: "en_12345",
                    Address: undefined,
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                })
            }

            const equipment = utils.parseRequest(event)
            expect(equipment).to.be.null
        })

        it('Failed, attribute: \"StartDate\" === null',  () => {
            const event = {
                body: JSON.stringify({
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: null,
                    EndDate: "mock_end_date",
                    Status: "Running",
                })
            }

            const equipment = utils.parseRequest(event)
            expect(equipment).to.be.null
        })

        it('Failed, attribute: \"StartDate\" === \"\"',  () => {
            const event ={
                body:  JSON.stringify({
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "",
                    EndDate: "mock_end_date",
                    Status: "Running",
                })
            }

            const equipment = utils.parseRequest(event)
            expect(equipment).to.be.null
        })

        it('Failed, attribute: \"Status\" has invalid value',  () => {
            const event = {
                body: JSON.stringify({
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "",
                    EndDate: "mock_end_date",
                    Status: "running",
                })
            }

            const equipment = utils.parseRequest(event)
            expect(equipment).to.be.null
        })
    })

    describe('Test isEmpty()', ()=>{
        it('object is empty', () => {
            const obj = {}
            expect(utils.isEmpty(obj)).to.equal(true)
        })

        it('object is not empty', () => {
            const obj = {
                key: "value"
            }
            expect(utils.isEmpty(obj)).to.equal(false)
        })
    })

    describe('Test parseQueryStringLimit()', ()=>{
        it('Success, limit=1', () => {
            const limit = 1
            expect(utils.parseQueryStringLimit(limit)).to.equal(1)
        })

        it('Success, limit=-1', () => {
            const limit = -1
            expect(utils.parseQueryStringLimit(limit)).to.equal(-1)
        })

        it('Failed, limit="a"', () => {
            const limit = "a"
            expect(utils.parseQueryStringLimit(limit)).to.equal(undefined)
        })

        it('Failed, limit=""', () => {
            const limit = ""
            expect(utils.parseQueryStringLimit(limit)).to.equal(undefined)
        })
    })
});

