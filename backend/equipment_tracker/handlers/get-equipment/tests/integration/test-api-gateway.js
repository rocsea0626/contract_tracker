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
    // await createEquipments(apiEndpoint)
  })

  // it("returns 201, OK", (done) => {
  //   console.info("api endpoint:", apiEndpoint);
  //   const path = apiEndpoint + 'equipment/it_get_eq_1'
  //
  //   // await axios.get(path)
  //
  //   axios.get(path)
  //       .then(res => {
  //       console.log(`statusCode: ${res.status}`);
  //       expect(res.status).to.equal(200);
  //       expect(res.data.EquipmentNumber).to.equal("it_get_eq_1");
  //       done()
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       throw error
  //     });
  // });
});
