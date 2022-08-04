const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')

/**
 * (POST) ~/equipment
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const equipment = utils.parseRequest(event)
        if(!equipment){
            const error = new Error(`invalid request, event.body: ${event.body}`)
            console.error(error)
            return utils.badRequestResponse(error)
        }

        const result = await db.createEquipment(equipment)
        return utils.createdResponse(equipment)

    } catch (err) {
        console.error(err)
        if (err.code === "ConditionalCheckFailedException"){
            return utils.conflictResponse(err)
        }
        return utils.internalServerErrorResponse(err)
    }
};
