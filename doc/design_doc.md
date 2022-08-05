# Kone Assignment design considerations

##Tech stacks
### Frontend
ReactJs
### Backend
AWS ApiGateway + Lambda + Dynamodb (Cognito, Pipeline)

## Design principles
- single source of truth, both config and code
- Modular codes, to enable unit testing
- development process
  - local dev + unit test + mock dependencies (AWS services)
  - integration test

## Road map
- setup local dev env
  - SAM local + Dynamodb local 
- implement lambdas + unit tests

- setup deployment env
  - setup SAM for deployment

- implement frontend



## TODO
- timestamp format
- log in as a different user
- ready about create class in Nodejs
- implement data schema check in API gateway ?
- api doc generation ?
- pagination ?
- allow API key
- allow data encryption with SSL
- allow integration test with Code Pipeline
- hide DELETE from Prod stage
- log into AWS console with dev user
