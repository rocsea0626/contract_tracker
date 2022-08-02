// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("event.body, %s", event.body);
        // const ret = await axios(url);
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
