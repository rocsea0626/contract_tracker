"use strict";

const chai = require("chai");
const expect = chai.expect;
const testingUtils = require("../../../../testing-utils/testing-utils")

describe("Test /health", function () {
  let apiEndpoint, client;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
    client = testingUtils.getAxiosClient(apiEndpoint)
  });

  it("returns 200, ", async () => {
      const path = apiEndpoint + 'health'
      try{
        const res = await client.get(path)
          expect(res.status).to.be.equal(200);
          expect(res.data).to.be.an("object");
          expect(res.data['context.httpMethod']).to.be.equal("GET");
      }catch(err) {
          console.error(err)
          throw err
      }
  })

})
