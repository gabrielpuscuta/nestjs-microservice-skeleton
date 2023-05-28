## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript microservice starter repository using:

- NATS (see [nats.io](https://nats.io))
- Sequelize ORM
- MariaDB (works with PostgreSQL, MySQL, MSSQL - check [sequelize drivers](https://sequelize.org/docs/v6/getting-started/))

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# development watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Sequelize Database Migrations

```bash
# generate sequelize migrations
# stored in src/database/migrations/$timestamp-my-migration-name.js
$ npm run db:migration:create my-migration-name

# run migrations
# stored in "_migrations" table
$ npm run db:migrate

# undo last migration
$ npm run db:migrate:undo

# undo all migrations
$ npm run db:migrate:undo:all
```

## Sequelize Database Seed Migrations

```bash
# run seeds
$ npm run db:seed

# undo last seed
$ npm run db:seed:undo

# undo all seeds
$ npm run db:seed:undo:all

```

## License

Nest is [MIT licensed](LICENSE).
