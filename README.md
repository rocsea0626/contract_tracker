# Equipment Tracker

AWS Serverless application to track contracts

## Contents

* [Pre-requisite](#pre-requisite)
* [Quick start](#quick-start)
* [Local usage](#local-usage)
* [Testing](#testing)
* [Folder structure](#folder-structure)
* [Deployment](#deployment)
* [Design Documentation](#design-doc)

## Pre-requisite
* AWS CLI - [Install the AWS CLI](https://aws.amazon.com/cli/)
* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)
* Get access to AWS - [AWS](https://signanthealth.atlassian.net/wiki/spaces/eCOAX/pages/1122961833/AWS+Accounts+Roles+eCOA+X+Environments#How-to-request-access)
* NPM

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
npm run put-items-dynamodb
```

### Deploy frontend
Using the `deploy.sh` script to build & deploy frontend Reactjs app into AWS S3 bucket. S3 bucket has been configured to host this web app.

```sh
cd frontend/equipment_tracker
npm install
# Create a .env file with content below:
touch .env
#REACT_APP_API_GATEWAY_URL=<output from backend deployment>
# Deploy frontend
./deploy.sh
```

## Local Usage
### Local start backend
### Local start frontend
```sh
cd frontend
npm start
```
## Testing
### Backend
Both unit tests & integration tests are located at `/backend/hanlders/**/tests/` folder

#### Run unit test for backend

```shell
cd backend
# Start Dynamodb on local machine
make start-local-dynamodb
npm run test 
```
#### Run integration test for backend
Before running integration test, please make sure no data is stored in Dynamodb table, otherwise integration test will fail.
```shell
cd backend
# NOTICE: Please purge Dynamodb table before running integration test
AWS_SAM_STACK_NAME=<stack_name> AWS_REGION=<region> npm run integ-test
```
### Frontend
#### Run unit test for frontend

```shell
cd frontend
npm test
```

## Folder structure
### Backend
AWS resources such as Lambda, Dynamodb table, ApiGateway API are defined in `backend/equipment_tracker/template.yaml`.
And API resources are in `backend/equipment_tracker/api.yaml`
```
├── backend
│   └── equipment_tracker
│       ├── Makefile
│       ├── README.md
│       ├── api.yaml
│       ├── deploy.sh
│       ├── docker
│       ├── events
│       ├── handlers
│       ├── json
│       ├── layers
│       ├── node_modules
│       ├── package-lock.json
│       ├── package.json
│       ├── packaged.yaml
│       ├── template.yaml
│       ├── testing-utils
│       └── tools
├── frontend
│   └── equipment_tracker
│       ├── README.md
│       ├── build
│       ├── deploy.sh
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       └── src

```
## Design Documentation
Please refer to `doc/design_doc.md`