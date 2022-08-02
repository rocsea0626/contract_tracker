'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;

describe('Tests create equipment, ~/equipment (POST)', function () {
    it('return 201, creation succeeds', async () => {
        const event = {
            body: {
                equipmentNumber: "en_12345",
                address: "mock_address",
                startDate: "mock_start_date",
                endDate: "mock_end_date",
                status: "running",
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp).to.be.an('object')
        expect(resp.statusCode).to.equal(200)

        const jsonResp = JSON.parse(resp.body)
        expect(jsonResp).to.be.an('object')
        expect(jsonResp.equipmentNumber).to.be.equal("en_12345")
        expect(jsonResp.startDate).to.be.equal("mock_start_date")
    });
});
