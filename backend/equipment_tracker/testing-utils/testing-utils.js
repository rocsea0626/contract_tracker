const AWS = require("aws-sdk");
const chai = require("chai");
const expect = chai.expect;
const axios = require("axios");

getStackName = () => {
    const stackName = process.env["AWS_SAM_STACK_NAME"]
    if (!stackName) {
        throw new Error("Cannot find env var AWS_SAM_STACK_NAME")
    }

    return stackName
};

getRegion = () => {
    const region = process.env["AWS_REGION"]
    if (!region) {
        throw new Error("Cannot find env var AWS_REGION")
    }

    return region
};

/**
 * Get deployed API endpoint
 * @param {?string} apiEndpoint
 */
getApiEndpoint = async () => {
    const client = new AWS.CloudFormation({region: getRegion()})
    const stackName = getStackName()
    let response;
    try {
        response = await client
            .describeStacks({
                StackName: stackName,
            })
            .promise();
    } catch (e) {
        throw new Error(`Cannot find stack: ${stackName}, err: ${e.message}`);
    }

    const stacks = response.Stacks;
    const stackOutputs = stacks[0].Outputs;
    const apiOutput = stackOutputs.find(
        (output) => output.OutputKey === "ApiEndpointUrl"
    );

    expect(apiOutput, `Cannot find output ApiEndpointUrl in stack ${stackName}`)
        .not.to.be.undefined;

    return apiOutput.OutputValue;
}

getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        // 'x-api-key': apiKey
    }
}

getAxiosClient = (baseUrl) =>{
    return axios.create({
        baseURL: baseUrl,
        headers: getHeaders()
    })
}

module.exports = {
    getStackName: getStackName,
    getRegion: getRegion,
    getApiEndpoint: getApiEndpoint,
    getAxiosClient: getAxiosClient,
}