const chai = require('chai')
const expect = chai.expect
const utils = require("./utils")

describe('Tests utils functions', function () {

    describe('Test createEquipment()', ()=>{
        beforeEach(async ()=>{
            await utils.createTable()
        })

        afterEach(async ()=>{
            await utils.deleteTable()
        })

        it('Successful', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }
            const resp = await utils.createEquipment(event)
            expect(resp).to.be.empty
        })

        it('Failed, item already exists in table', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }
            const resp = await utils.createEquipment(event)
            expect(resp).to.be.empty

            try {
                await utils.createEquipment(event)
            } catch (e){
                expect(e.code).to.equal('ConditionalCheckFailedException');
            }
        })

        it('Failed, primary key missing', async () => {
            try {
                const event = {
                    body: {
                        EquipmentNumber: "",
                        Address: "mock_address",
                        StartDate: "mock_start_date",
                        EndDate: "mock_end_date",
                        Status: "Running",
                    }
                }
                await utils.createEquipment(event)
            } catch (e){
                expect(e.code).to.equal('ValidationException');
            }
        })
    })

    describe('Test getEquipmentByNumber()', ()=>{
        beforeEach(async ()=>{
            await utils.createTable()
        })

        afterEach(async ()=>{
            await utils.deleteTable()
        })

        it('Successful', async () => {
            const event = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }
            const resp = await utils.createEquipment(event)
            expect(resp).to.be.empty

            const result = await utils.getEquipmentByNumber('en_12345')
            expect(result.Item).to.be.an('object')
        })

        it('Failed, not found', async () => {
            const result = await utils.getEquipmentByNumber('fake_equipment_number')
            expect(result).to.be.empty
        })
    })

    describe('Test getEquipments()', ()=>{
        beforeEach(async ()=>{
            await utils.createTable()
        })

        afterEach(async ()=>{
            await utils.deleteTable()
        })

        it('Successful', async () => {
            const event1 = {
                body: {
                    EquipmentNumber: "en_12345",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
            }

            const event2 = {
                body: {
                    EquipmentNumber: "en_23456",
                    Address: "mock_address_1",
                    StartDate: "mock_start_date_1",
                    EndDate: "mock_end_date_1",
                    Status: "stopped",
                }
            }

            const event3 = {
                body: {
                    EquipmentNumber: "en_34567",
                    Address: "mock_address_2",
                    StartDate: "mock_start_date_2",
                    EndDate: "mock_end_date_2",
                    Status: "Running",
                }
            }

            const resp1 = await utils.createEquipment(event1)
            expect(resp1).to.be.empty
            const resp2 = await utils.createEquipment(event2)
            expect(resp2).to.be.empty
            const resp3 = await utils.createEquipment(event3)
            expect(resp3).to.be.empty

            const result = await utils.getEquipments(2)
            expect(result).to.be.an('object')
            expect(result.Count).to.equal(2)
            expect(result.Items[0].EquipmentNumber).to.equal("en_34567")
            expect(result.Items[1].EquipmentNumber).to.equal("en_23456")
        })
    })

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

