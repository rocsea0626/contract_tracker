// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb');
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils');

exports.lambdaHandler = async (event, context) => {
    try {
        const equipment = utils.parseRequest(event)
        if(!equipment)
            return utils.errorResponse(
                utils.HttpStatusCode.BadRequest,
                "invalid request, event.body: " + JSON.stringify(event.body)
            )

        const result = await db.createEquipment(equipment).promise()
        console.log("result: %s", result)
        return utils.successResponse(
            utils.HttpStatusCode.CREATED,
            JSON.stringify(equipment)
        )

    } catch (err) {
        return utils.errorResponse(
            utils.HttpStatusCode.InternalServerError,
            JSON.stringify(err)
        )
    }
};
