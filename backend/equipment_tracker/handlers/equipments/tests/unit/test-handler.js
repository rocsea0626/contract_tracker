'use strict';

const app = require('../../app.js')
const db = require('../../../../layers/nodejs/db/dynamodb')
const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon")
const sandbox = sinon.createSandbox()

describe('Tests get equipment, ~/equipment/search?limit={limit} (GET)', function () {

    afterEach(async ()=>{
        sandbox.restore()
    })

    it('Successful, return 200, limit = 3, length = 1', async () => {
        sandbox.stub(db, 'getEquipments').resolves(
            [
                {
                    EquipmentNumber: "en_12345",
                    Address: "address_1",
                    StartDate: "start_date_1",
                    EndDate: "end_date_1",
                    Status: "Running",
                }
            ]
        )
        const event = {
            queryStringParameters: {
                limit: 3
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(200)
        const equipments = JSON.parse(resp.body)
        expect(equipments.length).to.equal(1)
        expect(equipments[0].StartDate).to.equal("start_date_1")
    })

    it('Successful, return 200, limit = 1, length = 2', async () => {
        sandbox.stub(db, 'getEquipments').resolves(
            [
                {
                    EquipmentNumber: "en_12345",
                    Address: "address_1",
                    StartDate: "start_date_1",
                    EndDate: "end_date_1",
                    Status: "Running",
                },
                {
                    EquipmentNumber: "en_2",
                    Address: "address_2",
                    StartDate: "start_date_2",
                    EndDate: "end_date_2",
                    Status: "Stopped",
                },
            ]
        )
        const event = {
            queryStringParameters: {
                limit: 1
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(200)
        const equipments = JSON.parse(resp.body)
        expect(equipments.length).to.equal(2)
        expect(equipments[1].StartDate).to.equal("start_date_2")
    })

    it('Successful, return 200, no more items', async () => {
        sandbox.stub(db, 'getEquipments').resolves(
            []
        )
        const event = {
            queryStringParameters: {
                limit: 1
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(200)
        const equipments = JSON.parse(resp.body)
        expect(equipments.length).to.equal(0)
    })

    it('Failed, return 400, bad request, limit is undefined', async () => {
        sandbox.stub(db, 'getEquipments').resolves({})
        const event = {
            queryStringParameters: {}
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(400)
    });

    it('Failed, return 400, bad request, limit < 1', async () => {
        sandbox.stub(db, 'getEquipments').resolves({})
        const event = {
            queryStringParameters: {
                limit: -1
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(400)
    });

    it('Failed, return 400, bad request, limit = "a"', async () => {
        sandbox.stub(db, 'getEquipments').resolves({})
        const event = {
            queryStringParameters: {
                limit: "a"
            }
        }
        const resp = await app.lambdaHandler(event, {})
        expect(resp.statusCode).to.equal(400)
    })
});
