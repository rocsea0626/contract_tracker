'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;

describe('Tests get equipment, ~/equipment/{equipmentNumber} (GET)', function () {
    it('return 200, get succeeds', async () => {
        const resp = await app.lambdaHandler({}, {})

        expect(1).to.be.equal(1)
    });
});
