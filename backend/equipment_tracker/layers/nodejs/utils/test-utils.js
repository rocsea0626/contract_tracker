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
});

