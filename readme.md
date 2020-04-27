<div align="center">

# Zillow-Clone

### A clone of Zillow backend made with typescript, GraphQL and ❤️

</div>

## What is Zillow?

Zillow is an online real estate and rental marketplace. It’s primary customers are people who want to buy and sell houses or rent houses and real estate agents. Based on the PRD located at [here](https://docs.google.com/document/d/1vS1OWgqnZ7LyjpczQh2LITl1b9QIu1Uq1p4CwgJHQVY/edit?usp=sharing) and a live app can be found at [here](https://zillow-clone-staging.herokuapp.com/)

## Docs

- [Zillow-Clone](#zillow-clone)
    - [A clone of Zillow backend made with typescript, GraphQL and ❤️](#a-clone-of-zillow-backend-made-with-typescript-graphql-and-%e2%9d%a4%ef%b8%8f)
  - [What is Zillow?](#what-is-zillow)
  - [Docs](#docs)
    - [Codebase](#codebase)
      - [Technologies](#technologies)
      - [Folder structure](#folder-structure)
    - [First time setup](#first-time-setup)
      - [Installation](#installation)
      - [Migrating the database](#migrating-the-database)
    - [Running the app locally](#running-the-app-locally)
    - [Running the app locally for development](#running-the-app-locally-for-development)

### Codebase

#### Technologies

- **Backend Typescript**: Language
- **GraphQL**: API, powered by the entire Apollo toolchain
- **PostgresDB**: Data storage
- **knex.js**: Knex.js is a "batteries included" SQL query builder for DBs
- **Cloudinary**: Image Storage
- **NODEMAILER**: A simple smtp email sender
- **Objection.js**: An SQL-friendly ORM for Node.js

#### Folder structure

```sh
zillow-clone/
└── src
    ├── database        # Knex configuration and migration files
    ├── directives      # GraphQL directives
    ├── models
    ├── modules
    |   ├── agent       # Real-Estate seller agent module
    |   ├── contact     # Contact form module
    |   ├── form        # Basic form interface module
    |   ├── house       # House module
    |   ├── rent        # Rent form module
    |   ├── search      # Search house and agent module
    |   ├── tour        # Tour form module
    |   ├── upload      # Upload scalar type module
    |   └── user        # User authentication and profile module
    ├── scalars         # GraphQL scalars
    ├── utils           # Different utility functions
    ├── app.ts
    └── index.ts
```

### First time setup

The first step to running Zillow-clone locally is downloading the code by cloning the repository:

```sh
git clone https://github.com/fitsumayalew/zillow-clone.git
```

#### Installation

1. **Install PostgresSQL**: See [the PostgresSQL download page](https://www.postgresql.org/download/) for instructions on installing it with your OS.
2. **Install the dependencies**: run `npm install`
3. **Set Env Variables**: Before running the app don't forget to add a .env file following the sample file

#### Migrating the database

When you first download the code and want to run it locally you have to migrate the database.

```sh
npm run migrate:latest
```

You can also drop the database faster using

```sh
npm run migrate:rollback
```

### Running the app locally

To start the server run

```sh
npm start
```

### Running the app locally for development

To start the server for development purposes you can use

```sh
npm run dev
```
