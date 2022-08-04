"use strict";

const chai = require("chai");
const AWS = require("aws-sdk");
const https = require("https");
const expect = chai.expect;
const testingUtils = require("../../../../testing-utils/testing-utils")

describe("Test /health", function () {
  let apiEndpoint;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
  });

  /**
   * Call the API Gateway endpoint and check the response
   */
  it("returns 200, ", (done) => {
      console.log("apiEndpoint: %s", apiEndpoint)
      const path = apiEndpoint + 'health'
      https.get(path, (res) => {
        expect(res.statusCode).to.be.equal(200);

        res.on("data", (data) => {
          const response = JSON.parse(data);
          expect(response).to.be.an("object");
          expect(response['context.httpMethod']).to.be.equal("GET");
          done();
        });
      })
      .on("error", (e) => {
        throw e;
      });
  });
});
