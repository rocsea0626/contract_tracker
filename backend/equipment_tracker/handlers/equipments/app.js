const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')

/**
 * (GET) ~/equipment/search?limit={limit}
 */
exports.lambdaHandler = async (event, context) => {
    try {
        console.log("event.queryParameters: %s", JSON.stringify(event.queryStringParameters))
        const limit = utils.parseQueryStringLimit(event.queryStringParameters.limit)
        if(!limit || limit < 1){
            const error = new Error(`invalid request, limit: ${event.queryStringParameters.limit}`)
            console.error(error)
            return utils.badRequestResponse(error)
        }

        const equipments = await db.getEquipments(event.queryStringParameters.limit)
        return utils.okResponse(equipments)
    } catch (err) {
        console.error(err)
        return utils.internalServerErrorResponse(err)
    }
}