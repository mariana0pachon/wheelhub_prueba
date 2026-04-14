## To run locally:

1. Copy `.env.sample` into `.env`: `cp .env.sample .env`.
2. Set the necessary variables in `.env`.
3. In `backend` run `npm install`.
4. In `frontend` run `npm install`.
5. Run `make dev` from root. This will start `backend` on port `3000` and `frontend` on port `8080` with hot reload.
6. With server already running, seed the db from a separate terminal: `docker compose exec backend npm run seed:fresh`
7. Hit `http://localhost:8080/users` to test out the app
