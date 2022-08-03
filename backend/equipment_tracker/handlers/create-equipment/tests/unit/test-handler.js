'use strict';

const app = require('../../app.js')
const db = require('../../../../layers/nodejs/db/dynamodb')
const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon")
const sandbox = sinon.createSandbox()

describe('Tests create equipment, ~/equipment (POST)', function () {
    it('Succesful, return 201, creation succeeds', async () => {
        sandbox.stub(db, 'createEquipment').returns({promise: () => {{}}});
        const event = {
            body: {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "Running",
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp).to.be.an('object')
        expect(resp.statusCode).to.equal(201)

        const jsonResp = JSON.parse(resp.body)
        expect(jsonResp).to.be.an('object')
        expect(jsonResp.EquipmentNumber).to.be.equal("en_12345")
        expect(jsonResp.StartDate).to.be.equal("mock_start_date")

        sandbox.restore();
    });

    it('Failed, return 400, bad request', async () => {
        const event = {
            body: {}
        }
        const resp = await app.lambdaHandler(event, {})
        console.log("resp: %s", JSON.stringify(resp))
        expect(resp).to.be.an('object')
        expect(resp.statusCode).to.equal(400)
    });
});
