exports.isEmpty = (object) => {
    return Object.keys(object).length === 0
}

exports.getDynamodbTableName = () => {
    const tableName = process.env["DB_NAME"];
    if (!tableName) {
        throw new Error("Cannot find env var DB_NAME")
    }

    return tableName;
}

exports.parseQueryStringLimit = (limit) => {
    return isNaN(parseInt(limit)) ? undefined : parseInt(limit)
}

exports.parseRequest = (event) => {
    console.log("parseRequest(event.body: %s)", event.body)
    const equipment = JSON.parse(event.body)
    // console.log("parseRequest(equipment: %s)", equipment)
    if (!equipment || !equipment.EquipmentNumber ||
        !equipment.Address ||
        !equipment.StartDate ||
        !equipment.EndDate ||
        !equipment.Status){

        // console.log("parseRequest(), missing attributes")
        return null
    }
    if(equipment.Status !== 'Running' && equipment.Status !== 'Stopped'){
        console.log("parseRequest(), invalid Status value")
        return null
    }

    return equipment
}

const getLambdaResponse = (statusCode, object) => ({
    statusCode,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "ANY",
    },
    body: JSON.stringify(object),
});

const errorResponse = (statusCode, errorObj) => ({
    statusCode,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "ANY",
    },
    body: errorObj.message,
})

exports.okResponse = (payload) => getLambdaResponse(200, payload);
exports.createdResponse = (payload) => getLambdaResponse(201, payload);
exports.unauthorizedResponse = (payload) => getLambdaResponse(401, payload);
exports.notFoundResponse = (errorObj) => errorResponse(404, errorObj);
exports.badRequestResponse = (errorObj) => errorResponse(400, errorObj);
exports.conflictResponse = (errorObj) => errorResponse(409, errorObj);
exports.internalServerErrorResponse = (errorObj) => errorResponse(500, errorObj);