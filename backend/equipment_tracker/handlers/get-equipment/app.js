const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')
const AWS = require("aws-sdk");

exports.lambdaHandler = async (event, context) => {
    try {
        const {equipmentNumber} = event.pathParameters
        const equipment = await db.getEquipmentByNumber(equipmentNumber)
        return utils.okResponse(equipment)
    } catch (err) {
        console.log(JSON.stringify(err));
        return utils.internalServerErrorResponse(err)
    }
}
