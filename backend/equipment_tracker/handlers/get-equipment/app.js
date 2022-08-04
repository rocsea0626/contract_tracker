const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')

exports.lambdaHandler = async (event, context) => {
    try {
        const {equipmentNumber} = event.pathParameters
        if(!equipmentNumber){
            const error = new Error(`invalid request, equipmentNumber: ${equipmentNumber}`)
            console.log(JSON.stringify(error))
            return utils.badRequestResponse(error)
        }

        const equipment = await db.getEquipmentByNumber(equipmentNumber)
        if(!equipment || utils.isEmpty(equipment)){
            const error = new Error(`not found by equipmentNumber: ${equipmentNumber}`)
            console.log(JSON.stringify(error))
            return utils.notFoundResponse(error)
        }
        return utils.okResponse(equipment)
    } catch (err) {
        console.log(JSON.stringify(err));
        return utils.internalServerErrorResponse(err)
    }
}
