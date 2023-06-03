up-detach:
	docker compose up --build --remove-orphans --force-recreate --detach
start:
	docker compose run node npm run start
up:
	docker compose up --build --remove-orphans --force-recreate
shell:
	docker compose run node bash
ps:
	docker compose ps
down:
	docker compose down
build:
	docker compose run node bash -c "npm run build"
