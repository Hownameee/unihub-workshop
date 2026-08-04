# UniHub Workshop

UniHub Workshop is a platform for publishing university workshops and managing
registration. The product is intended to support workshop discovery,
registration, payment, notifications, check-in, and workshop summaries.

The repository is under active development. The current implementation contains
the first workshop and registration flow, a React frontend shell, a Spring Cloud
Gateway BFF, and the supporting database/cache configuration.

## Current implementation

- `app-frontend` — React 19, Vite, TypeScript, and Biome. The current UI is a
  minimal welcome page.
- `app-backend` — Spring Boot 4.1 on Java 21. Provides workshop CRUD, a health
  endpoint, and registration with Redis-backed slot reservation and PostgreSQL
  persistence.
- `gateway-bff` — Spring Cloud Gateway. Routes `/api/**`, validates Keycloak
  JWTs, injects the authenticated user ID downstream, and applies rate limiting.
- `app-db` — PostgreSQL schema and sample-data scripts.
- `service-auth` — Keycloak realm export and environment template.
- `gateway-nginx` — Nginx entrypoint routing `/`, `/auth`, and `/api`.
- `service-payment`, `consumer-notification`, `consumer-summary-pdf`, and
  `lib-shared` — Gradle module scaffolds for future work.

Payment integration, QR check-in, offline synchronization, CSV import, AI
summary generation, and the admin UI are described in the requirements but are
not implemented yet.

## Architecture

The intended request path is:

```text
Browser -> Nginx -> React frontend
                 -> Keycloak (/auth)
                 -> Gateway BFF (/api) -> Backend -> PostgreSQL
                                                   -> Redis
```

See [requirements](docs/requirements.md) for the product scope and
[architecture design](docs/design.md) for the target system design.

## Prerequisites

- Java 21
- Docker Engine with the `docker compose` plugin
- Node.js and npm for frontend development
- Network access when Gradle or npm must download dependencies

The repository includes the Gradle wrapper. It uses the Gradle version declared
in `gradle/wrapper/gradle-wrapper.properties`.

## Setup

From the repository root, create the local environment files:

```bash
cp app-backend/.env.example app-backend/.env
cp gateway-bff/.env.example gateway-bff/.env
cp service-auth/.env.example service-auth/.env
```

Replace placeholder values before starting services. These `.env` files are
ignored by Git. The example values use Docker service names such as `app-db`,
`app-redis`, and `service-auth`; change them to `localhost` and published host
ports when running an application directly on the host.

### Frontend development

```bash
cd app-frontend
npm ci
npm run dev
```

The Vite development server runs at <http://localhost:3000>.

### Development infrastructure

The development Compose file starts PostgreSQL and Adminer:

```bash
docker compose -f docker-dev/docker-compose.yaml up -d
```

Adminer is available at <http://localhost:8082>. The backend and BFF also
require Redis instances; provide those separately or use the Redis services in
the root Compose file.

### Full-stack Compose

The root `docker-compose.yaml` is the intended full-stack definition and
exposes Nginx on port `80`. Validate its configuration with:

```bash
docker compose config --quiet
```

The current container build path still needs follow-up before a clean checkout
can be started reliably with `docker compose up --build`:

- `gateway-bff/Dockerfile` still expects a Maven `pom.xml`.
- `app-frontend/Dockerfile` expects a prebuilt `dist/` directory.
- `app-backend/Dockerfile` expects a prebuilt JAR in `build/libs/`.

## API overview

The backend context path is `/api/v1`. When accessed through the BFF or Nginx,
use the same public path.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Returns `OK`. |
| `GET` | `/api/v1/workshops` | Lists non-deleted workshops. |
| `GET` | `/api/v1/workshops/{id}` | Gets one workshop. |
| `POST` | `/api/v1/workshops` | Creates a workshop. |
| `PUT` | `/api/v1/workshops/{id}` | Updates a workshop. |
| `DELETE` | `/api/v1/workshops/{id}` | Soft-deletes a workshop. |
| `POST` | `/api/v1/registrations` | Reserves a workshop registration. |

Workshop `GET` endpoints are public through the BFF. Other BFF routes require
an authenticated Keycloak JWT. The backend itself currently has no authentication
filter, so direct backend access should remain internal during development.

## Verification

Run module checks from the repository root:

```bash
./gradlew :app-backend:test :gateway-bff:test
```

Run frontend checks from `app-frontend`:

```bash
npm run lint
npm run build
```

There is no single root frontend command; Java and frontend checks are run per
module.

## Repository layout

```text
app-backend/              Spring Boot API
app-frontend/             React/Vite web application
gateway-bff/              Spring Cloud Gateway BFF
gateway-nginx/            Nginx routing configuration
app-db/                   PostgreSQL schema and sample data
service-auth/             Keycloak realm and environment template
docker-dev/               Development database/Adminer Compose file
docs/                     Requirements and architecture documentation
```
