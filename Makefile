up:
	docker compose up -d && docker compose logs -f backend

dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

down:
	docker compose down
