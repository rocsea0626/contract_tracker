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
        console.log("error here")
        console.error(err)
        console.log("err.code: %s", err.code)
        if (err.code && err.code === 'ConditionalCheckFailedException'){
            console.log("error handled, ConditionalCheckFailedException")
            return utils.conflictResponse(err)
        }
        return utils.internalServerErrorResponse(err)
    }
};
