"use strict"

const chai = require("chai");
const axios = require("axios");
const testingUtils = require("../../../../testing-utils/testing-utils")
const expect = chai.expect;


/**
 * Make sure env variable AWS_SAM_STACK_NAME exists with the name of the stack we are going to test.
 */
describe("Test (POST) /equipment", function () {
  let apiEndpoint;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
  });

  it("returns 201, created", (done) => {
    const path = apiEndpoint + 'equipment'
    const payload = {
      EquipmentNumber: "en_12345",
      Address: "address_1",
      StartDate: "start_date_1",
      EndDate: "end_date_1",
      Status: "Running",
    }

    axios.post(path, payload)
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      expect(res.status).to.equal(201);
      expect(res.data).to.be.an("object");
      expect(res.data.EquipmentNumber).to.equal("en_12345");
      done()
    })
    .catch(error => {
      console.error(error);
      throw error
    });
  });
});
