export

.PHONY: dev-build dev-start clean

DEV_DC = docker-compose -p web3demo -f docker/docker-compose.dev.yml --env-file ./.env
PROD_DC = docker-compose -p web3demo -f docker/docker-compose.prod.yml --env-file ./.env

dev-build:
	$(DEV_DC) build

dev-start:
	$(DEV_DC) up

prod-build:
	$(PROD_DC) build

prod-start:
	$(PROD_DC) up

clean:
	$(DEV_DC) stop

