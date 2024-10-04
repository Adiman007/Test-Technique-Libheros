var pgp = require("pg-promise")(/*options*/);

var db = pgp(`postgres://${process.env.db_user}:${process.env.db_password}@${process.env.db_host}:${process.env.db_port}/${process.env.db_name}`);

module.exports = db;