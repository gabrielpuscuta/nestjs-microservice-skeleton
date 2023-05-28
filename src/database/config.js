require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DRIVER,
    charset: 'utf8',
    migrationStorageTableName: "_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "_seeders"
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DRIVER,
    charset: 'utf8',
    migrationStorageTableName: "_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "_seeders"
  }
}
