const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')

/**
 * (GET) ~/equipment/search?limit={limit}
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const limit = event.queryParameters.limit
        if(!limit || limit < 1 || typeof limit !== 'number'){
            const error = new Error(`invalid request, limit: ${limit}`)
            console.error(error)
            return utils.badRequestResponse(error)
        }

        const equipments = await db.getEquipments(limit)
        if(!equipments || equipments.length <=0){
            const error = new Error(`not found by limit: ${limit}`)
            console.error(error)
            return utils.notFoundResponse(error)
        }
        return utils.okResponse(equipments)
    } catch (err) {
        console.error(err)
        return utils.internalServerErrorResponse(err)
    }
}
