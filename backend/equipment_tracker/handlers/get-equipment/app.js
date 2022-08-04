const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')
const utils  = require(process.env.AWS_EXECUTION_ENV ? '/opt/utils/utils' : '../../layers/nodejs/utils/utils')

/**
 * (GET) ~/equipment/{equipmentNumber}
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const {equipmentNumber} = event.pathParameters
        if(!equipmentNumber){
            const error = new Error(`invalid request, equipmentNumber: ${equipmentNumber}`)
            console.error(error)
            return utils.badRequestResponse(error)
        }

        if(event.httpMethod === 'GET'){
            const equipment = await db.getEquipmentByNumber(equipmentNumber)
            if(!equipment || utils.isEmpty(equipment)){
                const error = new Error(`not found by equipmentNumber: ${equipmentNumber}`)
                console.error(error)
                return utils.notFoundResponse(error)
            }
            return utils.okResponse(equipment)
        }

        if(event.httpMethod === 'DELETE'){
            const equipment = await db.deleteEquipmentByNumber(equipmentNumber)
            if(!equipment){
                const error = new Error(`not found by equipmentNumber: ${equipmentNumber}`)
                console.error(error)
                return utils.notFoundResponse(error)
            }
            return utils.okResponse(equipment)
        }

        return utils.badRequestResponse(new Error(`HTTP method: ${event.httpMethod} is not accepted by this resource`))

    } catch (err) {
        console.error(err)
        return utils.internalServerErrorResponse(err)
    }
}
