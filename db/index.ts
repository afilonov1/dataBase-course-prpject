const pgp = require("pg-promise")();

const connectionString =
  "postgres://admin:admin@localhost:5432/next_db_project"

const db = pgp(connectionString);

module.exports = db;
