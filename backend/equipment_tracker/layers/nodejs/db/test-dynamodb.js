const chai = require('chai')
const expect = chai.expect
const db = require("./dynamodb")

describe('Tests db functions', function () {

    describe('Test createEquipment()', ()=>{
        beforeEach(async ()=>{
            await db.createTable()
        })

        afterEach(async ()=>{
            await db.deleteTable()
        })

        it('Successful', async () => {
            const equipment = {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "Running",
            }
            const resp = await db.createEquipment(equipment)
            expect(resp).to.be.empty
        })

        it('Failed, item already exists in table', async () => {
            const equipment = {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "Running",
            }
            const resp = await db.createEquipment(equipment)
            expect(resp).to.be.empty

            try {
                await db.createEquipment(equipment)
            } catch (e){
                expect(e.code).to.equal('ConditionalCheckFailedException');
            }
        })

        it('Failed, primary key missing', async () => {
            try {
                const equipment = {
                    EquipmentNumber: "",
                    Address: "mock_address",
                    StartDate: "mock_start_date",
                    EndDate: "mock_end_date",
                    Status: "Running",
                }
                await db.createEquipment(equipment)
            } catch (e){
                expect(e.code).to.equal('ValidationException');
            }
        })
    })

    describe('Test getEquipmentByNumber()', ()=>{
        beforeEach(async ()=>{
            await db.createTable()
        })

        afterEach(async ()=>{
            await db.deleteTable()
        })

        it('Successful', async () => {
            const equipment = {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "Running",
            }
            const resp = await db.createEquipment(equipment)
            expect(resp).to.be.empty

            const result = await db.getEquipmentByNumber('en_12345')
            expect(result.Item).to.be.an('object')
        })

        it('Failed, not found', async () => {
            const result = await db.getEquipmentByNumber('fake_equipment_number')
            expect(result).to.be.empty
        })

        it('Failed, equipmentNumber===""', async () => {
            try{
                const result = await db.getEquipmentByNumber('')
                expect(result).to.be.empty
            } catch(err) {
                console.log(err)
                expect(err.code).to.equal('ValidationException');
            }
        })
    })

    describe('Test getEquipments()', ()=>{
        beforeEach(async ()=>{
            await db.createTable()
        })

        afterEach(async ()=>{
            await db.deleteTable()
        })

        it('Successful', async () => {

            const equipment1 = {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "Running",
            }

            const equipment2 = {
                EquipmentNumber: "en_23456",
                Address: "mock_address_1",
                StartDate: "mock_start_date_1",
                EndDate: "mock_end_date_1",
                Status: "Stopped",
            }

            const equipment3 = {
                EquipmentNumber: "en_34567",
                Address: "mock_address_2",
                StartDate: "mock_start_date_2",
                EndDate: "mock_end_date_2",
                Status: "Running",
            }

            const resp1 = await db.createEquipment(equipment1)
            expect(resp1).to.be.empty
            const resp2 = await db.createEquipment(equipment2)
            expect(resp2).to.be.empty
            const resp3 = await db.createEquipment(equipment3)
            expect(resp3).to.be.empty

            const result = await db.getEquipments(2)
            expect(result).to.be.an('object')
            expect(result.Count).to.equal(2)
            expect(result.Items[0].EquipmentNumber).to.equal("en_34567")
            expect(result.Items[1].EquipmentNumber).to.equal("en_23456")
        })

        it('Failed, limit is negative', async () => {
            try{
                const result = await db.getEquipments(-2)
            }catch (err){
                expect(err.code).to.equal("ValidationException")
            }
        })

        it('Failed, limit is undefined', async () => {
            try{
                const result = await db.getEquipments()
            }catch (err){
                expect(err.code).to.equal("ValidationException")
            }
        })

        it('Failed, limit is not a number', async () => {
            try{
                const result = await db.getEquipments('a')
            }catch (err){
                expect(err.code).to.equal("ValidationException")
            }
        })
    })

    describe('Test deleteEquipmentByNumber()', ()=>{
        beforeEach(async ()=>{
            await db.createTable()
        })

        afterEach(async ()=>{
            await db.deleteTable()
        })

        it('Successful', async () => {

            const equipment = {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "Running",
            }

            const resp = await db.createEquipment(equipment)
            expect(resp).to.be.empty

            const result = await db.deleteEquipmentByNumber("en_12345")
            expect(result).to.be.not.empty
            expect(result.EquipmentNumber).to.equal("en_12345")
        })

        it('Failed, item not found', async () => {
            const result = await db.deleteEquipmentByNumber("en_12345")
            expect(result).to.be.undefined
        })

    })
});

