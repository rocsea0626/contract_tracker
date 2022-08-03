const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({
    region: "localhost",
    endpoint: "http://localhost:8000",
})

const getDocumentClient = () => {
    if(!process.env.AWS){
        return new AWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000",
        })
    }
    return new AWS.DynamoDB.DocumentClient()
}

exports.createEquipment = async (equipment) => {
    // console.log("createEquipment(), equipment: %s", JSON.stringify(equipment))

    const params = {
        Item: {
            "EquipmentNumber": equipment.EquipmentNumber,
            "Address": equipment.Address,
            "StartDate": equipment.StartDate,
            "EndDate": equipment.EndDate,
            "Status": equipment.Status
        },
        TableName: process.env.DB_NAME,
        ConditionExpression: 'attribute_not_exists(EquipmentNumber)'
    }
    // console.log("createEquipment(), params: %s", JSON.stringify(params))
    const result = await getDocumentClient().put(params).promise()
    // console.log("createEquipment(), result: %s", result)

    return result
}

exports.getEquipmentByNumber = async (equipmentNumber) => {
    const params = {
        TableName : process.env.DB_NAME,
        Key: {
            'EquipmentNumber': equipmentNumber
        }
    }
    const result = await getDocumentClient().get(params).promise()
    console.log("getEquipmentByNumber(), result: %s", JSON.stringify(result))
    return result
}

exports.getEquipments = async (limit) => {
    const params = {
        TableName : process.env.DB_NAME,
        Limit: limit
    }
    const result = await getDocumentClient().scan(params).promise()
    console.log("getEquipments(), result: %s", JSON.stringify(result))
    return result
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