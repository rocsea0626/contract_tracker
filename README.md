# Equipment Tracker

AWS Serverless application to track contracts

## Contents

* [Pre-requisite](#pre-requisite)
* [Project structure](#project-structure)
* [Quick start](#quick-start)
* [Local usage](#local-usage)
* [Testing](#testing)
* [Deployment](#deployment)
* [Design Documentation](#design-doc)

## Pre-requisite
* AWS CLI - [Install the AWS CLI](https://aws.amazon.com/cli/)
* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)
* Get access to AWS - [AWS](https://signanthealth.atlassian.net/wiki/spaces/eCOAX/pages/1122961833/AWS+Accounts+Roles+eCOA+X+Environments#How-to-request-access)
* NPM
## Project structure
Both backend and frontend code bases are contained in this repository. 
Unit tests and integration tests are written in their corresponding folder.
```
├── README.md
├── backend
│   └── equipment_tracker
├── doc
│   └── design_doc.md
└── frontend
    └── equipment_tracker

```

### Backend
AWS resources such as Lambda, Dynamodb table, ApiGateway API are defined in `backend/equipment_tracker/template.yaml`.
And API resources are in `backend/equipment_tracker/api.yaml`

### Frontend
Frontend app is created by using `npx create-react-app my-app`

## Quick Start
### Deploy backend
Using the `deploy.sh` script to build & deploy backend AWS resources. 
Everytime when `deploy.sh` is executed, integration test of backend will be executed against freshly deployed backend API.
```sh
cd backend/equipment_tracker
npm install
# Deploy backend & run integration test
./deploy.sh
```
### Generate sample data in backend for demo
By default, 100 items will be randomly generated and uploaded into deployed Dynamodb.
```sh
cd backend/equipment_tracker
npm run put-items-dynamodb
```

### Deploy frontend
Using the `deploy.sh` script to build & deploy frontend Reactjs app into AWS S3 bucket. 
A S3 bucket will bucket will be created and configured to host this web app at the same time.

```sh
cd frontend/equipment_tracker
npm install
# Create a .env file with content below:
touch .env
REACT_APP_API_GATEWAY_URL=<output from backend deployment>
# Deploy frontend
./deploy.sh
```

## Testing
### Backend
Both unit tests & integration tests are located at `/backend/hanlders/**/tests/` folder

Run unit test for backend

```shell
cd backend
# Start Dynamodb on local machine
make start-local-dynamodb
npm run test 
make stop-local-dynamodb
```
Run integration test for backend. 
- **NOTICE:** All data items will be deleted before each test case
```shell
cd backend
# NOTICE: Please purge Dynamodb table before running integration test
AWS_SAM_STACK_NAME=<stack_name> AWS_REGION=<region> npm run integ-test
```
### Frontend
Run unit test for frontend
```shell
cd frontend
npm test
```
There is no integration test for frontend.

## Local Usage
Run the API & Dynamodb locally.
```bash
cd backend/equipment_tracker
make start-local-dynamodb
sam local start-api
make stop-local-dynamodb
```
Start dev server locally and add `.env` file
```sh
cd frontend/equipment_tracker
touch .env
REACT_APP_API_GATEWAY_URL=http://127.0.0.1:3000/
npm start
```

## Design Documentation
Please refer to `doc/design_doc.md`