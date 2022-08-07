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

