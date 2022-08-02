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
    const dbPutParams = {
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
    const result = await getDynamodbClient().put(dbPutParams).promise()
    console.log("createEquipment(), result: %s", result)

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
    console.log("createTable(), result: %s", JSON.stringify(result))
    return result
}

exports.deleteTable = async () => {
    const params = {
        TableName: process.env.DB_NAME,
    }
    const result = await dynamoDB.deleteTable(params).promise()
    console.log("deleteTable(), result: %s", JSON.stringify(result))
    return result
}