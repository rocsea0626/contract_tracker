"use strict"

const chai = require("chai");
const testingUtils = require("../../../../testing-utils/testing-utils")
const dynamodbUtils = require("../../../../layers/nodejs/db/dynamodb");
const expect = chai.expect;

describe("Test (GET) /equipment/search?limit={limit}", ()=>{
  let apiEndpoint, client;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
    client = testingUtils.getAxiosClient(apiEndpoint)
  })

  beforeEach( async ()=>{
    await dynamodbUtils.purgeTable()
  })

  afterEach( async ()=>{
    await dynamodbUtils.purgeTable()
  })

  describe("No initial data", function () {
    it("Successful, returns 200, OK, empty response", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await client.get(
            getPath,
            {
              params: {
                limit: 3,
              },
            }
        )
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(0)

      }catch (err){
        console.log(err)
        throw err
      }
    })
  })

  describe("Successful, returns 200, OK", function () {
    beforeEach(async () => {
      const path = apiEndpoint + "equipment"
      const e1 = {
        EquipmentNumber: "it_get_eq_1",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }
      const e2 = {
        EquipmentNumber: "it_get_eq_2",
        Address: "address_2",
        StartDate: "start_date_2",
        EndDate: "end_date_2",
        Status: "Stopped",
      }
      const e3 = {
        EquipmentNumber: "it_get_eq_3",
        Address: "address_3",
        StartDate: "start_date_3",
        EndDate: "end_date_3",
        Status: "Stopped",
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await Promise.all([
        client.post(path, e1),
        client.post(path, e2, config),
        client.post(path, e3, config)
      ])
      // console.log(res)
      expect(res[0].status).to.equal(201)
      expect(res[1].status).to.equal(201)
      expect(res[2].status).to.equal(201)

    })

    it("Successful, returns 200, OK", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await client.get(getPath, {
          params: {
            limit: 3
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(3)

      }catch (err){
        console.log(err)
        throw err
      }
    })

    it("Successful, returns 200, OK, limit > 3", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await client.get(getPath, {
          params: {
            limit: 10
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(3)

      }catch (err){
        console.log(err)
        throw err
      }
    })

    it("Successful, returns 200, OK, limit < 3", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await client.get(getPath, {
          params: {
            limit: 1
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(1)

      }catch (err){
        console.log(err)
        throw err
      }
    })

    it("Failed, returns 400, bad request limit=0", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await client.get(getPath, {
          params: {
            limit: -1
          }
        })
        expect(res).to.be.null

      }catch (err){
        expect(err.response.status).to.equal(400)
      }
    })

  });


})
