// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk');
const dbClient = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
});

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("process.env.DB_NAME: %s", process.env.DB_NAME)
        // console.log("event.body, %s", event.body);
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
        const result = await dbClient.put(dbPutParams).promise()
        console.log("result: %s", result)
        response = {
            'statusCode': 200,
            'body': JSON.stringify(event.body)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
