'use strict';

const app = require('../../app.js')
const db = require('../../../../layers/nodejs/db/dynamodb')
const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon")
const sandbox = sinon.createSandbox()

describe('Tests get equipment, ~/equipment/{equipmentNumber} (GET)', function () {
    it('return 200, get succeeds', async () => {
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

        sandbox.restore()
    });
});
