const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({
    region: "localhost",
    endpoint: "http://localhost:8000",
})

const getDynamodbClient = () => {
    if(!process.env.AWS){
        return new AWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000",
        })
    }
    return null
}

exports.createEquipment = async (event) => {
    const params = {
        Item: {
            "EquipmentNumber": event.body.EquipmentNumber,
            "Address": event.body.Address,
            "StartDate": event.body.StartDate,
            "EndDate": event.body.EndDate,
            "Status": event.body.Status
        },
        TableName: process.env.DB_NAME,
        ConditionExpression: 'attribute_not_exists(EquipmentNumber)'
    }
    const result = await getDynamodbClient().put(params).promise()
    console.log("createEquipment(), result: %s", result)

    return result
}

exports.getEquipmentByNumber = async (equipmentNumber) => {
    const params = {
        TableName : process.env.DB_NAME,
        Key: {
            'EquipmentNumber': equipmentNumber
        }
    }
    const result = await getDynamodbClient().get(params).promise()
    console.log("getEquipmentByNumber(), result: %s", JSON.stringify(result))
    return result
}

exports.getEquipments = async (limit) => {
    const params = {
        TableName : process.env.DB_NAME,
        Limit: limit
    }
    const result = await getDynamodbClient().scan(params).promise()
    console.log("getEquipments(), result: %s", JSON.stringify(result))
    return result
}

exports.validateRequest = (event) => {
    const {EquipmentNumber, Address, StartDate, EndDate, Status} = event.body
    if (!EquipmentNumber || !Address || !StartDate || !EndDate || !Status){
        return false
    }
    if(Status !== 'Running' && Status !== 'Stopped')
        return false
    return true
}

exports.createTable = async () => {
    const params = {
        TableName: process.env.DB_NAME,
        KeySchema: [
            { "AttributeName": "EquipmentNumber", "KeyType": "HASH" }
        ],
        AttributeDefinitions: [
            { AttributeName: "EquipmentNumber", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 1
        }
    }
    const result = await dynamoDB.createTable(params).promise()
    // console.log("createTable(), result: %s", JSON.stringify(result))
    return result
}

exports.deleteTable = async () => {
    const params = {
        TableName: process.env.DB_NAME,
    }
    const result = await dynamoDB.deleteTable(params).promise()
    // console.log("deleteTable(), result: %s", JSON.stringify(result))
    return result
}