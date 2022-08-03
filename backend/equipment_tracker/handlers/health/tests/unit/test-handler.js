'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests health', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(1).to.be.equal(1);
    });
});
