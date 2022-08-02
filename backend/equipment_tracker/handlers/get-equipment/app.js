// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("event.body, %s", event.body);
        // const ret = await axios(url);
        const mockResp = {
            EquipmentNumber: "en_12345",
            Address: "mock_address",
            StartDate: "mock_start_date",
            EndDate: "mock_end_date",
            Status: "running",
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
