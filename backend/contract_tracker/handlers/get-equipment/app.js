// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("event.body, %s", event.body);
        // const ret = await axios(url);
        const mockResp = {
            equipmentNumber: "en_12345",
            address: "mock_address",
            startDate: "mock_start_date",
            endDate: "mock_end_date",
            status: "running",
        }
        response = {
            'statusCode': 200,
            'body': JSON.stringify(mockResp)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
