const pgp = require('pg-promise')();
require('dotenv').config();
const {USERNAME, PASSWORD, HOST, DBPORT} = process.env;


const connectString =
  `postgresql://${USERNAME}:${PASSWORD}@${HOST}:${DBPORT}/products`;

  const db = pgp(connectString);

  module.exports = { db };