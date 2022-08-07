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
- implement backend
  - setup env var with SAM template output
  - .env for package json
- implement frontend
  - footer
  - unit test



## TODO
- timestamp format
- rest API vs HTTP api
- log into AWS console with dev user
- ready about create class in Nodejs
- pagination ?
- allow API key
- allow integration test with Code Pipeline
- hide DELETE from Prod stage
