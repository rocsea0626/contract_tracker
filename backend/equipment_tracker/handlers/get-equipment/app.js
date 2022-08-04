const db  = require(process.env.AWS_EXECUTION_ENV ? '/opt/db/dynamodb' : '../../layers/nodejs/db/dynamodb')

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const item = db.getEquipmentByNumber("12345")
        response = {
            'statusCode': 200,
            'body': JSON.stringify(item)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
