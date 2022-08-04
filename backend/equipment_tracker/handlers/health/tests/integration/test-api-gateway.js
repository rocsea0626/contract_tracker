"use strict";

const chai = require("chai");
const AWS = require("aws-sdk");
const https = require("https");
const expect = chai.expect;
const testingUtils = require("../../../../testing-utils/testing-utils")

describe("Test /health", function () {
  let apiEndpoint;

  before(async () => {
    const stackName = testingUtils.getStackName();
    const client = new AWS.CloudFormation({region: testingUtils.getRegion()});

    let response;
    try {
      response = await client
        .describeStacks({
          StackName: stackName,
        })
        .promise();
    } catch (e) {
      throw new Error(
        `Cannot find stack ${stackName}: ${e.message}\n` +
          `Please make sure stack with the name "${stackName}" exists.`
      );
    }

    const stacks = response.Stacks;

    const stackOutputs = stacks[0].Outputs;
    const apiOutput = stackOutputs.find(
      (output) => output.OutputKey === "ApiEndpointUrl"
    );

    expect(apiOutput, `Cannot find output ApiEndpointUrl in stack ${stackName}`)
      .not.to.be.undefined;

    apiEndpoint = apiOutput.OutputValue;
  });

  /**
   * Call the API Gateway endpoint and check the response
   */
  it("returns 200, ", (done) => {
      console.log("apiEndpoint: %s", apiEndpoint)
      https.get(apiEndpoint + 'health', (res) => {
        expect(res.statusCode).to.be.equal(200);

        res.on("data", (data) => {
          console.log("data: %s", data)
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
