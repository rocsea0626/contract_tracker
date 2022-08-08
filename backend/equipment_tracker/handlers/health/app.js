let response

exports.lambdaHandler = async (event, context) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                "process.env.DB_NAME": process.env.DB_NAME,
                "process.env.AWS": process.env.AWS,
                "process.env.AWS_EXECUTION_ENV": process.env.AWS_EXECUTION_ENV,
                "event.body": JSON.stringify(event.body),
                "context.httpMethod": event.httpMethod,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
