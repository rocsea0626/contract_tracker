'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;

describe('Tests get equipment, ~/equipment (GET)', function () {
    it('return 200, get succeeds', async () => {
        const resp = await app.lambdaHandler({}, {})
        expect(resp).to.be.an('object')
        expect(resp.statusCode).to.equal(200)

        const jsonResp = JSON.parse(resp.body)
        expect(jsonResp).to.be.an('object')
        expect(jsonResp.EquipmentNumber).to.be.equal("en_12345")
        expect(jsonResp.StartDate).to.be.equal("mock_start_date")
    });
});
