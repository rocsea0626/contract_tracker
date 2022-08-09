# Design considerations


## Folder structure
Both backend and frontend source codes are included in this project so that environment variables can be easily managed and shared across.
```shell
├── README.md
├── backend
│   └── equipment_tracker
├── doc
│   └── design_doc.md
└── frontend
    └── equipment_tracker
```

## Technology
### Frontend
- Using `npx create-react-app my-app` to create app templates
- Using Redux to manage state such as `error`, `loading` in the app
- Using Redux to facilitate unit testing

### Backend
Using SAM `template.yaml` to deploy resources in AWS environment
- AWS _ApiGateway_
  - AWS Restful API is created.
  - Request validation
- Lambda + Roles
  - Using `LAMBDA_PROXY` option for lambda integration.
- Dynamodb
  - Using _Partition key_ as _Primary key_ based on required access pattern

## Design consideration
### API design
- Each API endpoint has CORS enabled
- Request validation has been enabled for each endpoint

```shell
├── /equipment (POST)
├── /equipment/search?limit={limit} (GET)
├── /equipment/equipmentNumber (GET)
├── /health (GET)
```


### Single source of truth 
- _AWS_ resources should be only defined and configured in _SAM_ template
- API resource definition should be defined only in `api.yaml` (Swagger)
- Using configuration file `api.yaml` (Swagger) for both API definition and documentation
  - Models of request and response are defined in `api.yaml` so that developers/users can easily use


### Modular codes
Business logic(dependencies) such as _Dynamodb_ and _API_ call functions, should be implemented in separate modules so that they can be mocked in the dependent functions. 
For example, when unit testing lambda handlers, dependent database operations are mocked.

### Single responsibility of functions
- Each function should do only _one_ task
- Naming of funcion should be easy to understand so that less documentation is needed
- Documentation is still needed for functions with complicated logic

### CI/CD
Deployment of project should be simplified and automated as much as possible.
Unit test and integration test should always be executed in the CI/CD process.
For both frontend and backend projects, there is `deploy.sh` script to handle this.

### Testing
- unit test
  - Unit test should never require internet connection
- Integration test
  - For a distributed system, integration test should always test again deployed resources.


### Development process
  - Always local development first
    - Developers should be able to test new features/lambdas without deploying to AWS environment on local machine
    - When developers implement Lambda functions, always execute unit test first on local machine.
  - Integration test
    - Using a `deploy.sh` script to deploy entire backend stack. 
    - Once the stack has been deployed, integration test will be executed against newly deployed stack to make sure existing features still work. 

## Nice to have features
- Backend
  - **Cognito** user authentication
  - Support **pagination** of items in API & Lambda
- Frontend
    - Support **pagination** of items returned by API
    - Per client **throttling**, **authentication**, etc can be enabled later
    - **E2E test**, by simulating user behaviour on browser

