# Contract Tracker
The application uses several AWS resources, including Lambda functions and an API Gateway API.
These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Develop application locally with DynamoDB local
- Change dicrecotry to `backend/contract_tracker`
  - `cd backend/contract_tracker`
- Run the DynamoDB local in a docker container at port 8000
  - `docker compose --file docker-compose.yaml up`
- List the tables on DynamoDB Local by executing
  - `aws dynamodb list-tables --endpoint-url http://localhost:8000`
- Create the PersonTable by executing
  - `aws dynamodb create-table --cli-input-json file://json/create-equipments-table.json --endpoint-url http://localhost:8000`
- Delete the PersonTable by executing
  - `aws dynamodb delete-table --table-name EquipmentsTable --endpoint-url http://localhost:8000`
- Start the local API Gateway instance by executing
  - `sam local start-api --env-vars json/env.json`


## Pre-requisites
The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.
To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## Quick Start
### Deploy backend
Using the `deploy.sh` script to build & deploy backend AWS resources.
Everytime when `deploy.sh` is executed, integration test of backend will be executed against freshly deployed backend API.
```sh
npm install
# Deploy backend & run integration test
./deploy.sh
```
### Generate sample data in backend for demo
By default, 100 items will be randomly generated and uploaded into deployed Dynamodb.
```sh
npm run put-items-dynamodb
```

## Build and test locally
Build your application with the `sam build` command.
```bash
sam build
```
Run the API & Dynamodb locally.
```bash
make start-local-dynamodb
sam local start-api
make stop-local-dynamodb
```

## Tests
### Unit tests
Unit tests are defined in the `contract_tracker/backend/**/tests/unit/` folders in this project.
```bash
make start-local-dynamodb
npm run test
make stop-local-dynamodb
```

### Integration tests
Backend integration tests are defined in the `contract_tracker/backend/**/tests/integration` folders in this project.
```bash
# Deploy SAM stack
./deploy.sh
export TABLE_NAME = <from-deploy.sh-output>
export $STACK_NAME = <from-deploy.sh-output>
export $AWS_REGION = <from-deploy.sh-output>
DB_NAME="${TABLE_NAME}" AWS_SAM_STACK_NAME="$STACK_NAME" AWS_REGION="$AWS_REGION" npm run integ-test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI.
```bash
aws cloudformation delete-stack --stack-name $STACK_NAME
```

## Troubleshooting
- **Error building docker image**: *pull access denied for public.ecr.aws/sam/xxx, repository does not exist or may require 'docker login': denied: Your authorization token has expired*
  - https://docs.aws.amazon.com/AmazonECR/latest/public/public-troubleshooting.html
- How do I define the sam template to exclude ApiKeyRequired: true for OPTIONS.
  - https://github.com/aws/serverless-application-model/issues/1786