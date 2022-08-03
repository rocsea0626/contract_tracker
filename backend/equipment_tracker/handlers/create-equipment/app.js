// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const utils  = require(process.env.AWS ? '/opt/nodejs/utils' : '../../layers/nodejs/utils/utils');
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("process.env.DB_NAME: %s", process.env.DB_NAME)
        const isValidRequest = utils.validateRequest(event)
        if(!isValidRequest){
            return {
                'statusCode': 400,
                'body': 'invalid request'
            }
        }
        const result = await utils.createEquipment(event).promise()
        console.log("result: %s", result)
        response = {
            'statusCode': 201,
            'body': JSON.stringify(event.body)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
