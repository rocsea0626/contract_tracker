'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;

describe('Tests create equipment, ~/equipment (POST)', function () {
    it('return 201, creation succeeds', async () => {
        const event = {
            body: {
                EquipmentNumber: "en_12345",
                Address: "mock_address",
                StartDate: "mock_start_date",
                EndDate: "mock_end_date",
                Status: "running",
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp).to.be.an('object')
        expect(resp.statusCode).to.equal(200)

        const jsonResp = JSON.parse(resp.body)
        expect(jsonResp).to.be.an('object')
        expect(jsonResp.EquipmentNumber).to.be.equal("en_12345")
        expect(jsonResp.StartDate).to.be.equal("mock_start_date")
    });
});
