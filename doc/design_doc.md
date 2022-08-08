# Kone Assignment design considerations


## Folder structure
Both backend and frontend source codes are included in this project (Purpose ????)

##Tech stacks
### Frontend
A ReactJs App
### Backend
Using SAM `template.yaml` to deploy resources in AWS environment
Resources to be deployed: 
- AWS ApiGateway with request validation
  - AWS Restful API is created. Per client throttling, authentication, etc can be enabled later 
- Lambda + Roles
  - Using `PROXY` option for lambda integration, so that payload of requests will forwarded to lambda directly
- Dynamodb 
?Cognito, Pipeline

## Design principles
###single source of truth 
- both config and code
- Using configuration files for deployment and documentation
  - refer to `api.yaml` (Swagger) for API resource definitions so that API doc can be generated
  - models of request and response
### Modular codes
- Database logics are implemented in a seperate file so that they can be unit tested independently. 
- When unit testing lambda handlers, dependent database operations can be mocked
### Testing
unit testing should not require internet connection
integratino test, yes
### Development process
  - Developers should be able to locally test new features/lambdas locally first
  - local dev + unit test + mock dependencies (AWS services)
    - so that features can be tested locally before deployment
  - integration test
    - Using a `deploy.sh` script to deploy entire backend stack. 
    - Once the stack has been deployed, integration test will be executed against newly deployed stack to make sure existing features still work. 

### Nice to have features
- Backend
  - cognito user authentication
  - support pagination of items in API & Lambda
- Frontend
  - pagination of items returned by API
  - E2E test, by simulating user behaviour on browser

