.PHONY: populate-dynamodb

DOCKER_COMPOSE_FILE="./tools/docker-compose.yaml"

start-local-dynamodb:
	docker-compose --file ${DOCKER_COMPOSE_FILE} up

stop-local-dynamodb:
	docker-compose --file ${DOCKER_COMPOSE_FILE} down

rebuild-local-dynamodb:
	docker-compose --file ${DOCKER_COMPOSE_FILE} build