.PHONY: install

deploy:
	./deploy.sh

# easier to read locally
unit-test:
	go test ./handlers/... ./pkg/... -coverprofile=coverage.out

# more detailed for CI
unit-test-verbose:
	go test -v ./handlers/... ./pkg/... -coverprofile=coverage.out

integration-test:
	DYNAMO_TABLE_NAME=${DYNAMO_TABLE_NAME} QUEUE_URL=${QUEUE_URL} API_GATEWAY=${API_GATEWAY} go test -v ./tests/

integration-test-local:
	go clean -testcache && ENV=local API_GATEWAY=http://127.0.0.1:3000 go test -v ./tests/
