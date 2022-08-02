const chai = require('chai')
const expect = chai.expect
const utils = require("./utils")

describe('Tests utils functions', function () {

    beforeEach(async ()=>{
        await utils.createTable()
    })

    afterEach(async ()=>{
        await utils.deleteTable()
    })

    it('createEquipment(), successful', async () => {
        const event = {
            body: {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "running",
            }
        }
        const resp = await utils.createEquipment(event)
        expect(resp).to.be.empty
    });

    it('createEquipment(), failed, item already exists in table', async () => {
        const event = {
            body: {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "running",
            }
        }
        const resp = await utils.createEquipment(event)
        expect(resp).to.be.empty

        try {
            await utils.createEquipment(event)
        } catch (e){
            expect(e.code).to.equal('ConditionalCheckFailedException');
        }
    });
});

