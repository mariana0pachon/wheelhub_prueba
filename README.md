# Prueba de Wheelhub

Una base de datos de personajes históricos con sus signos del zodiaco y sus superpoderes.

(Disclaimer: todo está en Spanglish... así funciona mi mente cuando estoy programando)

## Instrucciones para correrlo en local

1. Copy `.env.sample` into `.env`: `cp .env.sample .env`.
2. Set the necessary variables in `.env`:

   ```
   DB_HOST=postgres
   DB_PORT=5432
   DB_USER=wheelhub_prueba
   DB_PASSWORD=wheelhub_prueba
   DB_NAME=wheelhub_prueba
   ```

3. In `backend` run `npm install`.
4. In `frontend` run `npm install`.
5. Run `make dev` from root. This will start `backend` on port `3000` and `frontend` on port `8080` with hot reload.
6. With server already running, seed the db from a separate terminal: `docker compose exec backend npm run seed:fresh`
7. Hit `http://localhost:8080/users` to test out the app

## Tech stack

- NestJS + TypeORM
- React + TypeScript
- Ant Design
- PostgreSQL
- Docker

## Features (a completar)

No todas se pudieron completar pero estas eran las ideas

### Filtros

- [x] por signos de fuego/agua/aire/tierra/unknown (checkbox)
- [ ] por texto para nombre
- [ ] por texto para superpoderes
- [x] por lucky number (slider de rango)
- [x] por birthday (calendario con el rango)

### Cosas más divertidas

- [x] Poder dibujar el avatar de cada usuario y se guarda como un SVG
- [ ] El mouse tiene algun icono divertido que se mueve en animacion
- [ ] Puedes cambiar el icono que esta en el mouse
- [x] When populating the db use random SVG generator to make faces

### MVP

- [x] Validation on forms
- [x] Breadcrumbs
- [ ] Edit the same canvas, not a new one on each edit
- [ ] Sidebar showing "Personajes"
- [ ] Make everything in Español (seed, date picker, etc)
- [ ] Make design a little nicer (more color contrast, better effects on hover)
- [ ] Change favicon
- [ ] Clear all filters button (igual que en el ejemplo)
- [ ] Move `interface User {...}` in frontend to somewhere shared
- [ ] Lucky number filter should work if at least 1 of them isn't 0
- [ ] Add emojis next to elements
