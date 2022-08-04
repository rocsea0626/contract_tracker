const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({
    region: "localhost",
    endpoint: "http://localhost:8000",
})

const getDocumentClient = () => {
    console.log("getDocumentClient(), process.env.AWS_EXECUTION_ENV: ", process.env.AWS_EXECUTION_ENV)
    if(!process.env.AWS_EXECUTION_ENV){
        console.log("getDocumentClient(), run at local")
        return new AWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000",
            convertEmptyValues: true,
        })
    }
    console.log("getDocumentClient(), run at AWS")
    return new AWS.DynamoDB.DocumentClient({convertEmptyValues: true})
}

exports.createEquipment = async (equipment) => {
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
    // const client = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true})
    // console.log("createEquipment(), client", JSON.stringify(client))
    const result = await getDocumentClient().put(params).promise()
    return result
}

exports.getEquipmentByNumber = async (equipmentNumber) => {
    console.log("getEquipmentByNumber(), equipmentNumber: %s", equipmentNumber)
    const params = {
        TableName : process.env.DB_NAME,
        Key: {
            'EquipmentNumber': equipmentNumber
        }
    }
    console.log("getEquipmentByNumber(), params: %s", JSON.stringify(params))
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