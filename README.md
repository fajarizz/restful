# RESTful API (Express + Prisma + PostgreSQL)

A simple REST-style JSON API for managing Users, Contacts, and Addresses using Express, Prisma, and PostgreSQL. It includes validation with Joi, password hashing with bcrypt, and tests with Jest + Supertest.

## Features
- Users: register, login (placeholder), get, update
- Contacts: create, read, update, delete, list
- Addresses: create, read, update, delete, list
- Request validation with Joi
- Prisma ORM with PostgreSQL
- Basic tests (Jest + Supertest)

## Tech stack
- Node.js + Express
- Prisma Client (PostgreSQL)
- Joi for validation
- bcrypt for password hashing
- Jest + Supertest for tests
- Winston logger utility (optional)

## Prerequisites
- Node.js LTS (18+ recommended)
- PostgreSQL database

## Quick start
1) Install dependencies
```bash
npm install
```

2) Configure environment variables
Create a .env file in the project root with your database URL. Example:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/restful?schema=public"
# Optional: override server port (default 3000)
# PORT=3000
```

3) Run migrations and generate Prisma client
```bash
npx prisma migrate dev --name init
# (Re)generate client if needed
npx prisma generate
```

4) Start the server
```bash
npm start
```
The server listens on PORT (env) or 3000.

5) Run tests
```bash
npm test
```
Note: Tests require a working database configured via DATABASE_URL.

## Project structure (overview)
- src/app.js: Express app wiring (routes, middleware)
- src/server.js: Starts the HTTP server
- src/routes: Express routers per resource
- src/controllers: HTTP handlers
- src/models: Data access (Prisma) + business logic
- src/middlewares: Joi validation
- src/config/prisma-client.js: Prisma client singleton
- src/utils/winston.js: Logger utility
- prisma/schema.prisma: Database schema
- test/*.test.js: API and Prisma tests

## API reference
Base URL: http://localhost:3000

### Users
- POST /users/register
  - Body: { username, password, name, addressId? }
  - 201 Created: { user }
  - 400 Bad Request: { error }

- POST /users/login
  - Body: { username, password }
  - 200 OK: { user }
  - 401 Unauthorized: { error }
  - 400 Bad Request: { error }
  - Note: Authentication/token issuance is not implemented; this returns the user on valid credentials.

- POST /users/logout
  - 200 OK: { message }
  - Note: Placeholder (no server-side session invalidation implemented).

- GET /users/:id
  - 200 OK: { user }
  - 404 Not Found: { error }

- PUT /users/:id
  - Body: any of { username?, password?, name?, addressId? }
  - 200 OK: { user }
  - 400 Bad Request: { error }

Example (register):
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"Secret123","name":"Alice"}'
```

### Contacts
- POST /contacts
  - Body: { firstName, lastName, email, phone, userId? }
  - 201 Created: { contact }
  - 400 Bad Request: { error }

- GET /contacts/:id
  - 200 OK: { contact }
  - 404 Not Found: { error }

- PUT /contacts/:id
  - Body: any of { firstName?, lastName?, email?, phone?, userId? }
  - 200 OK: { contact }
  - 400 Bad Request: { error }

- DELETE /contacts/:id
  - 200 OK: { message }

- GET /contacts
  - 200 OK: { contacts: [] }

Example (create):
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","phone":"123456"}'
```

### Addresses
- POST /addresses
  - Body: { street, city, province, postalCode }
  - 201 Created: { address }
  - 400 Bad Request: { error }

- GET /addresses/:id
  - 200 OK: { address }
  - 404 Not Found: { error }

- PUT /addresses/:id
  - Body: any of { street?, city?, province?, postalCode? }
  - 200 OK: { address }
  - 400 Bad Request: { error }

- DELETE /addresses/:id
  - 200 OK: { message }

- GET /addresses
  - 200 OK: { addresses: [] }

Example (create):
```bash
curl -X POST http://localhost:3000/addresses \
  -H "Content-Type: application/json" \
  -d '{"street":"123 Main","city":"Demo","province":"State","postalCode":"00000"}'
```

## Validation rules (Joi)
- Users
  - register: username (3-30), password (>=6), name (1-100), addressId (int, optional)
  - login: username, password required
  - update: any of the above optional (password hashed if provided)
- Contacts
  - create: firstName, lastName, email, phone required; userId optional
  - update: any of the above optional
- Addresses
  - create: street, city, province, postalCode required
  - update: any of the above optional

## Database schema (Prisma models)
- User: id, username (unique), password (hashed), name, addressId (optional), contacts relation
- Contact: id, firstName, lastName, email (unique), phone, timestamps, optional user relation
- Address: id, street, city, province, postalCode, users relation

Run migrations whenever the schema changes:
```bash
npx prisma migrate dev --name some_change
```

## Using api.http (optional)
This repo includes an api.http file for VS Code/JetBrains HTTP Client. Open it and run the requests directly from your editor.

## Notes and next steps
- Authentication is minimal; consider issuing JWTs on login and protecting routes with middleware.
- Consider pagination/filtering for list endpoints.
- Map unique constraint errors to 409 Conflict responses for better semantics.
- Prefer 204 No Content for DELETE responses if you don’t need a body.

## Troubleshooting
- Ensure DATABASE_URL points to a reachable PostgreSQL instance with the correct credentials.
- If Prisma client errors occur, (re)generate it:
```bash
npx prisma generate
```
- On schema changes, run migrations as shown above.
