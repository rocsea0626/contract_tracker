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

/**
 * @typedef Equipment
 * @type {object}
 * @property {string} EquipmentNumber
 * @property {string} Address
 * @property {string} StartDate
 * @property {string} EndDate
 * @property {string} Status
 */

/**
 * Add an equipment into Dynamodb table
 * @param  {Equipment} equipment
 * @return {null}
 */
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
    const result = await getDocumentClient().put(params).promise()
    return result
}

/**
 * Get one equipment from Dynamodb table
 * @param  {string} equipmentNumber
 * @return {Equipment}
 */
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
        return result.Item
    } catch (err) {
        console.log(err)
        throw err
    }
}
/**
 * Get a list of equipment from Dynamodb table
 * @param  {number} limit
 * @return {Equipment[]}
 */
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
    // console.log("createTable(), params: %s", JSON.stringify(params))
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

/**
 * Delete all items in Dynamodb table
 */
exports.purgeTable = async () => {
    // console.log("purgeTable()")
    const client = new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION})
    const rows = await client.scan({
        TableName: utils.getDynamodbTableName(),
        AttributesToGet: ['EquipmentNumber'],
    }).promise()

    // console.log(`Deleting ${rows.Items.length} records`)
    await Promise.all(rows.Items.map(async (elem) => {
        await client.delete({
            TableName: utils.getDynamodbTableName(),
            Key: elem,
        }).promise();
    }));
    // console.log("purgeTable() done")
}