const AWS = require('aws-sdk')
const utils = require('../utils/utils')


const getOptions = () => {
    const options = {}
    if(!process.env.AWS_EXECUTION_ENV){
        options['region'] = "localhost"
        options['endpoint'] = "http://localhost:8000"
    }
    return options
}

const dynamoDB = new AWS.DynamoDB(getOptions())

const getDocumentClient = () => {
    return new AWS.DynamoDB.DocumentClient(getOptions())
}

exports.createEquipment = async (equipment) => {
    console.log("createEquipment(), equipment: %s", JSON.stringify(equipment))
    const params = {
        Item: {
            "EquipmentNumber": equipment.EquipmentNumber,
            "Address": equipment.Address,
            "StartDate": equipment.StartDate,
            "EndDate": equipment.EndDate,
            "Status": equipment.Status
        },
        TableName: utils.getDynamodbTableName(),
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
        TableName : utils.getDynamodbTableName(),
        Key: {
            'EquipmentNumber': equipmentNumber
        }
    }
    console.log("getEquipmentByNumber(), params: %s", JSON.stringify(params))
    try{
        const result = await getDocumentClient().get(params).promise()
        console.log("getEquipmentByNumber(), result: %s", JSON.stringify(result))
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

exports.deleteEquipmentByNumber = async (equipmentNumber) => {
    console.log("deleteEquipmentByNumber(), equipmentNumber: %s", equipmentNumber)
    const params = {
        TableName : utils.getDynamodbTableName(),
        Key: {
            'EquipmentNumber': equipmentNumber
        },
        ReturnValues: 'ALL_OLD'
    }
    try{
        const result = await getDocumentClient().delete(params).promise()
        console.log("deleteEquipmentByNumber(), result: %s", JSON.stringify(result))
        return result.Attributes
    } catch (err) {
        console.log(err)
        throw err
    }
}

exports.getEquipments = async (limit) => {
    const params = {
        TableName : utils.getDynamodbTableName(),
        Limit: limit
    }
    const result = await getDocumentClient().scan(params).promise()
    console.log("getEquipments(), result: %s", JSON.stringify(result))
    return result.Items
}

exports.createTable = async () => {
    const params = {
        TableName: utils.getDynamodbTableName(),
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
        TableName: utils.getDynamodbTableName(),
    }
    const result = await dynamoDB.deleteTable(params).promise()
    // console.log("deleteTable(), result: %s", JSON.stringify(result))
    return result
}