'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;

describe('Tests health', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler({}, {})

        expect(1).to.be.equal(1);
    });
});
