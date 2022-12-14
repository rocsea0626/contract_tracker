"use strict"

const chai = require("chai");
const testingUtils = require("../../../../testing-utils/testing-utils")
const expect = chai.expect;
const dynamodbUtils = require("../../../../layers/nodejs/db/dynamodb")


describe("Test (POST) /equipment", function () {
  let apiEndpoint, client;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
    client = testingUtils.getAxiosClient(apiEndpoint)
  });

  beforeEach(async ()=>{
    await dynamodbUtils.purgeTable()
  })

  afterEach(async ()=>{
    await dynamodbUtils.purgeTable()
  })

  it("Successful, returns 201, created", async () => {
    try{
      const path = apiEndpoint + 'equipment'
      const payload = {
        EquipmentNumber: "en_12345",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }

      const res = await client.post(path, payload)
      expect(res.status).to.equal(201);
      expect(res.data.EquipmentNumber).to.equal("en_12345");
    } catch (err){
      throw err
    }
  });

  it("Failed, returns 409, item already exist", async () => {
    try{
      const path = apiEndpoint + 'equipment'
      const payload = {
        EquipmentNumber: "en_12345",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }

      const res = await client.post(path, payload)
      expect(res.status).to.equal(201);
      expect(res.data.EquipmentNumber).to.equal("en_12345");

      const resFailed = await client.post(path, payload)
      expect(resFailed).to.be.null
    } catch (err){
      expect(err.response.status).to.equal(409);
    }
  });

  it("Failed, returns 400, bad request attribute EquipmentNumber missing", async () => {
    try{
      const path = apiEndpoint + 'equipment'
      const payload = {
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }
      const res = await client.post(path, payload)
      expect(res).to.be.null
    } catch (err){
      expect(err.response.status).to.equal(400)
    }
  });

  it("Failed, returns 400, bad request attribute EquipmentNumber is empty", async () => {
    try {
      const path = apiEndpoint + 'equipment'
      const payload = {
        EquipmentNumber: "",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }
      const res = await client.post(path, payload)
      expect(res).to.be.null
    } catch (err){
      expect(err.response.status).to.equal(400)
    }
  });

});
