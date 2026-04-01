# Parte Técnica v2

## Frontend

### Objetivo
Crear una aplicación donde la persona usuaria pueda ver y crear usuarios.

### Requisitos de la aplicación
- filtrar el listado mediante inputs.
- ver listado de usuarios.
- paginar resultados.
- crear un nuevo usuario desde un botón visible que navega a una página de creación.
- acceder al detalle de un usuario desde el listado.
- indicar en la interfaz en qué sección estás.

### Requisitos de interfaz
- Side bar con la sección “usuarios”.
- Header mostrando la sección actual.
- Listado con:
    - Botón “crear usuario” que navega a `/usuarios/nuevo` (o ruta equivalente).
    - Inputs de filtros.
    - Items con botón de “ir al detalle”.
    - Paginación.
- Página de creación con:
    - Formulario de alta de usuario.
    - Mensajes de validación junto a los campos.
    - Botón de guardar.

### Comportamiento esperado
- Filtros:
    - Deben aplicarse sin recargar toda la página.
    - Se debe poder tener >= 1 filtros activos.
- Paginación:
    - Debe recordar filtros aplicados al cambiar de página.
    - Debe indicar página actual y total.
- Creación:
    - El botón “crear usuario” navega a la página de creación con un formulario
    - Validaciones en cliente y servidor con mensajes claros:
- Navegación:
    - Desde el listado se accede al detalle y se puede volver manteniendo filtros y página.

### API
Puedes usar un mock local, json-server, msw o similar.

### Referencia
Como referencia visual de paginación y listado: [App](https://template.wheelhub.es/demo?limit=10&skip=0)

### Tecnologías
- Es necesario que el proyecto se pueda arrancar con Docker
- Puedes utilizar cualquier framework de frontend (Vue, Angular, React...) y la librería de componentes que quieras (Boostrap, tailwind, Ant Design, NuxtUI, etc…)
    - En Wheelhub utilizamos Nuxt + Tailwind.

## Backend

### Objetivo
Crear un servidor con los endpoints necesarios para crear, listar, actualizar y borrar usuarios.

### Requisitos
- Tiene que haber una base de datos (no hace falta relacional).
- El código sigue una estructura de controlador → servicio → modelo.
- Utilizar un ORM.
- REST API.
- Validación de las requests.
- Control de errores.
  
### Tecnologías
- Es necesario que el proyecto se pueda arrancar con Docker.
- Puedes utilizar NodeJS, Bun o Deno.
- Puedes utilizar cualquier framework para crear el servidor y cualquier ORM.
    - En Wheelhub utilizamos NestJS con TypeORM.
