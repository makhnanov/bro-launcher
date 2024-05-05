up:
	docker compose up --build --remove-orphans --force-recreate --detach
ci:
	docker compose run node npm ci
start:
	docker compose run node npm run start
log:
	docker compose up --build --remove-orphans --force-recreate
shell:
	docker compose run node bash
ps:
	docker compose ps
down:
	docker compose down
build:
	docker compose run node bash -c "npm run build"
