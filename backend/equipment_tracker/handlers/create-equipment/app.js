const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')

exports.lambdaHandler = async (event, context) => {
    try {
        const equipment = utils.parseRequest(event)
        if(!equipment)
            return utils.badRequestResponse(Error("invalid request, event.body: " + event.body))

        const result = await db.createEquipment(equipment)
        return utils.createdResponse(equipment)


    } catch (err) {
        console.log(err)
        return utils.internalServerErrorResponse(err)
    }
};
