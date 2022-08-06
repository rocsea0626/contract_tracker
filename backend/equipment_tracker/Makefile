.PHONY: install

DOCKER_COMPOSE_FILE="./tools/docker-compose.yaml"

populate-dynamodb:
	node tools/gen-fake-data.js


install:
	go mod download

local-start:
	docker-compose --file ${DOCKER_COMPOSE_FILE} up

local-stop:
	docker-compose --file ${DOCKER_COMPOSE_FILE} down

local-rebuild:
	docker-compose --file ${DOCKER_COMPOSE_FILE} build

# easier to read locally
unit-test:
	go test ./handlers/... ./pkg/... -coverprofile=coverage.out

check: run-linter
	go test ./handlers/... ./pkg/... -coverprofile=coverage.out

# more detailed for CI
unit-test-verbose:
	go test -v ./handlers/... ./pkg/... -coverprofile=coverage.out

integration-test:
	DYNAMO_TABLE_NAME=${DYNAMO_TABLE_NAME} QUEUE_URL=${QUEUE_URL} API_GATEWAY=${API_GATEWAY} go test -v ./tests/

integration-test-local:
	go clean -testcache && ENV=local API_GATEWAY=http://127.0.0.1:3000 go test -v ./tests/
