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