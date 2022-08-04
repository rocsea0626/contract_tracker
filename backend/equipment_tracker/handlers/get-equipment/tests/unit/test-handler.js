'use strict';

const app = require('../../app.js')
const db = require('../../../../layers/nodejs/db/dynamodb')
const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon")
const sandbox = sinon.createSandbox()

describe('Tests get equipment, ~/equipment/{equipmentNumber} (GET)', function () {

    afterEach(async ()=>{
        sandbox.restore()
    })

    it('Successful, return 200, get succeeds', async () => {
        sandbox.stub(db, 'getEquipmentByNumber').resolves({
            EquipmentNumber: "en_12345",
            Address: "address_1",
            StartDate: "start_date_1",
            EndDate: "end_date_1",
            Status: "Running",
        })
        const event = {
            pathParameters: {
                equipmentNumber: "en_12345"
            }
        }
        const resp = await app.lambdaHandler(event, {})

        expect(resp.statusCode).to.equal(200)
        const equipment = JSON.parse(resp.body)
        expect(equipment.EquipmentNumber).to.equal("en_12345")
        expect(equipment.StartDate).to.equal("start_date_1")
    })

    it('Failed, return 400, bad request, equipmentNumber is missing', async () => {
        sandbox.stub(db, 'getEquipmentByNumber').resolves({})
        const event = {
            pathParameters: {}
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(400)
    });

    it('Failed, return 404, not found', async () => {
        sandbox.stub(db, 'getEquipmentByNumber').resolves({})
        const event = {
            pathParameters: {
                equipmentNumber: "en_12345"
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(404)
    })
});
