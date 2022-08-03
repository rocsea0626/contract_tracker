
exports.validateRequest = (event) => {
    console.log("validateRequest(event.body: %s)", event.body)
    const equipment = JSON.parse(event.body)
    console.log("validateRequest(equipment: %s)", equipment)
    if (!equipment || !equipment.EquipmentNumber ||
            !equipment.Address ||
            !equipment.StartDate ||
            !equipment.EndDate ||
            !equipment.Status){

        console.log("validateRequest(), missing attributes")
        console.log("equipment.EquipmentNumber: %s", equipment.EquipmentNumber)
        console.log("equipment.Address: %s", equipment.Address)
        console.log("equipment.StartDate: %s", equipment.StartDate)
        console.log("equipment.EndDate: %s", equipment.EndDate)
        console.log("equipment.Status: %s", equipment.Status)
        return false
    }
    if(equipment.Status !== 'Running' && equipment.Status !== 'Stopped'){
        console.log("validateRequest(), invalid Status value")
        return false
    }

    return true
}

exports.parseRequest = (event) => {
    // console.log("parseRequest(event.body: %s)", event.body)
    const equipment = JSON.parse(event.body)
    // console.log("parseRequest(equipment: %s)", equipment)
    if (!equipment || !equipment.EquipmentNumber ||
        !equipment.Address ||
        !equipment.StartDate ||
        !equipment.EndDate ||
        !equipment.Status){

        console.log("parseRequest(), missing attributes")
        console.log("equipment.EquipmentNumber: %s", equipment.EquipmentNumber)
        console.log("equipment.Address: %s", equipment.Address)
        console.log("equipment.StartDate: %s", equipment.StartDate)
        console.log("equipment.EndDate: %s", equipment.EndDate)
        console.log("equipment.Status: %s", equipment.Status)
        return null
    }
    if(equipment.Status !== 'Running' && equipment.Status !== 'Stopped'){
        console.log("parseRequest(), invalid Status value")
        return null
    }

    return equipment
}

exports.successResponse = (statusCode, body) => {
    return {
        'statusCode': statusCode,
        'body': body,
    }
}
exports.errorResponse = (statusCode, errStr) => {
    console.error(errStr);
    return exports.successResponse(statusCode, errStr)
}

exports.HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    BadRequest: 400,
    NotFound: 404,
    InternalServerError: 500
}

const getLambdaResponse = (statusCode, object) => ({
    statusCode,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
    },
    body: JSON.stringify(object),
});

exports.ok = (payload) => getLambdaResponse(200, payload);
exports.created = (payload) => getLambdaResponse(201, object);
exports.unauthorized = (payload) => getLambdaResponse(401, payload);
exports.notFound = (errorMessage) => getLambdaResponse(404, { errorMessage });
exports.badRequest = (errorMessage) => getLambdaResponse(400, errorMessage);
exports.internalServerError = (errorMessage) => getLambdaResponse(500, { errorMessage });