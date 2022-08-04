"use strict"

const chai = require("chai");
const axios = require("axios");
const testingUtils = require("../../../../testing-utils/testing-utils")
const expect = chai.expect;

describe("Test (GET) /equipment/{equipmentNumber}", function () {
  let apiEndpoint;

  const createEquipments = async (apiEndpoint) => {
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

    await axios.post(path, e1, config)
    await axios.post(path, e2, config)
    await axios.post(path, e3, config)
  }

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
  })

  it("Successful, returns 200, OK", async () => {
    try{
      const path = apiEndpoint + 'equipment'
      const payload = {
        EquipmentNumber: "en_12345",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }
      const res = await axios.post(path, payload)
      expect(res.status).to.equal(201)

      const pathGet = apiEndpoint + 'equipment/en_12345'
      const resGet = await axios.get(pathGet)
      expect(resGet.status).to.equal(200)
      expect(res.data.EquipmentNumber).to.equal("en_12345")
    }catch (err){
      throw err
    } finally {
      const pathDelete = apiEndpoint + 'equipment/en_12345'
      const resDelete = await axios.delete(pathDelete)
      expect(resDelete.status).to.equal(200)
    }
  })

  it("Failed, returns 404, not found", async () => {
    try{
      const pathGet = apiEndpoint + 'equipment/en_12345'
      const resGet = await axios.get(pathGet)
      expect(resGet).to.be.null
    }catch (err){
      expect(err.response.status).to.equal(404)
    }
  })

})
