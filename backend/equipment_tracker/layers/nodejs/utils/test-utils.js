const chai = require('chai')
const expect = chai.expect
const utils = require("./utils")

describe('Tests utils functions', function () {
    describe('Test validateRequest()', ()=>{
        it('Successful', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Stopped",
                }
            }

            const isValid = await utils.validateRequest(event)
            expect(isValid).to.equal(true)

            const event1 = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }

            const isValid1 = await utils.validateRequest(event1)
            expect(isValid1).to.equal(true)
        })

        it('Failed, body is empty', async () => {
            const event = {
                body: {}
            }

            const isValid = await utils.validateRequest(event)
            expect(isValid).to.equal(false)
        })

        it('Failed, missing attribute: \"Address\"', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: undefined,
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }

            const isValid = await utils.validateRequest(event)
            expect(isValid).to.equal(false)
        })

        it('Failed, attribute: \"StartDate\" === null', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: null,
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }

            const isValid = await utils.validateRequest(event)
            expect(isValid).to.equal(false)
        })

        it('Failed, attribute: \"StartDate\" === \"\"', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }

            const isValid = await utils.validateRequest(event)
            expect(isValid).to.equal(false)
        })

        it('Failed, attribute: \"Status\" has invalid value', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "",
                    EndDate: "mock_end_date",
                    Status: "running",
                }
            }

            const isValid = await utils.validateRequest(event)
            expect(isValid).to.equal(false)
        })
    })
});

