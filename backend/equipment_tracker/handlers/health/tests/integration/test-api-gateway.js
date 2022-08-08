"use strict";

const chai = require("chai");
const axios = require("axios");
const https = require("https");
const expect = chai.expect;
const testingUtils = require("../../../../testing-utils/testing-utils")

describe("Test /health", function () {
  let apiEndpoint, client;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
    client = testingUtils.getAxiosClient(apiEndpoint, process.env["API_KEY"])
  });

  it("returns 200, ", (done) => {
      const path = apiEndpoint + 'health'
      client.get(path)
          .then(res => {
              expect(res.status).to.be.equal(200);
              expect(res.data).to.be.an("object");
              expect(res.data['context.httpMethod']).to.be.equal("GET");
              done();
          })
          .catch(error => {
              console.error(error);
              throw error
          })
  })

})
