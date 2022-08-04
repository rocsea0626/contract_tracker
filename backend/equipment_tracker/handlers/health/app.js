const AWS = require('aws-sdk')
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const client = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true})
        const equipment = {
            "EquipmentNumber": "equipment.EquipmentNumber",
            "Address": "equipment.Address",
            "StartDate": "equipment.StartDate",
            "EndDate": "equipment.EndDate",
            "Status": "Running"
        }
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
        const result = await client.put(params).promise()

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                "process.env.DB_NAME": process.env.DB_NAME,
                "process.env.AWS": process.env.AWS,
                "process.env.AWS_EXECUTION_ENV": process.env.AWS_EXECUTION_ENV,
                "event.body": JSON.stringify(event.body),
                "context.httpMethod": event.httpMethod,
                "params": params,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
