exports.getStackName = () => {
    const stackName = process.env["AWS_SAM_STACK_NAME"]
    if (!stackName) {
        throw new Error("Cannot find env var AWS_SAM_STACK_NAME")
    }

    return stackName
};

exports.getRegion = () => {
    const region = process.env["AWS_REGION"]
    if (!region) {
        throw new Error("Cannot find env var AWS_REGION")
    }

    return region
};
