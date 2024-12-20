# Express.js Starter Kit with Knex.js, Objection.js, and PostgreSQL

A robust starter kit for building RESTful APIs using **Express.js**, **Knex.js** for query building, **Objection.js** as an ORM, and **PostgreSQL** for database management.

## Features

- 🌟 **Express.js**: Fast and minimalist web framework.
- 🛠 **Knex.js**: SQL query builder with migration and seed support.
- 🔗 **Objection.js**: Lightweight ORM built on top of Knex.js.
- 🗃 **PostgreSQL**: High-performance relational database.
- 📄 **Environment Variables**: Managed with `.env` using `dotenv`.
- 🛡 **Error Handling**: Centralized error management.

---

## Getting Started

### Prerequisites

- **Node.js**: >= 16.x
- **npm** or **yarn**
- **PostgreSQL**: Ensure PostgreSQL is installed and running.

---

### Installation

- Clone the repository:

```bash
   git clone https://github.com/your-username/express-knex-objection-starter.git
   cd express-knex-objection-starter
```

# Environment Configuration for Development

This document provides instructions on how to configure the environment variables for running the application in the development environment.

## Environment File Setup

Create a `.env.development` file in the root directory of the project and populate it with the following variables:

```env
NODE_ENV=development

HOSTNAME=localhost
PORT=8001
ADDR="http://localhost:8001"

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=db_report
DB_SCHEMA=

JWT_SECRET=12345

REDIS_PORT=6379
REDIS_HOST=127.0.0.1

CORS_ORIGIN=http://localhost:3002
CORS_CREDENTIALS=true
CORS_ALLOW_METHODS="GET,POST,PUT,DELETE"
CORS_ALLOW_HEADERS="Origin,Authorization,Content-Type,Accept"
```

### Description of Variables

#### General Configuration

- **`NODE_ENV`**: Specifies the environment mode. For development, set this to `development`.
- **`HOSTNAME`**: The hostname where the application will run.
- **`PORT`**: The port where the application will listen.
- **`ADDR`**: The full address (hostname + port) for accessing the application.

#### Database Configuration

- **`DB_HOST`**: Hostname for the database server.
- **`DB_PORT`**: Port number for the database server.
- **`DB_USER`**: Username for the database.
- **`DB_PASSWORD`**: Password for the database.
- **`DB_NAME`**: Name of the database to connect to.
- **`DB_SCHEMA`**: (Optional) Database schema to use.

#### Authentication

- **`JWT_SECRET`**: Secret key used for signing JWT tokens. This should be kept secure.

#### Redis Configuration

- **`REDIS_PORT`**: Port number for the Redis server.
- **`REDIS_HOST`**: Hostname for the Redis server.

#### CORS Configuration

- **`CORS_ORIGIN`**: The origin(s) allowed to access the application. Use a comma-separated list for multiple origins.
- **`CORS_CREDENTIALS`**: Specifies whether cookies and credentials are allowed in cross-origin requests. Set this to `true` or `false`.
- **`CORS_ALLOW_METHODS`**: HTTP methods allowed for CORS requests.
- **`CORS_ALLOW_HEADERS`**: HTTP headers allowed for CORS requests.

### Example Usage

1. Ensure the `.env.development` file is placed in the root directory of the project.
2. Install dependencies for environment variable management, if not already installed:
   ```bash
   npm install dotenv
   ```
3. Import and configure the environment variables in your application entry point:
   ```javascript
   require('dotenv').config({ path: '.env.development' });

   console.log(`Server running at ${process.env.ADDR}`);
   ```
4. Run your application:
   ```bash
   npm start
   ```

### Notes

- Ensure the `.env.development` file is included in `.gitignore` to prevent exposing sensitive information in version control.
- Customize the variables based on your development environment setup.

For further assistance, consult the project documentation or reach out to the development team.

### Generator

#### Model
- make:model "className" "tableName"

```bash
NODE_ENV=development npx frgen make:model User users
```
- shema --schema=schemaName
```bash
NODE_ENV=development npx frgen make:model User users --schema=chat
```

#### Resource
- make:resource "className" "tableName"

```bash
NODE_ENV=development npx frgen make:resource UserResource users
```
- shema --schema=schemaName
```bash
NODE_ENV=development npx frgen make:resource UserResource users --schema=chat
```

#### Controller
- make:controller "className" "tableName"

```bash
NODE_ENV=development npx frgen make:controller UserController users
```
- shema --schema=schemaName
```bash
NODE_ENV=development npx frgen make:controller UserController users --schema=chat
```
- path --path=/directory/.../target
```bash
NODE_ENV=development npx frgen make:controller UserController users --path=/directory/.../target
```

#### ALL
- make:crud "className" "tableName"

```bash
NODE_ENV=development npx frgen make:crud
```
- shema --schema=schemaName
```bash
NODE_ENV=development npx frgen make:crud --schema=chat
