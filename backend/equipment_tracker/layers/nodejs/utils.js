const AWS = require('aws-sdk');

exports.getDynamodbClient = () =>{
    const dbClient = new AWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
    })
    return dbClient
}